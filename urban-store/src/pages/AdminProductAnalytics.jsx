import { useEffect, useState } from "react"
import axios from "axios"
import AdminLayout from "../layouts/AdminLayout"

function AdminProductAnalytics() {

    const [products, setProducts] = useState([])
    const [search, setSearch] = useState("")

    useEffect(() => {

        axios
            .get("http://localhost:5000/admin/product-analytics")
            .then((res) => {

                setProducts(res.data)

            })
            .catch((err) => {

                console.log(err)

            })

    }, [])

    return (

        <AdminLayout>

            <div className="mb-10">

                <h1 className="text-3xl font-serif">
                    Product Analytics
                </h1>

                <p className="text-gray-500 mt-2">
                    Sales & Inventory Performance
                </p>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

                    <div className="bg-white rounded-3xl shadow-sm p-8">

                        <p className="text-gray-500 uppercase tracking-[2px] text-sm">
                            Products
                        </p>

                        <h2 className="text-5xl font-serif mt-4">
                            {products.length}
                        </h2>

                    </div>

                    <div className="bg-white rounded-3xl shadow-sm p-8">

                        <p className="text-gray-500 uppercase tracking-[2px] text-sm">
                            Units Sold
                        </p>

                        <h2 className="text-5xl font-serif mt-4">
                            {
                                products.reduce(
                                    (sum, product) => sum + product.sold,
                                    0
                                )
                            }
                        </h2>

                    </div>

                    <div className="bg-white rounded-3xl shadow-sm p-8">

                        <p className="text-gray-500 uppercase tracking-[2px] text-sm">
                            Revenue
                        </p>

                        <h2 className="text-4xl font-serif mt-4">
                            ₹{
                                products
                                    .reduce(
                                        (sum, product) =>
                                            sum + product.revenue,
                                        0
                                    )
                                    .toLocaleString()
                            }
                        </h2>

                    </div>

                    <div className="bg-white rounded-3xl shadow-sm p-8">

                        <p className="text-gray-500 uppercase tracking-[2px] text-sm">
                            Low Stock
                        </p>

                        <h2 className="text-5xl font-serif mt-4 text-orange-500">
                            {
                                products.filter(
                                    (product) =>
                                        product.stock <= 5
                                ).length
                            }
                        </h2>

                    </div>

                </div>

            </div>

            <div className="my-8 flex justify-between items-center">

                <h2 className="text-2xl font-serif">
                    Product Performance
                </h2>

                <input
                    type="text"
                    placeholder="🔍 Search Product..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    className="w-[350px] p-4 rounded-xl bg-white border border-[#D9CFC2] shadow-sm outline-none"
                />

            </div>

            <div className="bg-white rounded-3xl shadow-sm overflow-hidden">

                <table className="w-full">

                    <thead>

                        <tr className="bg-[#EFE7DB] uppercase tracking-[2px] text-xs">

                            <th className="p-5 text-left">
                                Product
                            </th>

                            <th className="p-5 text-center">
                                Stock
                            </th>

                            <th className="p-5 text-center">
                                Sold
                            </th>

                            <th className="p-5 text-center">
                                Revenue
                            </th>

                            <th className="p-5 text-center">
                                Status
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            products
                                .filter((product) =>
                                    product.name
                                        .toLowerCase()
                                        .includes(search.toLowerCase())
                                )
                                .length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="5"
                                        className="text-center py-10 text-gray-500"
                                    >
                                        No products found.
                                    </td>

                                </tr>

                            ) : (
                                products
                                    .filter((product) =>
                                        product.name
                                            .toLowerCase()
                                            .includes(search.toLowerCase())
                                    )
                                    .map((product) => (

                                        <tr
                                            key={product._id}
                                            className="border-b border-[#F0E7DB]"
                                        >

                                            <td className="p-5 font-medium">
                                                {product.name}
                                            </td>

                                            <td className="text-center">
                                                {product.stock}
                                            </td>

                                            <td className="text-center">
                                                {product.sold}
                                            </td>

                                            <td className="text-center">
                                                ₹{product.revenue.toLocaleString()}
                                            </td>

                                            <td className="text-center">

                                                {
                                                    product.stock === 0 ?

                                                        <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-sm">
                                                            Out Of Stock
                                                        </span>

                                                        :

                                                        product.stock <= 5 ?

                                                            <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm">
                                                                Low Stock
                                                            </span>

                                                            :

                                                            <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                                                                Healthy
                                                            </span>

                                                }

                                            </td>

                                        </tr>

                                    ))
                            )}

                    </tbody>

                </table>

            </div>

        </AdminLayout>

    )

}

export default AdminProductAnalytics