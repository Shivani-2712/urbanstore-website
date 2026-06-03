import { Link } from "react-router-dom"

function OrderSuccess() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
            <div className="bg-white p-10 rounded-3xl shadow-lg text-center max-w-xl">
                <h1 className="text-6xl mb-4">🎉</h1>

                <h2 className="text-4xl font-bold mb-4">
                    Order Placed Successfully!
                </h2>

                <p className="text-gray-600 mb-8">
                    Thank you for shopping with UrbanStore.
                    Your order has been received and is being processed.
                </p>

                <Link
                    to="/"
                    className="bg-black text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition"
                >
                    Continue Shopping
                </Link>
            </div>
        </div>
    )
}

export default OrderSuccess