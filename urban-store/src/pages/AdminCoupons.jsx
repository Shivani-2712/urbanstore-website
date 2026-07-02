import AdminLayout from "../layouts/AdminLayout"
import { useEffect, useState } from "react"
import axios from "axios"

function AdminCoupons() {

    const [coupons, setCoupons] = useState([])

    const [formData, setFormData] = useState({
        code: "",
        discount: "",
        minimumOrder: "",
        expiryDate: "",
        usageLimit: "",
    })

    const loadCoupons = async () => {

        const res = await axios.get(
            "http://localhost:5000/coupons"
        )

        setCoupons(res.data)
    }

    useEffect(() => {

        loadCoupons()

    }, [])

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value,
        })

    }

    const createCoupon = async (e) => {

        e.preventDefault()

        try {

            await axios.post(
                "http://localhost:5000/coupons",
                formData
            )

            setFormData({
                code: "",
                discount: "",
                expiryDate: "",
            })

            loadCoupons()

            toast.success("Coupon Created 🎉")

        } catch (error) {

            console.log(error)

            toast.error("Failed to create coupon.")

        }

    }

    const toggleCoupon = async (
        id,
        currentStatus
    ) => {

        try {

            await axios.put(
                `http://localhost:5000/coupons/${id}`,
                {
                    active: !currentStatus,
                }
            )

            loadCoupons()

        } catch (error) {

            console.log(error)

        }

    }

    return (

        <AdminLayout>

            <div className="mb-12">

                <p className="uppercase tracking-[4px] text-gray-400 mb-3">
                    UrbanStore Admin
                </p>

                <h1 className="text-5xl font-serif">
                    Coupons
                </h1>

                <div className="w-24 h-px bg-[#D9CFC2] mt-6"></div>

            </div>

            <form
                onSubmit={createCoupon}
                className="bg-white border border-[#E8DCCB] p-8 mb-10"
            >

                <h2 className="text-2xl font-serif mb-6">
                    Create Coupon
                </h2>

                <div className="grid md:grid-cols-3 gap-6">

                    <input
                        type="text"
                        name="code"
                        placeholder="SAVE20"
                        value={formData.code}
                        onChange={handleChange}
                        className="border border-[#D9CFC2] p-4"
                    />

                    <input
                        type="number"
                        name="discount"
                        placeholder="20"
                        value={formData.discount}
                        onChange={handleChange}
                        className="border border-[#D9CFC2] p-4"
                    />

                    <input
                        type="number"
                        name="minimumOrder"
                        placeholder="Minimum Order Amount"
                        value={formData.minimumOrder}
                        onChange={handleChange}
                        className="border border-[#D9CFC2] p-4"
                    />

                    <input
                        type="date"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        className="border border-[#D9CFC2] p-4"
                    />

                    <input
                        type="number"
                        name="usageLimit"
                        placeholder="Usage Limit"
                        value={formData.usageLimit}
                        onChange={handleChange}
                        className="border border-[#D9CFC2] p-4"
                    />

                </div>

                <button
                    className="mt-6 bg-black text-white px-8 py-3 uppercase tracking-[2px]"
                >
                    Create Coupon
                </button>

            </form>

            <div className="bg-white border border-[#E8DCCB]">

                <div className="grid grid-cols-5 p-6 bg-[#f4b66d] text-white uppercase tracking-[2px] text-xs">

                    <div>Code</div>

                    <div>Discount</div>

                    <div>Minimum Order</div>

                    <div>Expiry</div>

                    <div>Status</div>

                    <div>Action</div>

                </div>

                {coupons.map((coupon) => (

                    <div
                        key={coupon._id}
                        className="grid grid-cols-5 p-6 border-b border-[#E8DCCB]"
                    >

                        <div>
                            {coupon.code}
                        </div>

                        <div>
                            {coupon.discount}%
                        </div>

                        <div>
                            {
                                new Date(
                                    coupon.expiryDate
                                ).toLocaleDateString()
                            }
                        </div>

                        <div>

                            {
                                coupon.active
                                    ? "✅ Active"
                                    : "❌ Inactive"
                            }

                        </div>

                        <div>

                            <button
                                onClick={() =>
                                    toggleCoupon(
                                        coupon._id,
                                        coupon.active
                                    )
                                }
                                className={
                                    coupon.active
                                        ? "bg-red-500 text-white px-4 py-2 text-xs"
                                        : "bg-green-600 text-white px-4 py-2 text-xs"
                                }
                            >
                                {
                                    coupon.active
                                        ? "Deactivate"
                                        : "Activate"
                                }
                            </button>

                        </div>

                        <div>
                            ₹{coupon.minimumOrder}
                        </div>

                        <div>
                            {coupon.usedCount}/
                            {coupon.usageLimit}
                        </div>

                    </div>

                ))}

            </div>

        </AdminLayout>
    )
}

export default AdminCoupons