import { useEffect, useState, useContext } from "react"
import axios from "axios"
import { CartContext } from "../context/CartContext"
import { useNavigate } from "react-router-dom"

function OrderHistory() {

    const [orders, setOrders] = useState([])
    const { addToCart } = useContext(CartContext)
    const navigate = useNavigate()

    useEffect(() => {

        const loadOrders = async () => {

            const user = JSON.parse(
                localStorage.getItem("userInfo")
            )

            const res = await axios.get(
                `http://localhost:5000/orders/${user._id}`
            )

            setOrders(res.data)
        }

        loadOrders()

    }, [])

    const statusColor = {
    Pending:
        "bg-[#FCFAF2] text-[#B8860B] border-[#E7D88A]",

    Paid:
        "bg-[#F4FBF6] text-[#228B22] border-[#B7E4C7]",

    Shipped:
        "bg-[#F4F8FF] text-[#2563EB] border-[#BFDBFE]",

    Delivered:
        "bg-[#F5F3FF] text-[#7C3AED] border-[#DDD6FE]",
}

const handleBuyAgain = async (order) => {

    for (const item of order.items) {

        await addToCart(item)

    }

    navigate("/cart")
}

    return (
        <div className="min-h-screen px-10 py-16 bg-[#F8F4EE]">

            <div className="text-center mb-12">

                <p className="uppercase tracking-[4px] text-gray-400 mb-3">
                    Purchase History
                </p>

                <h1 className="text-5xl font-serif">
                    My Orders
                </h1>

                <div className="w-24 h-px bg-[#D9CFC2] mx-auto mt-6"></div>

            </div>

            <div className="space-y-6">

                {orders.map((order) => (

                    <div
                        key={order._id}
                        className="
bg-white
border
border-[#E8DCCB]
p-8
hover:shadow-lg
transition
duration-300
"
                    >

                        <div className="flex justify-between mb-6">

                            <div>

                                <p className="uppercase tracking-[4px] text-gray-400 text-sm mb-2">
                                    Order
                                </p>

                                <h2 className="text-4xl font-serif">
                                    #{order._id.slice(-6)}
                                </h2>

                                <p className="text-gray-500">
                                    {
                                        new Date(order.createdAt).toLocaleDateString(
                                            "en-IN",
                                            {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                            }
                                        )
                                    }
                                </p>

                            </div>

                            <div
    className={`
        inline-flex
        items-center
        justify-center
        px-5
        py-2
        rounded-full
        border
        text-sm
        font-medium
        min-w-[100px]
        ${statusColor[order.status]}
    `}
>
    {order.status}
</div>

                        </div>
                        <p className="uppercase tracking-[3px] text-xs text-gray-400 mb-4">
                            Items Ordered
                        </p>
                        <div className="space-y-2">

                            {order.items.map((item, index) => (

                                <div
                                    key={index}
                                    className="
        flex
        justify-between
        items-center
        mb-4
        "
                                >

                                    <div className="flex items-center gap-4">

                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="
                w-20
                h-20
                object-cover
                border
                border-[#E8DCCB]
                "
                                        />

                                        <div>

                                            <p className="font-medium">
                                                {item.name}
                                            </p>

                                            {item.size && (
                                                <p className="text-gray-500 text-sm">
                                                    Size: {item.size}
                                                </p>
                                            )}

                                            <p className="text-gray-500 text-sm">
                                                Qty: {item.quantity}
                                            </p>

                                            <p>
                                                ₹{item.price * item.quantity}
                                            </p>

                                        </div>

                                    </div>
                                </div>

                            ))}

                        </div>

                        <div className="flex justify-between items-end mt-10">

                            <div>
                                <p className="uppercase tracking-[4px] text-gray-400 text-sm mb-2">
                                    Total
                                </p>

                                <h2 className="text-4xl font-serif">
                                    ₹{order.totalAmount}
                                </h2>
                            </div>

<button
    onClick={() => handleBuyAgain(order)}
    className="
    border
    border-[#D9CFC2]
    px-8
    py-4
    uppercase
    tracking-[2px]
    text-sm
    hover:bg-black
    hover:text-white
    transition
    "
>
    Buy Again
</button>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    )
}

export default OrderHistory