import { useState, useContext, useEffect } from "react"
import axios from "axios"
import { CartContext } from "../context/CartContext"
import { useNavigate } from "react-router-dom"

function Checkout() {
    const {
        cartItems,
        clearCart,
    } = useContext(CartContext)

    const navigate = useNavigate()

    const user =
        JSON.parse(
            localStorage.getItem(
                "userInfo"
            )
        )

    const [formData, setFormData] =
        useState({
            customerName:
                user?.name || "",

            email:
                user?.email || "",

            phone: "",

            address: "",
        })

    useEffect(() => {
        axios
            .get(
                `http://localhost:5000/user/${user._id}`
            )
            .then((res) => {
                setFormData({
                    customerName:
                        res.data.name,

                    email:
                        res.data.email,

                    phone:
                        res.data.phone || "",

                    address:
                        res.data.address || "",
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

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

    const handlePayment = async () => {
        if (
            !formData.customerName ||
            !formData.email ||
            !formData.phone ||
            !formData.address
        ) {
            alert("Please fill all fields")
            return
        }
        try {
            const { data } = await axios.post(
                "http://localhost:5000/create-payment-order",
                {
                    amount: totalAmount,
                }
            )

            const options = {
                key:
                    import.meta.env
                        .VITE_RAZORPAY_KEY_ID,

                amount: data.amount,

                currency: data.currency,

                name: "UrbanStore",

                description:
                    "Order Payment",

                order_id: data.id,

                handler: async function (
                    response
                ) {
                    try {
                        const user = JSON.parse(
                            localStorage.getItem("userInfo")
                        )

                        await axios.post(
                            "http://localhost:5000/orders",
                            {
                                ...formData,

                                userId: user._id,

                                items: cartItems,

                                totalAmount,

                                paymentId:
                                    response.razorpay_payment_id,
                            }
                        )

                        clearCart()

                        alert(
                            "Order Placed Successfully 🎉"
                        )

                        navigate("/order-success")
                    } catch (error) {
                        console.log(error)
                    }
                },

                theme: {
                    color: "#000000",
                },
            }

            const razorpay =
                new window.Razorpay(
                    options
                )

            razorpay.open()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="min-h-screen px-10 py-20">
            <h1 className="text-5xl font-bold mb-10">
                Checkout
            </h1>

            <form className="max-w-2xl">
                <input
                    type="text"
                    name="customerName"
                    readOnly
                    placeholder="Full Name"
                    value={
                        formData.customerName
                    }
                    onChange={handleChange}
                    className="w-full border p-4 mb-4 rounded bg-gray-100"
                />

                <input
                    type="email"
                    name="email"
                    readOnly
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border p-4 mb-4 rounded bg-gray-100"
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
                    type="button"

                    onClick={handlePayment}
                    className="bg-black text-white px-8 py-4 rounded-lg"
                >
                    Pay Now
                </button>
            </form>
        </div>
    )
}

export default Checkout