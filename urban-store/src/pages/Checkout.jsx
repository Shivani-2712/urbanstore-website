import { useState, useContext } from "react"
import axios from "axios"
import { CartContext } from "../context/CartContext"

function Checkout() {
    const { cartItems } =
        useContext(CartContext)

    const [formData, setFormData] =
        useState({
            customerName: "",
            email: "",
            phone: "",
            address: "",
        })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value,
        })
    }

    const totalAmount =
        cartItems.reduce(
            (total, item) =>
                total +
                item.price * item.quantity,
            0
        )

    const placeOrder = async (
        e
    ) => {
        e.preventDefault()

        try {
            await axios.post(
                "http://localhost:5000/orders",
                {
                    ...formData,
                    items: cartItems,
                    totalAmount,
                }
            )

            alert(
                "Order Placed Successfully 🎉"
            )
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="min-h-screen px-10 py-20">
            <h1 className="text-5xl font-bold mb-10">
                Checkout
            </h1>

            <form
                onSubmit={placeOrder}
                className="max-w-2xl"
            >
                <input
                    type="text"
                    name="customerName"
                    placeholder="Full Name"
                    value={
                        formData.customerName
                    }
                    onChange={handleChange}
                    className="w-full border p-4 mb-4 rounded"
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border p-4 mb-4 rounded"
                />

                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border p-4 mb-4 rounded"
                />

                <textarea
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full border p-4 mb-4 rounded"
                />

                <h2 className="text-2xl font-bold mb-6">
                    Total: ₹{totalAmount}
                </h2>

                <button
                    className="bg-black text-white px-8 py-4 rounded-lg"
                >
                    Place Order
                </button>
            </form>
        </div>
    )
}

export default Checkout