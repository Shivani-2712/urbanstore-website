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
        <div className="min-h-screen bg-gray-100 p-10">

            <h1 className="text-5xl font-bold mb-10">
                Admin Dashboard
            </h1>

            <div className="grid md:grid-cols-4 gap-6">

                <div className="bg-white p-6 rounded-2xl shadow">
                    <h2 className="text-gray-500">
                        Orders
                    </h2>

                    <p className="text-4xl font-bold mt-2">
                        {stats.totalOrders}
                    </p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow">
                    <h2 className="text-gray-500">
                        Revenue
                    </h2>

                    <p className="text-4xl font-bold mt-2">
                        ₹{stats.totalRevenue}
                    </p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow">
                    <h2 className="text-gray-500">
                        Customers
                    </h2>

                    <p className="text-4xl font-bold mt-2">
                        {stats.totalUsers}
                    </p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow">
                    <h2 className="text-gray-500">
                        Products
                    </h2>

                    <p className="text-4xl font-bold mt-2">
                        {stats.totalProducts}
                    </p>
                </div>

                <div className="mt-10">

                <div className="mt-12">

    <h2 className="text-3xl font-bold mb-6">
        Recent Orders
    </h2>

    <div className="bg-white rounded-2xl shadow overflow-hidden">

        {stats.recentOrders.map(
            (order) => (

                <div
                    key={order._id}
                    className="flex justify-between p-4 border-b"
                >

                    <div>
                        <p className="font-semibold">
                            {order.customerName}
                        </p>

                        <p className="text-gray-500">
                            {order.email}
                        </p>
                    </div>

                    <div>
                        ₹{order.totalAmount}
                    </div>

                    <div>
                        {order.status}
                    </div>

                </div>
            )
        )}

    </div>

</div>
                    <div className="mt-10 flex gap-4">

    <a
        href="/admin/orders"
        className="bg-black text-white px-6 py-3 rounded-lg"
    >
        Manage Orders
    </a>

    <a
        href="/admin/products"
        className="bg-blue-500 text-white px-6 py-3 rounded-lg"
    >
        Manage Products
    </a>

</div>

                </div>

            </div>

        </div>
    )
}

export default AdminDashboard