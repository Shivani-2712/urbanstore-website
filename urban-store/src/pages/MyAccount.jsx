import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { WishlistContext } from "../context/WishlistContext"
import { FaUserEdit } from "react-icons/fa"
import { FaBoxOpen } from "react-icons/fa"

function MyAccount() {
    const user = JSON.parse(
        localStorage.getItem("userInfo")
    )

    const [phone, setPhone] =
        useState("")

    const [address, setAddress] =
        useState("")

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const [orders, setOrders] = useState([])

    const { wishlistItems } =
        useContext(WishlistContext)

    useEffect(() => {

        axios
            .get(
                `http://localhost:5000/user/${user._id}`
            )
            .then((res) => {

                setPhone(
                    res.data.phone || ""
                )

                setAddress(
                    res.data.address || ""
                )

            })
            .catch((err) => {
                console.log(err)
            })

        axios
            .get(
                `http://localhost:5000/orders/${user._id}`
            )
            .then((res) => {
                setOrders(res.data)
            })
            .catch((err) => {
                console.log(err)
            })

    }, [])

    const saveProfile = async () => {

        setLoading(true)

        try {

            await axios.put(
                `http://localhost:5000/update-profile/${user._id}`,
                {
                    phone,
                    address,
                }
            )

            toast.success(
                "Profile Updated Successfully 🎉"
            )

        } catch (error) {

            console.log(error)

        } finally {

            setLoading(false)

        }
    }

    return (
        <div className="min-h-screen px-10 py-16 bg-[#F8F4EE]">
            <div className="text-center mb-16">

                <p className="uppercase tracking-[4px] text-gray-400 mb-3">
                    Personal Profile
                </p>

                <h1 className="text-6xl font-serif">
                    My Account
                </h1>

                <div className="w-24 h-px bg-[#D9CFC2] mx-auto mt-6"></div>

            </div>

            <div className="bg-white border border-[#E8DCCB] max-w-3xl mx-auto p-8 shadow-sm">
                <div className="flex items-center gap-6 mb-8">

                    <div className="w-18 h-18 rounded-full bg-[#F8F4EE] text-black border border-[#E8DCCB] flex items-center justify-center text-3xl font-serif">
                        {user?.name?.charAt(0).toUpperCase()}
                    </div>

                    <div>

                        <h2 className="text-2xl font-serif">
                            Profile Information
                        </h2>

                        <p className="text-gray-500 mt-1">
                            Manage your personal details
                        </p>

                    </div>

                </div>

                <div className="mb-8">

                    <p className="uppercase tracking-[3px] text-xs text-gray-400 mb-2">
                        Name
                    </p>

                    <p className="text-lg">
                        {user?.name}
                    </p>

                    <p className="text-gray-500 text-sm mb-5">
                        Welcome back to UrbanStore
                    </p>

                    <p className="uppercase tracking-[3px] text-xs text-gray-400 mb-2">
                        Email
                    </p>


                    <p className="text-lg mb-4">
                        {user?.email}
                    </p>

                    <div className="grid grid-cols-3 gap-4 mb-8">

                        <div
                            onClick={() => navigate("/my-orders")}
                            className="border border-[#E8DCCB] p-3 text-center hover:shadow-md hover:-translate-y-1 transition duration-300 cursor-pointer">
                            <p className="text-gray-400 text-xs uppercase tracking-[3px] ">
                                Orders
                            </p>

                            <p className="text-2xl font-serif mt-2">
                                {orders.length}
                            </p>
                        </div>

                        <div
                            onClick={() => navigate("/wishlist")}
                            className="border border-[#E8DCCB] p-3 text-center hover:shadow-md hover:-translate-y-1 transition duration-300 cursor-pointer">

                            <p className="text-gray-400 text-xs uppercase tracking-[3px] hover:shadow-md transition duration-300">
                                Wishlist
                            </p>

                            <p className="text-2xl font-serif mt-2">
                                {wishlistItems.length}
                            </p>
                        </div>

                        <div className="border border-[#E8DCCB] p-3 text-center hover:shadow-md transition">

                            <p className="text-gray-400 text-xs uppercase tracking-[3px] hover:-translate-y-1 duration-300 cursor-pointer">
                                Member Since
                            </p>

                            <p className="text-2xl font-serif mt-2">
                                2026
                            </p>

                        </div>

                    </div>

                </div>
                <div className="border-t border-[#E8DCCB] my-6"></div>

                <div className="grid md:grid-cols-2 gap-5">

                    <div>

                        <p className="uppercase tracking-[3px] text-xs text-gray-400 mb-2">
                            Phone Number
                        </p>

                        <input
                            type="text"
                            placeholder="+91 98765 43210"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full border border-[#D9CFC2] p-3 text-sm outline-none focus:border-black transition" />

                    </div>

                    <div>

                        <p className="uppercase tracking-[3px] text-xs text-gray-400 mb-2">
                            Shipping Address
                        </p>

                        <textarea
                            placeholder="Enter your shipping address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full border border-[#D9CFC2] p-4 h-[90px] resize-none outline-none focus:border-black transition" />

                    </div>

                </div>

                <div className="grid md:grid-cols-2 gap-4 mt-6">

                    <button
                        onClick={saveProfile}
                        disabled={loading}
                        className="bg-black text-white py-4 uppercase tracking-[3px] h-[52px] hover:bg-[#222] transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                        <>
                            <FaUserEdit className="inline mr-2" />
                            {loading ? "Saving..." : "Save Profile"}
                        </>
                    </button>

                    <button
                        onClick={() => navigate("/my-orders")}
                        className="border border-[#D9CFC2] py-4 h-[52px] uppercase tracking-[3px] hover:bg-black hover:text-white hover:border-black transition duration-300">
                        <>
                            <FaBoxOpen className="inline mr-2" />
                            View Orders
                        </>
                    </button>

                </div>
            </div>
        </div>
    )
}

export default MyAccount