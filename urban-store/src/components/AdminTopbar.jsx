import { useState, useEffect } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import NotificationDropdown from "./NotificationDropdown"

function AdminTopbar({ notifications }) {

    const [showNotifications, setShowNotifications] =
        useState(false)

    const [search, setSearch] = useState("")

    const [results, setResults] = useState({
        products: [],
        orders: [],
        users: [],
    })

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleLogout = () => {

        if (
            window.confirm(
                "Are you sure you want to logout?"
            )
        ) {

            localStorage.removeItem("adminToken")

            navigate("/admin-login")

        }

    }

    useEffect(() => {

        if (!search.trim()) {

            setResults({
                products: [],
                orders: [],
                users: [],
            })

            return

        }

        const timer = setTimeout(() => {

            setLoading(true)

            axios
                .get(
                    `http://localhost:5000/admin/search?query=${search}`
                )
                .then((res) => {

                    setResults(res.data)

                })
                .catch(console.log)
                .finally(() => {

                    setLoading(false)

                })

        }, 300)

        return () => clearTimeout(timer)

    }, [search])

    return (

        <div className="sticky top-0 z-40 bg-white shadow-sm px-10 py-5 flex justify-between items-center">

            <div className="relative w-[420px]">

                <input
                    type="text"
                    placeholder="Search products, orders, customers..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full px-5 py-3 rounded-xl border border-[#E8DCCB] outline-none"
                />

                {
                    search && (

                        <div className="absolute top-16 left-0 w-full bg-white rounded-2xl shadow-xl border border-[#E8DCCB] z-50 max-h-[450px] overflow-y-auto">

                            {
                                loading && (

                                    <div className="p-5 text-center">

                                        Searching...

                                    </div>

                                )
                            }

                            {/* PRODUCTS */}

                            {
                                results.products.length > 0 && (

                                    <>

                                        <div className="px-5 py-3 bg-gray-100 font-semibold">

                                            Products

                                        </div>

                                        {
                                            results.products.map(product => (

                                                <Link
                                                    key={product._id}
                                                    to="/admin/products"
                                                    onClick={() => setSearch("")}
                                                    className="flex items-center gap-4 p-4 hover:bg-gray-50"
                                                >
                                                    <img
                                                        src={product.image}
                                                        className="w-12 h-12 rounded-lg object-cover"
                                                    />

                                                    <div>

                                                        <p className="font-medium">

                                                            {product.name}

                                                        </p>

                                                        <p className="text-sm text-gray-500">

                                                            ₹{product.price}

                                                        </p>

                                                    </div>

                                                </Link>
                                            ))
                                        }

                                    </>

                                )
                            }

                            {/* ORDERS */}

                            {
                                results.orders.length > 0 && (

                                    <>

                                        <div className="px-5 py-3 bg-gray-100 font-semibold">

                                            Orders

                                        </div>

                                        {
                                            results.orders.map(order => (

                                                <Link
                                                    key={order._id}
                                                    to={`/admin/orders/${order._id}`}
                                                    onClick={() => setSearch("")}
                                                    className="block p-4 hover:bg-gray-50"
                                                >

                                                    <p className="font-medium">

                                                        {order.customerName}

                                                    </p>

                                                    <p className="text-sm text-gray-500">

                                                        ₹{order.totalAmount}

                                                    </p>

                                                </Link>

                                            ))
                                        }

                                    </>

                                )
                            }

                            {/* CUSTOMERS */}

                            {
                                results.users.length > 0 && (

                                    <>

                                        <div className="px-5 py-3 bg-gray-100 font-semibold">

                                            Customers

                                        </div>

                                        {
                                            results.users.map(user => (

                                                <Link
                                                    key={user._id}
                                                    to="/admin/users"
                                                    onClick={() => setSearch("")}
                                                    className="block p-4 hover:bg-gray-50"
                                                >

                                                    <p className="font-medium">

                                                        {user.name}

                                                    </p>

                                                    <p className="text-sm text-gray-500">

                                                        {user.email}

                                                    </p>

                                                </Link>

                                            ))
                                        }

                                    </>

                                )
                            }

                            {
                                !loading &&
                                results.products.length === 0 &&
                                results.orders.length === 0 &&
                                results.users.length === 0 && (

                                    <div className="p-5 text-center text-gray-500">

                                        No results found

                                    </div>

                                )
                            }

                        </div>

                    )
                }

            </div>

            <div className="flex items-center gap-5">

                <div className="relative">

                    <button
                        onClick={() =>
                            setShowNotifications(
                                !showNotifications
                            )
                        }
                        className="w-14 h-14 rounded-2xl bg-white border border-[#E8DCCB] shadow-sm flex items-center justify-center text-2xl relative"
                    >

                        🔔

                        {
                            notifications.length > 0 && (

                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">

                                    {notifications.length}

                                </span>

                            )
                        }

                    </button>

                    {
                        showNotifications && (

                            <NotificationDropdown
                                notifications={notifications}
                            />

                        )
                    }

                </div>

                <div className="flex items-center gap-4">

                    <div className="text-right">

                        <p className="font-semibold">
                            Admin
                        </p>

                        <p className="text-sm text-gray-500">
                            UrbanStore
                        </p>

                    </div>

                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition"
                    >
                        Logout
                    </button>

                </div>

            </div>

        </div>

    )

}

export default AdminTopbar