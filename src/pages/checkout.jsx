import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";
import { BiTrash } from "react-icons/bi";
import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export default function CheckoutPage() {

    const location = useLocation()
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
                address: "No 1, street 1, city 1",
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
            <div className="w-full h-[calc(100vh-100px)] flex flex-col items-center pt-[25px] bg-primary">
                <div className="w-[600px] flex flex-col gap-4">
                    {
                        cart.map((item, index) => {
                            return (
                                <div key={index} className="w-full h-[120px] bg-white flex relative items-center">
                                    <button className="absolute text-red-500 right-[-40px] text-2xl rounded-full aspect-square hover:bg-red-500 p-[5px] hover:text-white text-bold"
                                        onClick={
                                            () => {

                                            }
                                        }><BiTrash /></button>
                                    <img className="h-full aspect-square object-cover p-2" src={item.image} />
                                    <div className="w-[200px] h-full p-2  flex flex-col pt-[10px] pl-[5px] ">
                                        <h1 className="text-lg w-full text-wrap font-semibold text-secondary">{item.name}</h1>
                                        <span className="text-sm text-secondary">{item.productID}</span>
                                    </div>
                                    <div className="w-[100px] h-full  flex flex-col justify-center items-center">
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
                                    <div className="w-[180px] h-full mt-[25px] flex flex-col">
                                        {
                                            item.labelPrice > item.price &&
                                            <span className="text-lg w-full text-right pr-[10px] font-semibold line-through text-secondary">LKR.{item.labelPrice.toFixed(2)}</span>
                                        }
                                        <span className="text-lg w-full text-right pr-[10px] font-semibold text-accent">LKR.{item.price.toFixed(2)}</span>

                                    </div>

                                </div>
                            );
                        })
                    }
                    <div className="w-full h-[120px] bg-white flex justify-end items-center relative">
                        <Link to="/checkout"
                            onClick={purchaseCart}
                            className="absolute left-0 px-6 py-3 ml-[20px]  text-white  text-2xl  bg-accent hover:bg-accent p-[5px] hover:text-white text-bold">Order</Link>
                        <div className=" h-[50px]">
                            <span className="text-lg w-full text-right pr-[10px] font-semibold text-accent">Total: LKR.{getTotal().toFixed(2)}</span>

                        </div>
                    </div>
                </div>
            </div>
        );

    }
    
    

