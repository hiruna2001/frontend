import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function OrderDetailsModal({
    isModel,
    selectedOrder,
    closeModel,
    refresh
}) {
    const [status, setStatus] = useState(selectedOrder?.status);
    if (!isModel || !selectedOrder) return null;

    return (
        <div
            className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center"
            onClick={closeModel}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="w-[900px] max-h-[85vh] bg-primary rounded-2xl shadow-2xl overflow-hidden"
            >
                {/* HEADER */}
                <div className="flex justify-between items-center px-6 py-4 border-b">
                    <div>
                        <h2 className="text-xl font-semibold text-secondary">
                            Order #{selectedOrder.orderID}
                        </h2>
                        <p className="text-sm text-gray-500">
                            <span className="capitalize text-accent font-medium">
                                {selectedOrder.status}
                            </span>
                            {" • "}
                            {new Date(selectedOrder.date).toLocaleString()}
                        </p>
                    </div>

                    <button
                        onClick={closeModel}
                        className="text-2xl text-gray-400 hover:text-red-500"
                    >
                        ✕
                    </button>
                </div>

                {/* BODY */}
                <div className="p-6 space-y-6">

                    {/* CUSTOMER + PAYMENT */}
                    <div className="grid grid-cols-2 gap-6">
                        {/* CUSTOMER */}
                        <div className="bg-white rounded-xl p-4 shadow-sm">
                            <h3 className="font-semibold text-secondary mb-3">
                                Customer
                            </h3>
                            <div className="text-sm text-gray-600 space-y-1">
                                <p><b>Name:</b> {selectedOrder.customerName}</p>
                                <p><b>Email:</b> {selectedOrder.email}</p>
                                <p><b>Phone:</b> {selectedOrder.phone}</p>
                                <p>
                                    <b>Address:</b>{" "}
                                    {typeof selectedOrder.address === "string"
                                        ? selectedOrder.address
                                        : JSON.stringify(selectedOrder.address)}
                                </p>
                            </div>
                        </div>

                        {/* PAYMENT */}
                        <div className="bg-white rounded-xl p-4 shadow-sm">
                            <h3 className="font-semibold text-secondary mb-3">
                                Payment
                            </h3>
                            <div className="text-sm text-gray-600 space-y-1">
                                <p>
                                    <b>Items:</b> {selectedOrder.items.length}
                                </p>
                                <p className="text-lg font-semibold text-accent">
                                    LKR {selectedOrder.total.toFixed(2)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* LINE ITEMS */}
                    <div className="bg-white rounded-xl shadow-sm">
                        <h3 className="font-semibold text-secondary px-4 py-3 border-b">
                            Line Items
                        </h3>

                        <div className="divide-y">
                            {selectedOrder.items.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-4 p-4"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-14 h-14 rounded-lg object-cover"
                                    />

                                    <div className="flex-1">
                                        <p className="font-semibold text-secondary">
                                            {item.name}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            PID: {item.productID}
                                        </p>
                                    </div>

                                    <div className="text-sm text-gray-500">
                                        Qty: {item.quantity}
                                    </div>

                                    <div className="text-right">
                                        <p className="text-sm text-gray-500">
                                            LKR {item.price.toFixed(2)}
                                        </p>
                                        <p className="font-semibold text-secondary">
                                            LKR {(item.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* FOOTER */}
                <div className="flex justify-between items-center px-6 py-4 border-t bg-primary">
                    <p className="text-sm text-gray-500">
                        {selectedOrder.items.length} items •{" "}
                        <span className="font-semibold text-secondary">
                            LKR {selectedOrder.total.toFixed(2)}
                        </span>
                    </p>
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                        <label className="block text-sm font-semibold text-secondary mb-2">
                            Order Status
                        </label>

                        <select defaultValue={selectedOrder.status}
                            onChange={(e)=> setStatus(e.target.value)}
                            className="
            w-full
            px-4 py-2.5
            rounded-lg
            border border-gray-200
            bg-primary
            text-secondary
            text-sm
            font-medium
            shadow-inner
            focus:outline-none
            focus:ring-2
            focus:ring-accent
            focus:border-accent
            transition
            cursor-pointer
        "
                        >
                            <option value="pending" c>Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="completed">Completed</option>
                            <option value="refunded">Refunded</option>
                        </select>
                    </div>


                    <button
                    
                        onClick={()=>{
                            const token = localStorage.getItem('token');
                            axios.put(import.meta.env.VITE_API_URL + "/api/orders/status/" + selectedOrder.orderID,{status:status},
                                {
                                    headers:{
                                        Authorization:`Bearer ${token}`
                                    }
                                }).then(()=>{
                                    toast.success("Order status updated successfully");
                                    closeModel();
                                    refresh();

                                
                            }).catch(()=>{
                                toast.error("Error updating order");
                            })
                        
                        }}
                        disabled ={status === selectedOrder.status}
                        className="px-6 py-2 bg-accent text-white rounded-full hover:opacity-90"
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
}
