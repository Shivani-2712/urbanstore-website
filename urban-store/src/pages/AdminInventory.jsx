import { useEffect, useState } from "react"
import axios from "axios"
import AdminLayout from "../layouts/AdminLayout"

function AdminInventory() {

    const [inventory, setInventory] = useState(null)

    useEffect(() => {

        axios
            .get("http://localhost:5000/admin/inventory")
            .then((res) => {

                setInventory(res.data)

            })
            .catch(console.log)

    }, [])

    const restockProduct = async (id) => {

        const quantity = prompt("Enter quantity to add:")

        if (!quantity || isNaN(quantity)) return

        try {

            await axios.put(
                `http://localhost:5000/admin/restock/${id}`,
                {
                    quantity
                }
            )

            const res = await axios.get(
                "http://localhost:5000/admin/inventory"
            )

            setInventory(res.data)

            toast.success("Stock Updated Successfully!")

        } catch (error) {

            console.log(error)

            toast.error("Failed to update stock.")

        }

    }

    if (!inventory) {

        return (

            <AdminLayout>

                <div className="flex justify-center items-center h-[70vh]">

                    <h2 className="text-3xl font-serif">

                        Loading Inventory...

                    </h2>

                </div>

            </AdminLayout>

        )

    }

    return (

        <AdminLayout>

            <div className="flex justify-between items-center mb-10">

                <div>

                    <p className="uppercase tracking-[4px] text-gray-400">
                        UrbanStore Admin
                    </p>

                    <h1 className="text-4xl font-serif mt-2">
                        Inventory Management
                    </h1>

                </div>

            </div>

            <div className="grid md:grid-cols-4 gap-6">

                <div className="bg-white rounded-3xl shadow-sm p-8">

                    <p className="text-gray-500">
                        Total Products
                    </p>

                    <h2 className="text-5xl font-serif mt-4">
                        {inventory.totalProducts}
                    </h2>

                </div>

                <div className="bg-white rounded-3xl shadow-sm p-8">

                    <p className="text-gray-500">
                        Inventory Value
                    </p>

                    <h2 className="text-5xl font-serif mt-4">
                        ₹{inventory.inventoryValue.toLocaleString("en-IN")}
                    </h2>

                </div>

                <div className="bg-white rounded-3xl shadow-sm p-8">

                    <p className="text-gray-500">
                        Low Stock
                    </p>

                    <h2 className="text-5xl font-serif text-orange-500 mt-4">
                        {inventory.lowStockCount}
                    </h2>

                </div>

                <div className="bg-white rounded-3xl shadow-sm p-8">

                    <p className="text-gray-500">
                        Out Of Stock
                    </p>

                    <h2 className="text-5xl font-serif text-red-500 mt-4">
                        {inventory.outOfStockCount}
                    </h2>

                </div>

            </div>

            <div className="bg-white rounded-3xl shadow-sm p-8 mt-10 w-full">

                <h2 className="text-3xl font-serif mb-6">

                    Inventory List

                </h2>

                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead>

                            <tr className="border-b border-[#E8DCCB] uppercase tracking-[2px] text-xs text-gray-500">

                                <th className="py-4 text-left">
                                    Product
                                </th>

                                <th className="text-left">
                                    Category
                                </th>

                                <th className="align-middle text-center">
                                    Price
                                </th>

                                <th className="align-middle text-center">
                                    Stock
                                </th>

                                <th className="align-middle text-center">
                                    Status
                                </th>

                                <th className="align-middle text-center">
                                    Action
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {inventory.products.map((product) => (

                                <tr
                                    key={product._id}
                                    className="h-28 border-b border-[#F0E7DB] hover:bg-[#F8F4EE] transition"
                                >

                                    <td className="py-5">

                                        <div className="flex items-center gap-4">

                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-20 h-20 rounded-xl object-cover border"
                                            />

                                            <div>

                                                <p className="font-semibold text-lg">

                                                    {product.name}

                                                </p>

                                            </div>

                                        </div>

                                    </td>

                                    <td className="align-middle">

                                        {product.category}

                                    </td>

                                    <td className="align-middle text-center">
                                        ₹{product.price}
                                    </td>

                                    <td className="align-middle text-center">
                                        {product.stock}
                                    </td>

                                    <td className="align-middle text-center">

                                        <span
                                            className={`inline-flex items-center justify-center min-w-[120px] px-4 py-2 rounded-full text-sm font-semibold

                                ${product.stock === 0

                                                    ? "bg-red-100 text-red-700"

                                                    : product.stock <= 5

                                                        ? "bg-yellow-100 text-yellow-700"

                                                        : "bg-green-100 text-green-700"

                                                }`}
                                        >

                                            {

                                                product.stock === 0

                                                    ? "Out Of Stock"

                                                    : product.stock <= 5

                                                        ? "Low Stock"

                                                        : "In Stock"

                                            }

                                        </span>

                                    </td>

                                    <td className="align-middle text-center">

                                        <button
                                            onClick={() => restockProduct(product._id)}
                                            className="bg-[#D4A05F] text-white px-5 py-2 rounded-xl hover:bg-[#BC8C4D] hover:shadow-md transition"
                                        >
                                            Restock
                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </AdminLayout>

    )

}

export default AdminInventory