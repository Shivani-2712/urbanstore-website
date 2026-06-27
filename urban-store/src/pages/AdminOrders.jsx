import AdminLayout from "../layouts/AdminLayout"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

function AdminOrders() {

    const [orders, setOrders] = useState([])
    const navigate = useNavigate()

    const loadOrders = () => {

        axios
            .get(
                "http://localhost:5000/admin/orders"
            )
            .then((res) => {
                setOrders(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        loadOrders()
    }, [])

    const updateStatus = async (
        orderId,
        status
    ) => {

        try {

            await axios.put(
                `http://localhost:5000/admin/orders/${orderId}`,
                {
                    status,
                }
            )

            loadOrders()

        } catch (error) {

            console.log(error)

        }
    }

    const statusColor = {
        Pending:
            "bg-yellow-50 text-yellow-700 border-yellow-200",

        Paid:
            "bg-green-50 text-green-700 border-green-200",

        Processing:
            "bg-blue-50 text-blue-700 border-blue-200",

        Shipped:
            "bg-indigo-50 text-indigo-700 border-indigo-200",

        Delivered:
            "bg-purple-50 text-purple-700 border-purple-200",

        Cancelled:
            "bg-red-50 text-red-600 border-red-200",
    }

    return (

        <AdminLayout>
            <div className="mb-12">

                <p className="uppercase tracking-[4px] text-gray-400 mb-3">
                    UrbanStore Admin
                </p>

                <h1 className="text-5xl font-serif">
                    Orders
                </h1>

                <div className="w-24 h-px bg-[#D9CFC2] mt-6"></div>

            </div>
            <input
                type="text"
                placeholder="Search by customer, email or order ID..."
                className="w-full max-w-xl border border-[#D9CFC2] p-3 bg-white mb-8" />
            <div className="bg-white border border-[#E8DCCB] p-5 mb-5 hover:shadow-lg transition duration-300">

                {orders.map((order) => (

                    <div
                        key={order._id}
                        onClick={() =>
                            navigate(`/admin/orders/${order._id}`)
                        }
                        className="bg-white border border-[#E8DCCB] p-5 mb-5 cursor-pointer hover:shadow-lg transition"
                    >

                        <div className="flex justify-between items-start">

                            <div>

                                <p className="uppercase tracking-[3px] text-xs text-gray-400 mb-2">
                                    Order
                                </p>

                                <h2 className="text-3xl font-serif">
                                    #{order._id.slice(-6)}
                                </h2>

                                <p className="text-gray-500 mt-2">
                                    {order.customerName}
                                </p>

                                <p className="text-gray-500">
                                    {order.email}
                                </p>

                                <p className="text-sm text-gray-400 mt-1">
                                    {new Date(order.createdAt).toLocaleDateString("en-IN")}
                                </p>

                            </div>

                            <div className={`px-3 py-1 border text-sm
                            ${statusColor[order.status]}
                            `}>
                                {order.status}
                            </div>

                        </div>

                        <div className="border-t border-[#E8DCCB] my-4"></div>

                        <div className="grid md:grid-cols-3 gap-6">

                            <div>

                                <p className="uppercase tracking-[3px] text-xs text-gray-400 mb-2">
                                    Total Amount
                                </p>

                                <p className="text-3xl font-serif">
                                    ₹{order.totalAmount}
                                </p>

                            </div>

                            <div>

                                <p className="uppercase tracking-[3px] text-xs text-gray-400 mb-2">
                                    Items
                                </p>

                                <p>
                                    {order.items.reduce(
                                        (total, item) =>
                                            total + item.quantity,
                                        0
                                    )} Items
                                </p>

                            </div>

                            <div>

                                <p className="uppercase tracking-[3px] text-xs text-gray-400 mb-2">
                                    Update Status
                                </p>

                                <select
                                    value={order.status}
                                    onChange={(e) =>
                                        updateStatus(
                                            order._id,
                                            e.target.value
                                        )
                                    }
                                    className="border border-[#D9CFC2] bg-white px-4 py-3 w-[260px] outline-none focus:border-black transition">

                                    <option>
                                        Pending
                                    </option>

                                    <option>
                                        Paid
                                    </option>

                                    <option>
                                        Processing
                                    </option>

                                    <option>
                                        Shipped
                                    </option>

                                    <option>
                                        Delivered
                                    </option>

                                    <option>
                                        Cancelled
                                    </option>

                                </select>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </AdminLayout>
    )
}

export default AdminOrders
