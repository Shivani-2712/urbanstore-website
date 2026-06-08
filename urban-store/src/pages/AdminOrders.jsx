import { useEffect, useState } from "react"
import axios from "axios"

function AdminOrders() {

    const [orders, setOrders] =
        useState([])

    const loadOrders = () => {

        axios
            .get(
                "http://localhost:5000/admin/orders"
            )
            .then((res) => {
                setOrders(
                    res.data
                )
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {

        loadOrders()

    }, [])

    const updateStatus =
        async (
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

    return (
        <div className="min-h-screen px-10 py-16">

            <h1 className="text-5xl font-bold mb-10">
                Admin Orders
            </h1>

            {orders.map(
                (order) => (

                    <div
                        key={order._id}
                        className="bg-white p-6 rounded-xl shadow mb-6"
                    >

                        <h2 className="text-2xl font-bold">
                            {order.customerName}
                        </h2>

                        <p>
                            ₹{order.totalAmount}
                        </p>

                        <p>
                            {order.email}
                        </p>

                        <p>
                            {order.status}
                        </p>

                        <select
                            value={order.status}
                            onChange={(e) =>
                                updateStatus(
                                    order._id,
                                    e.target.value
                                )
                            }
                            className="border p-2 rounded mt-4"
                        >

                            <option>
                                Pending
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

                        </select>

                    </div>
                )
            )}

        </div>
    )
}

export default AdminOrders