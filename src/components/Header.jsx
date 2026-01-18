import { BsCart3 } from "react-icons/bs";
import { Link } from "react-router-dom"

export default function Header() {
    return (
        <header className="w-full h-[100px] bg-accent text-white px-[40px]">
            <div className="w-full h-full flex relative">
                <img src="/log.png" className="h-full w-[170px] object-cover left-0 absolute" />
                <div className="h-full flex justify-center items-center text-lg w-full gap-[20px] ">
                    <Link to="/home">Home</Link>
                    <Link to="/products">Products</Link>
                    <Link to="/contact">Contact</Link>
                    <Link to="/about">About</Link>

                </div>
                <Link to="/cart" className="h-full flex items-center text-2xl absolute right-0">
                    <BsCart3 />
                </Link>
            </div>

        </header>
    );
}                                                                       