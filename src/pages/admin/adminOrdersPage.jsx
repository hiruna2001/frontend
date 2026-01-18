import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components/loader";
import OrderDetailsModal from "../../components/orderInfoModel";




export default function AdminOrdersPage() {

    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoading) {
            const token = localStorage.getItem('token')
            if (token === null) {
                navigate('/login');
                return
            }
            axios.get(import.meta.env.VITE_API_URL + "/api/orders", {
                headers:
                {
                    Authorization: `Bearer ${token}`
                }
            }
            ).then(
                (response) => {
                    setOrders(response.data);
                    setIsLoading(false);
                }
            );


        }

    }, [isLoading]);

    return (
        <div className="w-full min-h-full bg-primary">
            <OrderDetailsModal isModel={isModelOpen} selectedOrder={selectedOrder} closeModel={() => setIsModelOpen(false)} refresh={() => setIsLoading(true)} />




            {/* Header */}
            <div className="flex justify-between items-center mb-4 px-2">
                <h2 className="text-lg font-semibold text-secondary">
                    Orders
                </h2>

                <span className="text-sm text-accent font-medium">
                    {orders.length} items
                </span>
            </div>

            <div className="overflow-x-auto bg-primary rounded-xl shadow-md">
                {isLoading ? <Loader /> :
                    <table className="w-full text-sm text-center border-collapse">

                        <thead className="bg-secondary text-white">
                            <tr className="h-12 w-full">
                                <th className="px-4">Order ID</th>
                                <th className="px-4">Number of Items</th>
                                <th className="px-4">Customer Name</th>
                                <th className="px-4">Email</th>
                                <th className="px-4">Phone</th>
                                <th className="px-4">Address</th>
                                <th className="px-4">Total</th>
                                <th className="px-4">Status</th>
                                <th className="px-4">Date</th>
                            </tr>
                        </thead>

                        <tbody className="text-secondary">
                            {orders.map((items) => (
                                <tr
                                    onClick={() => {
                                        setSelectedOrder(items);
                                        setIsModelOpen(true)
                                    }}
                                    key={items.orderID}
                                    className="
                                    h-14 border-b
                                    bg-white
                                    hover:bg-primary
                                    transition
                                "

                                >


                                    <td className="px-4 font-medium">{items.orderID}</td>
                                    <td className="px-4">{items.items.length}</td>
                                    <td className="px-4 font-semibold">{items.customerName}</td>
                                    <td className="px-4 text-gray-500">{items.email}</td>
                                    <td className="px-4 text-gray-500">{items.phone}</td>
                                    <td className="px-4 capitalize">
                                        {typeof items.address === "string"
                                            ? items.address
                                            : JSON.stringify(items.address)}
                                    </td>
                                    <td className="px-4 capitalize">
                                        {`Rs. LKR ${items.total.toFixed(2)}`}
                                    </td>
                                    <td className="px-4 capitalize">{items.status}</td>
                                    <td className="px-4 capitalize">{new Date(items.date).toLocaleDateString()}</td>
                                    <td className="px-4">
                                        <div className="flex gap-4 justify-center items-center">


                                        </div>
                                    </td>
                                </tr>
                            )
                            )
                            }
                            {orders.length === 0 && !isLoading && (
                                <tr>
                                    <td colSpan={9} className="text-center py-12">
                                        No orders found
                                    </td>
                                </tr>
                            )}
                        </tbody>

                    </table>}
            </div>
        </div>
    );
}
