import { useEffect, useState } from "react"
import axios from "axios"

function AdminDashboard() {

    const [stats, setStats] =
        useState(null)

    useEffect(() => {

        axios
            .get(
                "http://localhost:5000/admin/stats"
            )
            .then((res) => {

                setStats(
                    res.data
                )

            })
            .catch((err) => {

                console.log(err)

            })

    }, [])

    if (!stats) {

        return (
            <h1 className="p-10">
                Loading...
            </h1>
        )

    }

    return (

        <div className="min-h-screen bg-[#F8F4EE] p-10">

            {/* Header */}

            <div className="mb-12">

                <p className="uppercase tracking-[4px] text-gray-400 mb-3">
                    UrbanStore Admin
                </p>

                <h1 className="text-5xl font-serif">
                    Dashboard
                </h1>

                <div className="w-24 h-px bg-[#D9CFC2] mt-6"></div>

            </div>

            {/* Stats Cards */}

            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">

                <div className="bg-white border border-[#E8DCCB] p-8 hover:shadow-lg transition duration-300">
                    <h2 className="uppercase tracking-[3px] text-xs text-gray-400">
                        Orders
                    </h2>

                    <p className="text-5xl font-serif mt-4">
                        {stats.totalOrders}
                    </p>
                </div>

                <div className="bg-white border border-[#E8DCCB] p-8 hover:shadow-lg transition duration-300">
                    <h2 className="uppercase tracking-[3px] text-xs text-gray-400">
                        Revenue
                    </h2>

                    <p className="text-5xl font-serif mt-4">
                        ₹{stats.totalRevenue.toLocaleString()}
                    </p>
                </div>

                <div className="bg-white border border-[#E8DCCB] p-8 hover:shadow-lg transition duration-300">
                    <h2 className="uppercase tracking-[3px] text-xs text-gray-400">
                        Customers
                    </h2>

                    <p className="text-5xl font-serif mt-4">
                        {stats.totalUsers}
                    </p>
                </div>

                <div className="bg-white border border-[#E8DCCB] p-8 hover:shadow-lg transition duration-300">
                    <h2 className="uppercase tracking-[3px] text-xs text-gray-400">
                        Products
                    </h2>

                    <p className="text-5xl font-serif mt-4">
                        {stats.totalProducts}
                    </p>
                </div>

                <div className="bg-white border border-[#E8DCCB] p-8 hover:shadow-lg transition duration-300">
                    <h2 className="uppercase tracking-[3px] text-xs text-gray-400">
                        Low Stock
                    </h2>

                    <p className="text-5xl font-serif mt-4 text-orange-500">
                        {stats.lowStockProducts}
                    </p>
                </div>

                <div className="bg-white border border-[#E8DCCB] p-8 hover:shadow-lg transition duration-300">
                    <h2 className="uppercase tracking-[3px] text-xs text-gray-400">
                        Out Of Stock
                    </h2>

                    <p className="text-5xl font-serif mt-4 text-red-500">
                        {stats.outOfStockProducts}
                    </p>
                </div>

            </div>

            {/* Action Buttons */}

            <div className="mt-12 mb-16 flex gap-4">

                <a href="/admin/orders"
                    className="bg-black text-white px-6 py-3 uppercase tracking-[2px]">
                    Manage Orders
                </a>

                <a href="/admin/products"
                    className="border border-[#D9CFC2] px-6 py-3 uppercase tracking-[2px] hover:bg-black hover:text-white transition">
                    Manage Products
                </a>

            </div>

            <div className="mt-16">

                <h2 className="text-4xl font-serif mb-8">
                    Store Health
                </h2>

                <div className="grid md:grid-cols-3 gap-6">

                    <div className="bg-white border border-[#E8DCCB] p-6">
                        <p className="uppercase tracking-[3px] text-xs text-gray-400 mb-3">
                            Inventory Status
                        </p>

                        <p className="text-lg">
                            {stats.outOfStockProducts === 0
                                ? "✅ All Products Available"
                                : `⚠️ ${stats.outOfStockProducts} Product(s) Out Of Stock`}
                        </p>
                    </div>

                    <div className="bg-white border border-[#E8DCCB] p-6">
                        <p className="uppercase tracking-[3px] text-xs text-gray-400 mb-3">
                            Low Stock Alert
                        </p>

                        <p className="text-lg">
                            {stats.lowStockProducts} Product(s) Need Restocking
                        </p>
                    </div>

                    <div className="bg-white border border-[#E8DCCB] p-6">
                        <p className="uppercase tracking-[3px] text-xs text-gray-400 mb-3">
                            Revenue Status
                        </p>

                        <p className="text-lg">
                            ₹{stats.totalRevenue.toLocaleString()}
                        </p>
                    </div>

                </div>

            </div>

            {/* Recent Orders */}

            <div className="mt-16">

                <h2 className="text-4xl font-serif mb-8">
                    Recent Orders
                </h2>

                <div className="bg-white border border-[#E8DCCB]">

                    <div className="grid grid-cols-3 p-6 bg-[#f4b66d] border-b border-[#E8DCCB] uppercase tracking-[2px] text-xs text-white-400">
                        <div>Customer</div>
                        <div>Amount</div>
                        <div>Status</div>
                    </div>

                    {stats.recentOrders.map((order) => (

                        <div key={order._id}
                            className="grid grid-cols-3 items-center p-6 border-b border-[#E8DCCB]">
                            <div>

                                <p className="font-medium">
                                    {order.customerName}
                                </p>

                                <p className="text-gray-500 text-sm">
                                    {order.email}
                                </p>

                            </div>

                            <div className="font-medium">
                                ₹{order.totalAmount}
                            </div>

                            <div>

                                <span className={`px-4 py-2 text-sm border
                                    ${order.status === "Paid"
                                        ? "bg-green-50 text-green-700 border-green-200"
                                        : order.status === "Cancelled"
                                            ? "bg-red-50 text-red-600 border-red-200"
                                            : "bg-blue-50 text-blue-600 border-blue-200"
                                    }`}>
                                    {order.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard