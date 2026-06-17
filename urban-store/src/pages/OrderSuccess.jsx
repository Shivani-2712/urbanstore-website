import { Link } from "react-router-dom"

function OrderSuccess() {
    return (
        <div className="min-h-screen bg-[#F8F4EE] flex items-center justify-center px-6">

            <div className="bg-white border border-[#E8DCCB] p-8 w-full max-w-xl text-center">

                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-50 border border-green-200 flex items-center justify-center text-4xl text-green-600">
                    ✓
                </div>

                <p className="uppercase tracking-[4px] text-gray-400 mb-4">
                    Thank You For Your Purchase
                </p>

                <h1 className="text-4xl font-serif mb-5">
                    Order Confirmed
                </h1>

                <div className="w-24 h-px bg-[#D9CFC2] mx-auto mb-8"></div>

                <p className="text-gray-400 text-sm tracking-[3px] uppercase mb-8">
                    Order ID #
                </p>

                <div className="bg-green-50 border border-green-200 text-green-700 py-3 px-4 mb-6 text-sm">
                    Payment verified successfully.
                </div>

                <div className="border-t border-[#E8DCCB] my-6"></div>

                <div className="grid grid-cols-3 gap-4 text-center mb-6">

                    <div>
                        <p className="text-xs uppercase tracking-[3px] text-gray-400">
                            Status
                        </p>

                        <p className="mt-2 font-medium text-green-600">
                            ✓ Paid
                        </p>
                    </div>

                    <div>
                        <p className="text-xs uppercase tracking-[3px] text-gray-400">
                            Delivery
                        </p>

                        <p className="mt-2 font-medium">
                            🚚 3-5 Days
                        </p>
                    </div>

                    <div>
                        <p className="text-xs uppercase tracking-[3px] text-gray-400">
                            Payment
                        </p>

                        <p className="mt-2 font-medium">
                            💳 Online
                        </p>
                    </div>

                </div>

                <p className="text-gray-500 mb-8">
                    Track your order anytime from your order history page.
                </p>

                <div className="flex justify-center gap-4 flex-wrap">

                    <Link
                        to="/my-orders"
                        className="bg-black text-white px-8 py-4 uppercase tracking-[3px] hover:opacity-90 transition">
                        View Orders
                    </Link>

                    <Link
                        to="/"
                        className="border border-[#D9CFC2] px-8 py-4 uppercase tracking-[3px] hover:bg-black hover:text-white transition">
                        Continue Shopping
                    </Link>

                </div>

            </div>

        </div>
    )
}

export default OrderSuccess