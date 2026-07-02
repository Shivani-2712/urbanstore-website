import { useEffect, useState } from "react"
import axios from "axios"
import AdminLayout from "../layouts/AdminLayout"
import toast from "react-hot-toast"

function AdminBanners() {

    const [banners, setBanners] = useState([])

    const [banner, setBanner] = useState({

        title: "",

        subtitle: "",

        description: "",

        image: "",

        buttonText: "Shop Now",

        buttonLink: "/shop",

        active: true,

    })

    const [showForm, setShowForm] = useState(false)

    const [editingId, setEditingId] = useState(null)

    useEffect(() => {

        fetchBanners()

    }, [])

    const uploadBannerImage = async (e) => {

        const file = e.target.files[0]

        if (!file) return

        const formData = new FormData()

        formData.append("image", file)

        try {

            const res = await axios.post(
                "http://localhost:5000/upload",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            )

            setBanner({
                ...banner,
                image: res.data.imageUrl,
            })

        } catch (error) {

            console.log(error)

            toast.error("Image upload failed.")

        }

    }

    const fetchBanners = async () => {

        try {

            const res = await axios.get(
                "http://localhost:5000/admin/banners"
            )

            setBanners(res.data)

        } catch (error) {

            console.log(error)

        }

    }

    const saveBanner = async () => {

        try {

            if (editingId) {

                await axios.put(
                    `http://localhost:5000/admin/banners/${editingId}`,
                    banner
                )

            } else {

                await axios.post(
                    "http://localhost:5000/admin/banners",
                    banner
                )

            }

            fetchBanners()

            setBanner({
                title: "",
                subtitle: "",
                description: "",
                image: "",
                buttonText: "Shop Now",
                buttonLink: "/shop",
                active: true,
            })

            setShowForm(false)

            setEditingId(null)

            toast.success("Banner added successfully!")

        } catch (error) {

            console.log(error)

            toast.error("Failed to add banner.")

        }

    }

    const deleteBanner = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this banner?"
        )

        if (!confirmDelete) return

        try {

            await axios.delete(
                `http://localhost:5000/admin/banners/${id}`
            )

            fetchBanners()

            toast.success("Banner deleted successfully!")

        } catch (error) {

            console.log(error)

            toast.error("Failed to delete banner.")

        }

    }

    const editBanner = (bannerData) => {

        setBanner(bannerData)

        setEditingId(bannerData._id)

        setShowForm(true)

    }

    return (

        <AdminLayout>

            <div className="flex justify-between items-center mb-10">

                <div>

                    <p className="uppercase tracking-[4px] text-gray-400">
                        UrbanStore Admin
                    </p>

                    <h1 className="text-4xl font-serif mt-2">
                        Banner Management
                    </h1>

                </div>

                <button
                    onClick={() => setShowForm(true)}
                    className="bg-black text-white px-6 py-3 rounded-xl"
                >
                    + Add Banner
                </button>

            </div>

            {
                showForm && (

                    <div className="bg-white rounded-3xl shadow-sm p-8 mb-8">

                        <h2 className="text-2xl font-serif mb-6">

                            Add New Banner

                        </h2>

                        <div className="grid md:grid-cols-2 gap-5">

                            <input
                                type="text"
                                placeholder="Banner Title"
                                value={banner.title}
                                onChange={(e) =>
                                    setBanner({
                                        ...banner,
                                        title: e.target.value,
                                    })
                                }
                                className="border border-[#E8DCCB] rounded-xl p-4"
                            />

                            <input
                                type="text"
                                placeholder="Subtitle"
                                value={banner.description}
                                onChange={(e) =>
                                    setBanner({
                                        ...banner,
                                        subtitle: e.target.value,
                                    })
                                }
                                className="border border-[#E8DCCB] rounded-xl p-4"
                            />

                            <textarea
                                placeholder="Banner Description"
                                rows={4}
                                value={banner.description}
                                onChange={(e) =>
                                    setBanner({
                                        ...banner,
                                        description: e.target.value,
                                    })
                                }
                                className="md:col-span-2 border border-[#E8DCCB] rounded-xl p-4"
                            />

                            <input
                                type="text"
                                placeholder="Button Text"
                                value={banner.buttonText}
                                onChange={(e) =>
                                    setBanner({
                                        ...banner,
                                        buttonText: e.target.value,
                                    })
                                }
                                className="border border-[#E8DCCB] rounded-xl p-4"
                            />

                            <input
                                type="text"
                                placeholder="Button Link"
                                value={banner.buttonLink}
                                onChange={(e) =>
                                    setBanner({
                                        ...banner,
                                        buttonLink: e.target.value,
                                    })
                                }
                                className="border border-[#E8DCCB] rounded-xl p-4"
                            />



                            <div className="md:col-span-2">

                                <label className="block text-sm text-gray-500 mb-3">
                                    Banner Image
                                </label>

                                {
                                    banner.image && (

                                        <img
                                            src={banner.image}
                                            alt="Preview"
                                            className="w-full max-w-md h-52 object-cover rounded-xl border mb-4"
                                        />

                                    )
                                }

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={uploadBannerImage}
                                />

                            </div>
                            <div className="flex gap-4 mt-8">

                                <button
                                    onClick={saveBanner}
                                    className="bg-black text-white px-6 py-3 rounded-xl"
                                >
                                    Save Banner
                                </button>

                                <button
                                    onClick={() => setShowForm(false)}
                                    className="border border-[#D9CFC2] px-6 py-3 rounded-xl"
                                >
                                    Cancel
                                </button>

                            </div>

                        </div>

                    </div>

                )
            }

            <div className="bg-white rounded-3xl shadow-sm overflow-hidden">

                <table className="w-full">

                    <thead>

                        <tr className="border-b border-[#E8DCCB] uppercase tracking-[2px] text-xs text-gray-500">

                            <th className="py-5 text-left pl-8">
                                Banner
                            </th>

                            <th>
                                Title
                            </th>

                            <th>
                                Status
                            </th>

                            <th>
                                Action
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {banners.map((banner) => (

                            <tr
                                key={banner._id}
                                className="border-b border-[#F0E7DB]"
                            >

                                <td className="py-5 pl-8">

                                    <img
                                        src={banner.image}
                                        alt={banner.title}
                                        className="w-36 h-20 rounded-xl object-cover"
                                    />

                                </td>

                                <td>

                                    {banner.title}

                                </td>

                                <td>

                                    <span
                                        className={`px-3 py-2 rounded-full text-xs font-semibold

                                        ${banner.active
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                            }`}
                                    >

                                        {
                                            banner.active
                                                ? "Active"
                                                : "Inactive"
                                        }

                                    </span>

                                </td>

                                <td>

                                    <div className="flex gap-3">

                                        <button
                                            onClick={() => editBanner(banner)}
                                            className="text-blue-600 font-medium hover:underline"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => deleteBanner(banner._id)}
                                            className="text-red-600 font-medium hover:underline"
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </AdminLayout>

    )

}

export default AdminBanners