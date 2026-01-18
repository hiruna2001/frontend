import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";
import { addToCart, getTotal, loadCart } from "../utils/cart";
import { BiTrash } from "react-icons/bi";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function CartPage() {
    const [cart, setCart] = useState(loadCart())

    return (
        <div className="w-full h-[calc(100vh-100px)] flex flex-col items-center pt-[25px] bg-primary">
            <div className="w-[600px] flex flex-col gap-4">
                {
                    cart.map((item, index) => {
                        return (
                            <div key={index} className="w-full h-[120px] bg-white flex relative items-center">
                                <button className="absolute text-red-500 right-[-40px] text-2xl rounded-full aspect-square hover:bg-red-500 p-[5px] hover:text-white text-bold"
                                onClick={
                                    ()=>{
                                        addToCart(item,-item.quantity)
                                        setCart(loadCart())
                                    }
                                }><BiTrash/></button>
                                <img className="h-full aspect-square object-cover p-2" src={item.image}/>
                                <div className="w-[200px] h-full p-2  flex flex-col pt-[10px] pl-[5px] ">
                                    <h1 className="text-lg w-full text-wrap font-semibold text-secondary">{item.name}</h1>
                                    <span className="text-sm text-secondary">{item.productID}</span>
                                </div>
                                <div className="w-[100px] h-full  flex flex-col justify-center items-center">
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
                    <Link state={cart} to="/checkout" className="absolute left-0 px-6 py-3 ml-[20px]  text-white  text-2xl  bg-accent hover:bg-accent p-[5px] hover:text-white text-bold">Proceed to Checkout</Link>  
                    <div className=" h-[50px]">
                        <span className="text-lg w-full text-right pr-[10px] font-semibold text-accent">Total: LKR.{getTotal().toFixed(2)}</span>

                    </div>
                </div>
            </div>
        </div>
    );
}
