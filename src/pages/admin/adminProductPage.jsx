import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { CiCirclePlus } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "../../components/loader";

function ProductDeleteConfirm(props) {
    const productID = props.productID;
    const close = props.close;
    const refresh = props.refresh;
    function deleteProduct() {
        const token = localStorage.getItem('token')
        axios.delete(import.meta.env.VITE_API_URL + "/api/product/" + productID,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        ).then(
            (response) => {
                console.log(response.data);
                close();
                toast.success("Product deleted successfully");
                refresh();

            }
        ).catch(
            (error) => {
                console.log(error);
                toast.error("Error deleting product");
            }
        )
    }

    return <div className="fixed left-0 top-0 w-full h-screen bg-[#00000050] z-[100] flex justify-center items-center">
        <div className="w-[700px] h-[200px] bg-primary gap-[40px] relative flex flex-col justify-center items-center rounded-xl">
            <button onClick={close} className="w-[40px] h-[40px] absolute right-[-42px] top-[-42px]  bg-red-600 rounded-full text-white flex justify-center items-center font-bold border border-red-600 hover:bg-white hover:text-red-600">
                X
            </button>
            <p className="text-xl font-semibold">Are you sure you want to delete the product with ID: {productID} ?</p>
            <div className="flex gap-[40px]">
                <button className="bg-blue-600 hover:bg-accent text-white px-4 py-2 rounded-lg" onClick={close}>Cancel</button>
                <button className="bg-red-600 hover:bg-accent text-white px-4 py-2 rounded-lg ml-4" onClick={deleteProduct} >Delete</button>
            </div>

        </div>

    </div>

}

export default function AdminProductPage() {

    const [products, setProducts] = useState([]);
    const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoading) {
            axios.get(import.meta.env.VITE_API_URL + "/api/product").then(
                (response) => {
                    setProducts(response.data);
                    setIsLoading(false);
                }
            );


        }

    }, [isLoading]);

    return (
        <div className="w-full h-full p-6 bg-primary">
            {
                isDeleteConfirmVisible && <ProductDeleteConfirm refresh={()=>{setIsLoading(true)}} productID={productToDelete} close={() => { setIsDeleteConfirmVisible(false) }} />
            }

            <Link to="/admin/add-product" className="fixed right-[50px] bottom-[50px] text-5xl">

                <CiCirclePlus className="hover:text-accent" />

            </Link>

            {/* Header */}
            <div className="flex justify-between items-center mb-4 px-2">
                <h2 className="text-lg font-semibold text-secondary">
                    Products
                </h2>

                <span className="text-sm text-accent font-medium">
                    {products.length} items
                </span>
            </div>

            <div className="overflow-x-auto bg-primary rounded-xl shadow-md">
                {isLoading ? <Loader/>:
                    <table className="w-full text-sm text-center border-collapse">

                        <thead className="bg-secondary text-white">
                            <tr className="h-12">
                                <th className="px-4">Image</th>
                                <th className="px-4">Product ID</th>
                                <th className="px-4">Product Name</th>
                                <th className="px-4">Price</th>
                                <th className="px-4">Label Price</th>
                                <th className="px-4">Stock</th>
                                <th className="px-4">Category</th>
                                <th className="px-4">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="text-secondary">
                            {products.map((items) => (
                                <tr
                                    key={items.productID}
                                    className="
                                    h-14 border-b
                                    bg-white
                                    hover:bg-primary
                                    transition
                                "
                                >
                                    <td className="px-4">
                                        <img
                                            src={items.images[0]}
                                            className="w-14 h-14 object-cover rounded-lg mx-auto border"
                                        />
                                    </td>

                                    <td className="px-4 font-medium">{items.productID}</td>
                                    <td className="px-4">{items.name}</td>
                                    <td className="px-4 font-semibold">Rs. {items.price}</td>
                                    <td className="px-4 text-gray-500">Rs. {items.labelPrice}</td>
                                    <td className="px-4 text-gray-500">{items.stock}</td>
                                    <td className="px-4 capitalize">{items.category}</td>

                                    <td className="px-4">
                                        <div className="flex gap-4 justify-center items-center">
                                            <FaRegTrashCan
                                                onClick={() => {
                                                    setIsDeleteConfirmVisible(true);
                                                    setProductToDelete(items.productID);

                                                }}
                                                className="cursor-pointer text-gray-500 hover:text-red-500 transition"
                                            />
                                            <FaRegEdit
                                                className="cursor-pointer text-gray-500 hover:text-accent transition"
                                                onClick={() => {
                                                    navigate("/admin/update-product", {
                                                        state: items
                                                    })
                                                }}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>}
            </div>
        </div>
    );
}
