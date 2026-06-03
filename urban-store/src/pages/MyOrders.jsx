import {
    useEffect,
    useState,
} from "react"

import axios from "axios"

function MyOrders() {
    const [orders, setOrders] =
        useState([])

    useEffect(() => {
        const user =
            JSON.parse(
                localStorage.getItem(
                    "userInfo"
                )
            )

        axios
            .get(
                `http://localhost:5000/my-orders/${user._id}`
            )
            .then((res) => {
                setOrders(
                    res.data
                )
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <div className="min-h-screen px-10 py-16">
            <h1 className="text-5xl font-bold mb-10">
                My Orders
            </h1>

            {orders.length === 0 ? (
                <h2>
                    No Orders Found
                </h2>
            ) : (
                orders.map(
                    (order) => (
                        <div
                            key={
                                order._id
                            }
                            className="bg-white p-6 rounded-2xl shadow mb-6"
                        >
                            <h2 className="text-2xl font-bold">
                                ₹
                                {
                                    order.totalAmount
                                }
                            </h2>

                            <p>
                                Status:
                                {" "}
                                {
                                    order.status
                                }
                            </p>

                            <p>
                                Date:
                                {" "}
                                {new Date(
                                    order.createdAt
                                ).toLocaleDateString()}
                            </p>

                            <div className="mt-4">
                                {order.items.map(
                                    (
                                        item,
                                        index
                                    ) => (
                                        <div
                                            key={
                                                index
                                            }
                                            className="flex items-center gap-4 mb-3"
                                        >
                                            <img
                                                src={
                                                    item.image
                                                }
                                                alt={
                                                    item.name
                                                }
                                                className="w-16 h-16 rounded"
                                            />

                                            <div>
                                                <h3>
                                                    {
                                                        item.name
                                                    }
                                                </h3>

                                                <p>
                                                    Qty:
                                                    {" "}
                                                    {
                                                        item.quantity
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    )
                )
            )}
        </div>
    )
}

export default MyOrders