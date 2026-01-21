import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";
import { addToCart, getTotal, loadCart } from "../utils/cart";
import { BiTrash } from "react-icons/bi";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function CartPage() {
    const [cart, setCart] = useState(loadCart())

    return (
        <div className="w-full lg:h-[calc(100vh-100px)] flex  flex-col items-center pt-[25px] bg-primary">
            <div className="w-[350px] lg:w-[600px] flex flex-col gap-4 ">
                {
                    cart.map((item, index) => {
                        return (
                            <div key={index} className="w-full h-[300px] lg:h-[120px] p-3 lg:p-0 bg-white flex flex-col lg:flex-row relative items-center">
                                <button className="absolute text-red-500 right-[-40px] text-2xl rounded-full aspect-square hover:bg-red-500 p-[5px] hover:text-white text-bold"
                                onClick={
                                    ()=>{
                                        addToCart(item,-item.quantity)
                                        setCart(loadCart())
                                    }
                                }><BiTrash/></button>
                                <img className="h-[100px] lg:h-full aspect-square object-cover p-2" src={item.image}/>
                                <div className="w-full text-center h-[100px] lg:h-full p-2  flex flex-col pt-[10px] pl-[5px] ">
                                    <h1 className="text-lg w-full text-wrap font-semibold text-secondary">{item.name}</h1>
                                    <span className="text-sm text-secondary">{item.productID}</span>
                                </div>
                                <div className="w-[100px] h-[100px] lg:h-full  flex flex-row lg:flex-col justify-center items-center">
                                    <CiCircleChevUp className="text-3xl" onClick={
                                        ()=>{
                                            addToCart(item,1)
                                            setCart(loadCart())
                                        }
                                    }/>
                                    <span className=" font-semibold text-4xl text-secondary">{item.quantity}</span>
                                    <CiCircleChevDown className="text-3xl"
                                    onClick={
                                        ()=>{
                                            addToCart(item,-1)
                                            setCart(loadCart())
                                        }
                                    }/>


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
                <div className="w-full lg:w-full h-[120px] bg-white flex flex-col-reverse lg:flex-row justify-end items-center relative">
                    <Link state={cart} to="/checkout" className="lg:absolute left-0 px-6 py-3 lg:ml-[20px]  text-white  text-2xl  bg-accent hover:bg-accent p-0 lg:p-[5px] hover:text-white text-bold">Proceed to Checkout</Link>  
                    <div className=" h-[50px]">
                        <span className="text-lg w-full text-center lg:text-right lg:pr-[10px]  font-semibold text-accent">Total: LKR.{getTotal().toFixed(2)}</span>

                    </div>
                </div>
            </div>
        </div>
    );
}
