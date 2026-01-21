import { useState } from "react";
import { BsCart3 } from "react-icons/bs";
import { MdMenu } from "react-icons/md";
import { Link } from "react-router-dom"
import UserData from "./userData";
import UserDataMobile from "./userDataMobile";



export default function Header() {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);




    return (

        <header className="w-full h-[100px] bg-accent text-white px-[40px]">

            <div className="w-full h-full flex justify-center relative">

                <Link to="/home">
                    <img
                        src="/log.png"
                        className="h-full hidden lg:flex w-[170px] object-cover absolute left-0 cursor-pointer"
                    />
                </Link>

                <div className="lg:hidden w-full flex relative justify-center items-center">
                    <MdMenu className="absolute left-0 text-4xl" onClick={() => setIsSidebarOpen(true)} />

                    <img src="/log.png" className="h-full x w-[170px] object-cover justify-center items-center" />

                </div>
                {
                    isSidebarOpen &&
                    <div className="fixed top-0 left-0 w-full h-screen bg-[#00000080] text-secondary z-100">
                        <div className="w-[300px] h-full bg-primary flex flex-col ">
                            <div className="lg:hidden h-[100px]  bg-accent w-full flex relative justify-center items-center">
                                <MdMenu className="absolute text-white left-3 text-4xl" onClick={() => setIsSidebarOpen(false)} />

                                <img src="/log.png" className="h-full x w-[170px] object-cover justify-center items-center" />



                            </div>

                            <a className="p-4 border-b border-secondary/10 text-l" href="/home" >Home</a>
                            <a className="p-4 border-b border-secondary/10 text-l" href="/products" >Products</a>
                            <a className="p-4 border-b border-secondary/10 text-l" href="/contact" >Contact</a>
                            <a className="p-4 border-b border-secondary/10 text-l" href="/about" >About</a>
                            <a className="p-4 border-b border-secondary/10 text-l" href="/cart" >Cart</a>

                            <div className=" w-[300px]  lg:hidden left-0 absolute bottom-[20px] flex gap-4  justify-center items-center">
                                <UserDataMobile />

                            </div>


                        </div>




                    </div>
                }

                <div className="hidden h-full lg:flex justify-center items-center text-lg w-full gap-[20px] ">

                    <Link to="/home">Home</Link>
                    <Link to="/products">Products</Link>
                    <Link to="/contact">Contact</Link>
                    <Link to="/about">About</Link>

                </div>
                <div className="h-full w-[200px] hidden lg:flex absolute right-[50px] flex justify-center items-center">
                    <UserData />

                </div>


                <Link to="/cart" className="h-full hidden lg:flex items-center text-2xl absolute right-0">
                    <BsCart3 />
                </Link>

            </div>

        </header>
    );
}                                                                       