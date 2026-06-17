import { useEffect, useState, useContext } from "react"
import axios from "axios"
import { CartContext } from "../context/CartContext"
import { useNavigate, Link } from "react-router-dom"
import jsPDF from "jspdf"

function OrderHistory() {

    const [orders, setOrders] = useState([])
    const [loadingOrder, setLoadingOrder] = useState(null)
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

        Cancelled:
            "bg-red-50 text-red-600 border-red-200",
    }

    const downloadInvoice = (order) => {

        const doc = new jsPDF()

        doc.setFontSize(24)
        doc.text("UrbanStore", 20, 20)

        doc.setFontSize(16)
        doc.text("INVOICE", 20, 30)

        doc.line(20, 35, 190, 35)

        let infoY = 45

        doc.setFontSize(12)

        doc.text(
            `Invoice #: INV-${order._id.slice(-6).toUpperCase()}`,
            20,
            infoY
        )

        doc.text(
            `Generated: ${new Date().toLocaleDateString()}`,
            20,
            infoY + 10
        )

        doc.text(
            `Date: ${new Date(order.createdAt).toLocaleDateString()}`,
            20,
            infoY + 20
        )

        doc.text(
            `Status: ${order.status}`,
            20,
            infoY + 30
        )

        let y = 120

        order.items.forEach((item) => {

            doc.text(item.name, 20, y)

            doc.text(
                `${item.quantity}`,
                120,
                y
            )

            doc.text(
                `₹${item.price}`,
                160,
                y
            )

            y += 10
        })

        doc.text(
            `Total Amount: ₹${order.totalAmount}`,
            20,
            y + 20
        )

        doc.save(
            `invoice-${order._id}.pdf`
        )
    }

    const cancelOrder = async (orderId) => {

        try {

            await axios.put(
                `http://localhost:5000/orders/${orderId}`,
                {
                    status: "Cancelled",
                }
            )

            setOrders(
                orders.map((order) =>
                    order._id === orderId
                        ? {
                            ...order,
                            status: "Cancelled",
                        }
                        : order
                )
            )

        } catch (error) {

            console.log(error)

        }
    }

    const handleBuyAgain = async (order) => {

        setLoadingOrder(order._id)

        try {

            for (const item of order.items) {
                await addToCart(item)
            }

            navigate("/cart")

        } catch (error) {

            console.log(error)

        } finally {

            setLoadingOrder(null)

        }
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

                {orders.length === 0 ? (

                    <div className="text-center py-24">

                        <div className="text-7xl mb-6">
                            📦
                        </div>

                        <h2 className="text-3xl font-serif mb-4">
                            No Orders Yet
                        </h2>

                        <p className="text-gray-500 mb-8">
                            Looks like you haven't placed any orders yet.
                        </p>

                        <Link
                            to="/"
                            className="inline-block mt-8 bg-black text-white px-8 py-4 uppercase tracking-[3px]">
                            Continue Shopping
                        </Link>

                    </div>

                ) : (

                    orders.map((order) => (

                        <div
                            key={order._id}
                            className="bg-white border border-[#E8DCCB] p-8 hover:shadow-lg transition duration-300">

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
                                    className={`inline-flex items-center justify-center px-4 py-2 rounded-md border text-sm font-medium
                                        ${statusColor[order.status]}`}>
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
                                        className="flex justify-between items-center mb-4">

                                        <div className="flex items-center gap-4">

                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-24 h-24 object-cover border border-[#E8DCCB]" />

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
                                                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                                                </p>

                                            </div>

                                        </div>
                                    </div>

                                ))}

                            </div>

                            {order.status !== "Cancelled" && (
                                <div className="w-full bg-[#EFE7DB] h-2 rounded-full mt-8">

                                    <div
                                        className={`h-2 rounded-full bg-green-500
                                        ${order.status === "Pending"
                                                ? "w-1/4"
                                                : order.status === "Paid"
                                                    ? "w-2/4"
                                                    : order.status === "Shipped"
                                                        ? "w-3/4"
                                                        : "w-full"}
                                            `} />
                                </div>
                            )}

                            {order.status !== "Cancelled" && (

                                <div className="flex justify-between text-xs text-gray-500 mt-3">

                                    <span>Pending</span>

                                    <span>Paid</span>

                                    <span>Shipped</span>

                                    <span>Delivered</span>

                                </div>

                            )}
                            {order.status !== "Cancelled" && (
                                <p className="text-gray-500 mt-5">

                                    Estimated Delivery:
                                    {order.status === "Delivered" && (

                                        <div
                                            className="mt-4 bg-green-50 border border-green-200 text-green-700 p-4">
                                            🎉 Your order has been delivered successfully!
                                        </div>

                                    )}

                                    {" "}

                                    {new Date(
                                        new Date(order.createdAt).getTime() +
                                        5 * 24 * 60 * 60 * 1000
                                    ).toLocaleDateString()}

                                </p>
                            )}

                            {order.status === "Delivered" && (

                                <div
                                    className="mt-4 bg-green-50 border border-green-200 text-green-700 p-4"
                                >
                                    🎉 Your order has been delivered successfully!
                                </div>

                            )}

                            <div className="border-t border-[#E8DCCB] my-8"></div>
                            <div className="flex justify-between items-center mt-10">

                                <div>
                                    <p className="uppercase tracking-[4px] text-gray-400 text-sm mb-2">
                                        Total
                                    </p>

                                    <h2 className="text-4xl font-serif">
                                        ₹{Math.round(order.totalAmount).toLocaleString("en-IN")}
                                    </h2>
                                </div>

                                <div className="flex gap-4">

                                    {order.status !== "Cancelled" && (

                                        <button
                                            onClick={() =>
                                                downloadInvoice(order)
                                            }
                                            className="bg-black text-white px-6 py-3 uppercase tracking-[2px] text-sm"
                                        >
                                            Download Invoice
                                        </button>

                                    )}

                                    {(
                                        order.status === "Pending" ||
                                        order.status === "Paid"
                                    ) && (

                                            <button
                                                onClick={() =>
                                                    cancelOrder(order._id)
                                                }
                                                className="border border-red-300 text-red-600 px-6 py-3 uppercase tracking-[2px] text-sm hover:bg-red-600 hover:text-white transition">
                                                Cancel Order
                                            </button>

                                        )}

                                    <button
                                        onClick={() =>
                                            handleBuyAgain(order)
                                        }
                                        className={`px-8 py-4 uppercase tracking-[2px] text-sm transition
                                        ${order.status === "Cancelled"
                                                ? "bg-black text-white"
                                                : "border border-[#D9CFC2] hover:bg-black hover:text-white"
                                            }
                                        `}>
                                            
                                        {
                                            loadingOrder === order._id
                                                ? "Adding..."
                                                : order.status === "Cancelled"
                                                    ? "Reorder"
                                                    : "Buy Again"
                                        }
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))
                )}

            </div>

        </div>
    )
}

export default OrderHistory