import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";
import { BiTrash } from "react-icons/bi";
import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export default function CheckoutPage() {

    const location = useLocation()
    const[address,setAddress]= useState("")
    const[name,setName]= useState("")
    const[phone,setPhone]= useState("")
    const navigate = useNavigate()
    const [cart, setCart] = useState(location.state)
    function getTotal() {
        let total = 0
        cart.forEach((item) => {
            total += item.price * item.quantity
        })
        return total

    }
    async function purchaseCart() {

        const token = localStorage.getItem('token')

        if (token === null) {
            toast.error('Please login first')
            Navigate("/login")
            return
        }
        try {
            const items = []

            for (let i = 0; i < cart.length; i++) {
                items.push(
                    {
                        productID: cart[i].productID,
                        quantity: cart[i].quantity
                    }
                )
            }
            await axios.post(import.meta.env.VITE_API_URL + "/api/orders", {
                address: address,
                customerName: name==""?null:name,
                phone: phone === "" ? null : phone,
                items: items

            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log("success");
            toast.success('Purchased successfully')

        } catch (error) {
            console.log(error);
            toast.error('Error purchasing')
            //if error is 400
            if (error.response && error.response.status == 400) {

                toast.error(error.response.data.message)




            }


        }
    }



    return (
        <div className="w-full lg:h-[calc(100vh-100px)] overflow-y-scroll flex flex-col items-center pt-[25px] bg-primary">
            <div className="w-[350px]  lg:w-[600px] flex flex-col gap-4">
                {
                    cart.map((item, index) => {
                        return (
                            <div key={index} className="w-full h-[300px] lg:h-[120px] bg-white flex flex-col lg:flex-row relative items-center">
                                <button className="absolute text-red-500 right-[-40px] text-2xl rounded-full aspect-square hover:bg-red-500 p-[5px] hover:text-white text-bold"
                                    onClick={
                                        () => {

                                        }
                                    }><BiTrash /></button>
                                <img className="h-[100px] lg:h-full aspect-square object-cover p-2" src={item.image} />
                                <div className="w-full text-center h-[100px] lg:h-full p-2  flex flex-col pt-[10px] pl-[5px] ">
                                    <h1 className="text-lg w-full text-wrap font-semibold text-secondary">{item.name}</h1>
                                    <span className="text-sm text-secondary">{item.productID}</span>
                                </div>
                                <div className="w-[100px] h-[100px] lg:h-full  flex flex-row lg:flex-col justify-center items-center">
                                    <CiCircleChevUp className="text-3xl" onClick={
                                        () => {
                                            const newCart = [...cart]

                                            newCart[index].quantity += 1
                                            setCart(newCart)

                                        }
                                    } />
                                    <span className=" font-semibold text-4xl text-secondary">{item.quantity}</span>
                                    <CiCircleChevDown className="text-3xl"
                                        onClick={
                                            () => {
                                                const newCart = [...cart]

                                                newCart[index].quantity -= 1
                                                if (newCart[index].quantity == 0) {
                                                    newCart.splice(index, 1)
                                                }
                                                setCart(newCart)

                                            }
                                        } />


                                </div>
                                <div className="w-full lg:w-[180px] lg:h-full  lg:mt-[25px] flex justify-center items-center flex-row lg:flex-col">
                                    {
                                        item.labelPrice > item.price &&
                                        <span className="text-lg w-full text-center lg:text-right pr-[10px] font-semibold line-through text-secondary">LKR.{item.labelPrice.toFixed(2)}</span>
                                    }
                                    <span className="text-lg w-full text-center lg:text-right pr-[10px]  font-semibold text-accent">LKR.{item.price.toFixed(2)}</span>

                                </div>

                            </div>
                        );
                    })
                }
                <div className="w-full lg:w-full bg-white flex flex-col items-center relative">
                    <div className="w-full  h-full flex justify-between items-center p-4">
                        <label
                            htmlFor="name"
                            className="text-sm text-secondary mr-2"
                        > Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e)=> setName(e.target.value)}
                            className="w-[400px] h-[50px] border border-secondary rounded-md px-3"
                            />

                        
                    </div>
                    <div className="w-full h-full flex  justify-between items-center p-4">
                        <label
                            htmlFor="address"
                            className="text-sm text-secondary mr-2"
                        > Shipping Address</label>
                        <input
                            type="text"
                            id="address"
                            value={address}
                            onChange={(e)=> setAddress(e.target.value)}
                            className="w-[400px] h-[50px] border border-secondary rounded-md px-3"
                            />

                        
                    </div>
                    <div className="w-full h-full flex  justify-between items-center p-4">
                        <label
                            htmlFor="phone"
                            className="text-sm text-secondary mr-2"
                        > Contact Number</label>
                        <input
                            type="text"
                            id="phone"
                            value={phone}
                            onChange={(e)=> setPhone(e.target.value)}
                            className="w-[400px] h-[50px] border border-secondary rounded-md px-3"
                            />

                        
                    </div>
                    
                </div>


                <div className="w-full lg:w-full h-[120px] bg-white flex flex-col-reverse lg:flex-row justify-end items-center relative">
                    <Link to="/checkout"
                        onClick={purchaseCart}
                        className="lg:absolute left-0 px-6 py-3 lg:ml-[20px]  text-white  text-2xl  bg-accent hover:bg-accent p-0 lg:p-[5px] hover:text-white text-bold">Order</Link>
                    <div className=" h-[50px]">
                        <span className="text-lg w-full text-center lg:text-right lg:pr-[10px]  font-semibold text-accent">Total: LKR.{getTotal().toFixed(2)}</span>

                    </div>
                </div>
            </div>
        </div>
    );

}



