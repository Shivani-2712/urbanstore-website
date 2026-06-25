import { Link } from "react-router-dom"

function NotificationDropdown({ notifications }) {

    return (

        <div className="absolute right-0 mt-4 w-80 bg-white rounded-2xl shadow-xl border border-[#E8DCCB] overflow-hidden">

            <div className="p-5 border-b">

                <h3 className="font-semibold">
                    Low Stock Alerts
                </h3>

            </div>

            {
                notifications.length === 0 ?

                    (

                        <div className="p-5 text-gray-500">

                            No notifications 🎉

                        </div>

                    )

                    :

                    notifications.map((product) => (

                        <div
                            key={product._id}
                            className="flex justify-between items-center p-5 border-b"
                        >

                            <div>

                                <p className="font-medium">
                                    {product.name}
                                </p>

                                <p className="text-sm text-gray-500">

                                    {
                                        product.stock === 0
                                            ? "Out Of Stock"
                                            : `Only ${product.stock} Left`
                                    }

                                </p>

                            </div>

                            <span className="text-xl">

                                {
                                    product.stock === 0
                                        ? "❌"
                                        : "⚠️"
                                }

                            </span>

                        </div>

                    ))
            }

            <Link
                to="/admin/products"
                className="block text-center p-4 hover:bg-[#F8F4EE]"
            >
                View Products →
            </Link>

        </div>

    )

}

export default NotificationDropdown