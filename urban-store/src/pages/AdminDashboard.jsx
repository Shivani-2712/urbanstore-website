import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts"

import jsPDF from "jspdf"
import { useEffect, useState } from "react"
import axios from "axios"
import AdminSidebar from "../components/AdminSidebar"

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

    const downloadSalesReport = () => {

        const doc = new jsPDF()

        // HEADER
        doc.setFontSize(26)
        doc.text("URBANSTORE", 20, 20)

        doc.setFontSize(12)
        doc.text(
            "Admin Sales Report",
            20,
            30
        )

        doc.setFontSize(18)
        doc.text(
            "Sales Report",
            20,
            42
        )

        doc.line(
            20,
            48,
            190,
            48
        )

        // REPORT INFO
        doc.setFontSize(12)

        doc.text(
            `Generated On: ${new Date().toLocaleDateString()}`,
            20,
            62
        )

        // SUMMARY BOX
        doc.setFillColor(245, 240, 230)

        doc.rect(
            20,
            72,
            170,
            65,
            "F"
        )

        doc.setFontSize(13)

        doc.text(
            `Total Revenue: Rs. ${stats.totalRevenue.toLocaleString("en-IN")}`,
            30,
            90
        )

        doc.text(
            `Total Orders: ${stats.totalOrders}`,
            30,
            102
        )

        doc.text(
            `Total Customers: ${stats.totalUsers}`,
            30,
            114
        )

        doc.text(
            `Total Products: ${stats.totalProducts}`,
            30,
            126
        )

        // TOP SELLING PRODUCTS
        doc.setFontSize(18)

        doc.text(
            "Top Selling Products",
            20,
            160
        )

        let y = 175

        stats.topSellingProducts?.forEach(
            (product, index) => {

                doc.setFontSize(13)

                doc.text(
                    `${index + 1}. ${product.name} - ${product.sold} sold`,
                    20,
                    y
                )

                y += 12
            }
        )

        // FOOTER
        doc.setFontSize(10)

        doc.text(
            "Generated automatically by UrbanStore Admin Dashboard",
            20,
            280
        )

        doc.save(
            "UrbanStore-Sales-Report.pdf"
        )
    }

    return (

        <div className="min-h-screen flex bg-[#F4F7FE]">

            <AdminSidebar />

            <div className="flex-1 p-10 ml-80">

                <div className="flex justify-between items-center mb-10">

                    <input
                        type="text"
                        placeholder="Search products, orders..."
                        className="w-[400px] px-6 py-4 rounded-2xl bg-white border border-[#E8DCCB] outline-none" />

                    <div className="flex items-center gap-4">

                        <div className="w-12 h-12 rounded-full bg-white rounded-3xl shadow-sm p-8 flex items-center justify-center">
                            🔔
                        </div>

                        <div className="flex items-center gap-3">

                            <div className="w-12 h-12 rounded-full bg-[#D9CFC2]"></div>

                            <div>
                                <p className="font-semibold">
                                    Admin
                                </p>

                                <p className="text-sm text-gray-500">
                                    UrbanStore
                                </p>
                            </div>

                        </div>

                    </div>

                </div>


                {/* Header */}

                <div className="mb-12">

                    <p className="uppercase tracking-[4px] text-gray-400 mb-3">
                        UrbanStore Admin
                    </p>

                    <h1 className="text-3xl font-serif">
                        Dashboard Overview
                    </h1>

                    <div className="w-24 h-px bg-[#D9CFC2] mt-6"></div>

                </div>

                {/* Stats Cards */}

                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">

                    {/* Orders */}
                    <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
                        <div className="bg-[#EFE7DB] py-3 text-center uppercase tracking-[2px] text-sm">
                            Orders
                        </div>

                        <div className="p-8 text-center">
                            <h2 className="text-6xl font-serif">
                                {stats.totalOrders}
                            </h2>
                        </div>
                    </div>

                    {/* Revenue */}
                    <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
                        <div className="bg-[#EFE7DB] py-3 text-center uppercase tracking-[2px] text-sm">
                            Revenue
                        </div>

                        <div className="p-8 text-center">
                            <h2 className="text-4xl font-serif">
                                ₹{stats.totalRevenue.toLocaleString()}
                            </h2>
                        </div>
                    </div>

                    {/* Customers */}
                    <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
                        <div className="bg-[#EFE7DB] py-3 text-center uppercase tracking-[2px] text-sm">
                            Customers
                        </div>

                        <div className="p-8 text-center">
                            <h2 className="text-6xl font-serif">
                                {stats.totalUsers}
                            </h2>
                        </div>
                    </div>

                    {/* Products */}
                    <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
                        <div className="bg-[#EFE7DB] py-3 text-center uppercase tracking-[2px] text-sm">
                            Products
                        </div>

                        <div className="p-8 text-center">
                            <h2 className="text-6xl font-serif">
                                {stats.totalProducts}
                            </h2>
                        </div>
                    </div>

                    {/* Low Stock */}
                    <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
                        <div className="bg-[#FFF3E6] py-3 text-center uppercase tracking-[2px] text-sm">
                            Low Stock
                        </div>

                        <div className="p-8 text-center">
                            <h2 className="text-6xl font-serif text-orange-500">
                                {stats.lowStockProducts}
                            </h2>
                        </div>
                    </div>

                    {/* Out Of Stock */}
                    <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
                        <div className="bg-[#FFEAEA] py-3 text-center uppercase tracking-[2px] text-sm">
                            Out Of Stock
                        </div>

                        <div className="p-8 text-center">
                            <h2 className="text-6xl font-serif text-red-500">
                                {stats.outOfStockProducts}
                            </h2>
                        </div>
                    </div>

                </div>

                <div className="grid lg:grid-cols-2 gap-6 mt-10">

                    {/* Order Status */}

                    <div className="bg-white rounded-3xl shadow-sm p-6">

                        <h3 className="text-2xl font-serif mb-6">
                            Order Status
                        </h3>

                        <div className="grid grid-cols-2 gap-4">

                            <div className="bg-[#FCFAF2] rounded-2xl p-4">
                                <p className="text-gray-500">Pending</p>
                                <h2 className="text-4xl font-serif">
                                    {stats.pendingOrders}
                                </h2>
                            </div>

                            <div className="bg-[#F4FBF6] rounded-2xl p-4">
                                <p className="text-gray-500">Paid</p>
                                <h2 className="text-4xl font-serif text-green-600">
                                    {stats.paidOrders}
                                </h2>
                            </div>

                            <div className="bg-[#F4F8FF] rounded-2xl p-4">
                                <p className="text-gray-500">Shipped</p>
                                <h2 className="text-4xl font-serif text-blue-600">
                                    {stats.shippedOrders}
                                </h2>
                            </div>

                            <div className="bg-[#F5F3FF] rounded-2xl p-4">
                                <p className="text-gray-500">Delivered</p>
                                <h2 className="text-4xl font-serif text-purple-600">
                                    {stats.deliveredOrders}
                                </h2>
                            </div>

                            <div className="bg-red-50 rounded-2xl p-4 col-span-2">
                                <p className="text-gray-500">Cancelled</p>
                                <h2 className="text-4xl font-serif text-red-600">
                                    {stats.cancelledOrders}
                                </h2>
                            </div>

                        </div>

                    </div>

                    {/* Revenue Analytics */}

                    <div className="bg-white rounded-3xl shadow-sm p-6">

                        <h3 className="text-2xl font-serif mb-6">
                            Revenue Analytics
                        </h3>

                        <ResponsiveContainer
                            width="100%"
                            height={300}
                        >

                            <BarChart
                                data={stats.revenueChartData}
                            >

                                <CartesianGrid
                                    strokeDasharray="3 3"
                                />

                                <XAxis
                                    dataKey="month"
                                />

                                <YAxis />

                                <Tooltip />

                                <Bar
                                    dataKey="revenue"
                                    fill="#D4A05F"
                                    barSize={50}
                                // radius={[8, 8, 0, 0]}
                                />

                            </BarChart>

                        </ResponsiveContainer>

                    </div>

                </div>

                {/* Action Buttons */}

                <div className="mt-10">

                    <div className="bg-white rounded-3xl shadow-sm p-6">

                        <h3 className="text-xl font-serif mb-5">
                            Quick Actions
                        </h3>

                        <div className="flex gap-4 flex-wrap">

                            <a
                                href="/admin/orders"
                                className="bg-black text-white px-6 py-3 uppercase tracking-[2px] rounded-xl"
                            >
                                Manage Orders
                            </a>

                            <a
                                href="/admin/products"
                                className="border border-[#D9CFC2] px-6 py-3 uppercase tracking-[2px] rounded-xl hover:bg-black hover:text-white transition"
                            >
                                Manage Products
                            </a>

                            <button
                                onClick={downloadSalesReport}
                                className="bg-green-600 text-white px-6 py-3 uppercase tracking-[2px] rounded-xl hover:bg-green-700 transition"
                            >
                                Download Report
                            </button>

                            <a
                                href="/admin/coupons"
                                className="border border-[#D9CFC2] px-6 py-3 uppercase tracking-[2px] rounded-xl hover:bg-black hover:text-white transition"
                            >
                                Manage Coupons
                            </a>

                        </div>

                    </div>

                </div>

                <div className="border-t border-[#E8DCCB] my-12"></div>

                <div className="mt-16">

                    <h2 className="text-4xl font-serif mb-8">
                        Store Health
                    </h2>

                    <div className="grid md:grid-cols-3 gap-6">

                        <div className="bg-white rounded-3xl shadow-sm p-8 p-6">
                            <p className="uppercase tracking-[3px] text-xs text-gray-400 mb-3">
                                Inventory Status
                            </p>

                            <p className="text-lg">
                                {stats.outOfStockProducts === 0
                                    ? "✅ All Products Available"
                                    : `⚠️ ${stats.outOfStockProducts} Product(s) Out Of Stock`}
                            </p>
                        </div>

                        <div className="bg-white rounded-3xl shadow-sm p-8 p-6">
                            <p className="uppercase tracking-[3px] text-xs text-gray-400 mb-3">
                                Low Stock Alert
                            </p>

                            <p className="text-lg">
                                {stats.lowStockProducts} Product(s) Need Restocking
                            </p>
                        </div>

                        <div className="bg-white rounded-3xl shadow-sm p-8 p-6">
                            <p className="uppercase tracking-[3px] text-xs text-gray-400 mb-3">
                                Revenue Status
                            </p>

                            <p className="text-lg">
                                ₹{stats.totalRevenue.toLocaleString()}
                            </p>
                        </div>

                    </div>

                </div>

                <div className="mt-16">

                    <h2 className="text-4xl font-serif mb-8">
                        Top Selling Products
                    </h2>

                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 p-6 mb-6">

                        <p className="uppercase tracking-[3px] text-xs text-gray-500 mb-2">
                            Best Seller
                        </p>

                        <h3 className="text-3xl font-serif">
                            🏆 {stats.topSellingProducts?.[0]?.name}
                        </h3>

                        <p className="text-green-600 mt-2">
                            {stats.topSellingProducts?.[0]?.sold} Units Sold
                        </p>

                    </div>

                    <div className="bg-white rounded-3xl shadow-sm p-8">

                        <div className="grid grid-cols-2 p-6 bg-[#f4b66d] border-b border-[#E8DCCB] uppercase tracking-[2px] text-xs">
                            <div>Product</div>
                            <div>Units Sold</div>
                        </div>

                        {stats.topSellingProducts?.map((product, index) => (

                            <div
                                key={index}
                                className="grid grid-cols-2 p-6 border-b border-[#E8DCCB]"
                            >

                                <div className="font-medium">
                                    {
                                        index === 0
                                            ? "🥇"
                                            : index === 1
                                                ? "🥈"
                                                : index === 2
                                                    ? "🥉"
                                                    : `#${index + 1}`
                                    } {product.name}
                                </div>

                                <div>
                                    <span className="font-semibold text-green-600">
                                        {product.sold} Sold
                                    </span>
                                </div>

                            </div>

                        ))}

                    </div>

                </div>

                {/* Recent Orders */}

                <div className="bg-white rounded-[30px] p-8 shadow-sm mt-10">

                    <div className="flex justify-between items-center mb-6">

                        <h2 className="text-3xl font-serif">
                            Recent Orders
                        </h2>

                        <a
                            href="/admin/orders"
                            className="text-sm uppercase tracking-[2px] text-gray-500 hover:text-black"
                        >
                            View All
                        </a>

                    </div>

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead>

                                <tr className="border-b border-[#E8DCCB] text-left uppercase tracking-[2px] text-xs text-gray-500">

                                    <th className="py-4">
                                        Customer
                                    </th>

                                    <th className="py-4">
                                        Amount
                                    </th>

                                    <th className="py-4">
                                        Status
                                    </th>

                                    <th className="py-4">
                                        Date
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {stats.recentOrders.map((order) => (

                                    <tr
                                        key={order._id}
                                        className="border-b border-[#F0E7DB]"
                                    >

                                        <td className="py-5">

                                            <div>

                                                <p className="font-medium">
                                                    {order.customerName}
                                                </p>

                                                <p className="text-sm text-gray-500">
                                                    {order.email}
                                                </p>

                                            </div>

                                        </td>

                                        <td className="py-5 font-medium">
                                            ₹{order.totalAmount}
                                        </td>

                                        <td className="py-5">

                                            <span
                                                className={`px-3 py-2 rounded-full text-xs font-medium
                                ${order.status === "Paid"
                                                        ? "bg-green-100 text-green-700"
                                                        : order.status === "Cancelled"
                                                            ? "bg-red-100 text-red-600"
                                                            : order.status === "Shipped"
                                                                ? "bg-blue-100 text-blue-600"
                                                                : order.status === "Delivered"
                                                                    ? "bg-purple-100 text-purple-600"
                                                                    : "bg-yellow-100 text-yellow-700"
                                                    }`}
                                            >
                                                {order.status}
                                            </span>

                                        </td>

                                        <td className="py-5 text-gray-500">

                                            {new Date(
                                                order.createdAt
                                            ).toLocaleDateString()}

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default AdminDashboard