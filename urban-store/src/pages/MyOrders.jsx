import jsPDF from "jspdf"

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

    const downloadInvoice = (
    order
) => {
    const doc =
        new jsPDF()

    doc.setFontSize(24)

doc.text(
    "UrbanStore",
    20,
    20
)

doc.setFontSize(16)

doc.text(
    "INVOICE",
    20,
    30
)

doc.line(
    20,
    35,
    190,
    35
)

let infoY = 45

    doc.setFontSize(12)

    doc.text(
    `Invoice #: INV-${order._id
        .slice(-6)
        .toUpperCase()}`,
    20,
    infoY
)

doc.text(
    `Generated: ${new Date().toLocaleDateString()}`,
    20,
    infoY + 10
)

    doc.text(
        `Date: ${new Date(
            order.createdAt
        ).toLocaleDateString()}`,
        20,
        infoY + 20
    )

    doc.text(
    `Status: ${order.status}`,
    20,
    infoY + 30
)

doc.text(
    `Customer: ${order.customerName}`,
    20,
    infoY + 40
)

doc.text(
    `Email: ${order.email}`,
    20,
    infoY + 50
)

doc.text(
    `Phone: ${order.phone}`,
    20,
    infoY + 60
)

doc.text(
    `Address: ${order.address}`,
    20,
    infoY + 70
)

    let y = 140

doc.text(
    "Product",
    20,
    y
)

doc.text(
    "Qty",
    120,
    y
)

doc.text(
    "Price",
    160,
    y
)

y += 10

doc.line(
    20,
    y - 5,
    190,
    y - 5
)

    order.items.forEach(
        (item) => {
            doc.text(
    item.name,
    20,
    y
)

doc.text(
    `${item.quantity}`,
    120,
    y
)

doc.text(
    `Rs. ${item.price}`,
    160,
    y
)

            y += 10
        }
    )

    doc.line(
    20,
    y + 5,
    190,
    y + 5
)

doc.setFontSize(14)

doc.text(
    `Total Amount: Rs. ${order.totalAmount}`,
    20,
    y + 20
)

doc.setFontSize(10)

doc.text(
    "Thank you for shopping with UrbanStore!",
    20,
    y + 35
)

    doc.save(
        `invoice-${order._id}.pdf`
    )
}

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
                            <p className="font-medium text-gray-600 mb-2">
                                Order ID: #{order._id.slice(-6).toUpperCase()}
                            </p>

                            <p className="text-sm text-gray-500 mb-4">
                                Ordered on{" "}
                                {new Date(
                                    order.createdAt
                                ).toLocaleDateString()}
                            </p>

                            <div className="flex justify-between items-center mb-4">

                                <h2 className="text-2xl font-bold">
                                    ₹{order.totalAmount}
                                </h2>

                                <div
                                    className={`px-4 py-2 rounded-full text-white text-sm
        ${order.status === "Pending"
                                            ? "bg-yellow-500"
                                            : order.status === "Processing"
                                                ? "bg-blue-500"
                                                : order.status === "Shipped"
                                                    ? "bg-purple-500"
                                                    : "bg-green-500"
                                        }`}
                                >
                                    {order.status}
                                </div>

                            </div>

                            <div className="w-full bg-gray-200 h-3 rounded-full mt-3 mb-4">

                                <div
                                    className={`h-3 rounded-full bg-green-500 transition-all duration-500
        ${order.status ===
                                            "Pending"
                                            ? "w-1/4"

                                            : order.status ===
                                                "Processing"
                                                ? "w-2/4"

                                                : order.status ===
                                                    "Shipped"
                                                    ? "w-3/4"

                                                    : "w-full"
                                        }`}
                                />

                            </div>

                            <div className="flex justify-between text-xs text-gray-500 mb-4">

                                <span>
                                    Pending
                                </span>

                                <span>
                                    Processing
                                </span>

                                <span>
                                    Shipped
                                </span>

                                <span>
                                    Delivered
                                </span>

                            </div>

                            <p className="text-gray-500 mb-4">
                                Estimated Delivery:
                                {" "}
                                {new Date(
                                    new Date(order.createdAt)
                                        .getTime() +
                                    5 * 24 * 60 * 60 * 1000
                                ).toLocaleDateString()}
                            </p>

                            {order.status === "Delivered" && (
                                <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4">
                                    🎉 Your order has been delivered successfully!
                                </div>
                            )}

                            <button
    onClick={() =>
        downloadInvoice(
            order
        )
    }
    className="bg-black text-white px-4 py-2 rounded-lg mb-4"
>
    Download Invoice
</button>

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
                                            className="flex items-center gap-4 mb-4 border-b pb-4"
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

                                                <p className="text-gray-500">
                                                    ₹{item.price} • Qty: {item.quantity}
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