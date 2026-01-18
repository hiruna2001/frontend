import { Link, Route, Routes } from "react-router-dom";
import { FaChartLine } from "react-icons/fa";
import { MdShoppingCartCheckout } from "react-icons/md";
import { BsBox2Heart } from "react-icons/bs";
import { HiOutlineUsers } from "react-icons/hi";
import AdminProductPage from "./admin/adminProductPage";
import AdminAddNewProduct from "./admin/adminAddNewProduct";
import UpdateProductPage from "./admin/adminUpdateProduct";
import AdminOrdersPage from "./admin/adminOrdersPage";


export default function AdminPage(){
    return(
        <div className="w-full h-full bg-primary flex p-2" >

            <div className="w-75 h-full bg-primary flex flex-col items-center gap-[20px]">
                <div className="w-[90%] h-[70px] flex flex-row items-center bg-accent rounded-2xl mb-[20px]">
                    <img src="/log.png" className="h-[70px] w-[100px] object-cover left-0 "/>
                    <span className="text-white text-xl ml-4">Admin Panel</span>
                </div>

                <Link to="/admin" className="w-[90%] flex items-center gap-2 px-4 rounded-lg ">
                    <FaChartLine className="text-2xl text-accent"/>
                    Dashboard
                </Link>
                
                <Link to="/admin/orders" className="w-[90%] flex items-center gap-2 px-4 rounded-lg ">
                    <MdShoppingCartCheckout className="text-2xl text-accent" />
                    Orders
                </Link>
                
                <Link to="/admin/products" className="w-[90%] flex items-center gap-2 px-4 rounded-lg ">
                    <BsBox2Heart className="text-xl text-accent"/>
                    Products
                </Link>
                
                <Link to="/admin/users" className="w-[90%] flex items-center gap-2 px-4 rounded-lg ">
                    <HiOutlineUsers className="text-2xl text-accent"/>
                    Users
                </Link>

            </div>
            <div className="w-[calc(100%-300px)] h-full border-[4px] border-accent rounded-[20px] overflow-hidden">
                <div className=" h-full max-h-full overflow-y-scroll w-full max-w-full">

                    <Routes path="/">
                    <Route path="/" element={<h1>Dashboard</h1>}/>
                    <Route path="/products" element={<AdminProductPage/>}/>
                    <Route path="/orders" element={<AdminOrdersPage/>}/>
                    <Route path="/users" element={<h1>Users</h1>}/>
                    <Route path="/add-product" element={<AdminAddNewProduct/>}/>
                    <Route path="/update-product" element={<UpdateProductPage/>}/>
                
                
                </Routes>


                </div>
                

            </div>

        </div>
    )
}