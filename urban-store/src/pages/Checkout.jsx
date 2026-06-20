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

    const [couponCode, setCouponCode] =
        useState("")

    const [discount, setDiscount] =
        useState(0)

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

    const applyCoupon = async () => {

        try {

            const res = await axios.post(
                "http://localhost:5000/validate-coupon",
                {
                    code: couponCode,
                    totalAmount,
                    couponCode,
                }
            )

            const coupon =
                res.data

            const discountAmount =
                totalAmount *
                (coupon.discount / 100)

            setDiscount(
                discountAmount
            )

            alert(
                `${coupon.discount}% Discount Applied 🎉`
            )

        } catch (error) {

            setDiscount(0)

            alert(
                error.response?.data?.message ||
                "Invalid Coupon"
            )

        }
    }

    const totalAmount =
        cartItems.reduce(
            (total, item) =>
                total +
                item.price * item.quantity,
            0
        )

    const finalAmount =
        totalAmount - discount

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
                    amount: finalAmount,
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

                                totalAmount:
                                    finalAmount,

                                paymentId:
                                    response.razorpay_payment_id,
                            }
                        )

                        await clearCart()

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
        <div className="min-h-screen px-10 py-16 bg-[#F8F4EE]">
            <div className="text-center mb-12">

                <p className="uppercase tracking-[4px] text-gray-400 mb-3">
                    Secure Payment
                </p>

                <h1 className="text-5xl font-serif">
                    Checkout
                </h1>

                <p className="text-gray-500 mt-3">
                    {cartItems.length} Item(s)
                </p>

                <div className="w-24 h-px bg-[#D9CFC2] mx-auto mt-6 mb-8"></div>

                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">

                    <div className="bg-white border border-[#E8DCCB] p-8">

                        <p className="uppercase tracking-[4px] text-gray-400 text-sm mb-6">
                            Customer Details
                        </p>
                        <form className="grid md:grid-cols-2 gap-6">
                            <input
                                type="text"
                                name="customerName"
                                readOnly
                                placeholder="Full Name"
                                value={
                                    formData.customerName
                                }
                                onChange={handleChange}
                                className="w-full border border-[#D9CFC2] p-4 mb-4 bg-[#F8F4EE]" />

                            <input
                                type="email"
                                name="email"
                                readOnly
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full border border-[#D9CFC2] p-4 mb-4 bg-[#F8F4EE]" />

                            <input
                                type="text"
                                name="phone"
                                placeholder="Phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full border border-[#D9CFC2] p-4 mb-4 bg-white" />

                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                rows={3}
                                className="md:col-span-2 w-full border border-[#D9CFC2] p-4 bg-white" />

                            <div className="md:col-span-2 mt-2">
                                <div className="mb-6">

                                    <div className="flex gap-3 mb-4">

                                        <input
                                            type="text"
                                            placeholder="Enter Coupon Code"
                                            value={couponCode}
                                            onChange={(e) =>
                                                setCouponCode(
                                                    e.target.value.toUpperCase()
                                                )
                                            }
                                            className="border p-3 rounded flex-1 border-[#D9CFC2]"
                                        />

                                        <button
                                            type="button"
                                            onClick={applyCoupon}
                                            className="bg-black text-white px-5 rounded"
                                        >
                                            Apply
                                        </button>

                                    </div>

                                </div>
                            </div>
                        </form>
                    </div>
                    <div
                        className="bg-white border border-[#E8DCCB] p-8 h-fit">
                        <p className="uppercase tracking-[4px] text-gray-400 text-sm mb-4">
                            Order Summary
                        </p>
                        <div className="mb-6">
                            {cartItems.map((item) => (
                                <div
                                    key={item._id}
                                    className="flex justify-between mb-2 text-sm"
                                >
                                    <span>
                                        {item.name}
                                        {item.size && ` (${item.size})`}
                                        × {item.quantity}
                                    </span>

                                    <span>
                                        ₹{item.price * item.quantity}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-[#E8DCCB] mb-6">
                            <div className="flex justify-between mb-4">
                                <span>Subtotal</span>
                                <span>₹{totalAmount}</span>
                            </div>

                            <div className="flex justify-between mb-4 text-green-600">
                                <span>Discount</span>
                                <span>₹{discount.toFixed(0)}</span>
                            </div>

                            <div className="border-t border-[#E8DCCB] pt-6 mt-6">

                                <div className="flex justify-between items-center">

                                    <span className="uppercase tracking-[4px] text-gray-400 text-sm">
                                        Total
                                    </span>

                                    <span className="text-4xl font-serif">
                                        ₹{finalAmount.toFixed(0)}
                                    </span>

                                </div>

                            </div>
                            <button
                                type="button"

                                onClick={handlePayment}
                                className="w-full mt-8 bg-black text-white py-5 uppercase tracking-[4px] hover:opacity-90 transition">
                                Pay Now
                            </button>
                            <p className="text-center text-xs text-gray-400 mt-5">
                                Secure payments powered by Razorpay
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout