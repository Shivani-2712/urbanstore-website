import { useEffect, useState } from "react"
import axios from "axios"
import AdminLayout from "../layouts/AdminLayout"

function AdminSettings() {

    const [settings, setSettings] = useState({
        storeName: "",
        email: "",
        phone: "",
        address: "",
        logo: "",
    })

    const [passwords, setPasswords] = useState({

        currentPassword: "",

        newPassword: "",

        confirmPassword: ""

    })

    useEffect(() => {

        axios
            .get("http://localhost:5000/admin/settings")
            .then((res) => {

                setSettings(res.data)

            })
            .catch(console.log)

    }, [])

    const saveSettings = async () => {

        try {

            await axios.put(
                "http://localhost:5000/admin/settings",
                settings
            )

            toast.success("Settings Updated Successfully!")

        } catch (error) {

            console.log(error)

            toast.error("Failed To Save Settings")

        }

    }

    const uploadLogo = async (e) => {

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

            setSettings({
                ...settings,
                logo: res.data.imageUrl,
            })

        } catch (error) {

            console.log(error)

            toast.error("Logo upload failed.")

        }

    }

    const changePassword = async () => {

        if (passwords.newPassword !== passwords.confirmPassword) {

            toast.error("New password and confirm password do not match.")

            return

        }

        try {

            const res = await axios.put(
                "http://localhost:5000/admin/change-password",
                {
                    currentPassword: passwords.currentPassword,
                    newPassword: passwords.newPassword
                }
            )

            toast.success(res.data.message)

            setPasswords({

                currentPassword: "",

                newPassword: "",

                confirmPassword: ""

            })

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to change password."
            )

        }

    }

    return (

        <AdminLayout>

            <div className="mb-10">

                <p className="uppercase tracking-[4px] text-gray-400">
                    UrbanStore Admin
                </p>

                <h1 className="text-4xl font-serif mt-2">
                    Settings
                </h1>

            </div>

            <div className="grid lg:grid-cols-2 gap-8">

                {/* Store Information */}

                <div className="bg-white rounded-3xl shadow-sm p-8">

                    <h2 className="text-2xl font-serif mb-8">
                        Store Information
                    </h2>

                    <div className="space-y-5">

                        <div>

                            <div className="mb-8">

                                <label className="block text-sm text-gray-500 mb-3">
                                    Store Logo
                                </label>

                                <div className="flex items-center gap-6">

                                    {
                                        settings.logo ? (

                                            <img
                                                src={settings.logo}
                                                alt="Store Logo"
                                                className="w-24 h-24 rounded-xl border object-cover"
                                            />

                                        ) : (

                                            <div className="w-24 h-24 rounded-xl border flex items-center justify-center bg-gray-100 text-gray-400">

                                                No Logo

                                            </div>

                                        )
                                    }

                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={uploadLogo}
                                    />

                                </div>

                            </div>

                            <label className="block text-sm text-gray-500 mb-2">
                                Store Name
                            </label>

                            <input
                                type="text"
                                value={settings.storeName}
                                onChange={(e) =>
                                    setSettings({
                                        ...settings,
                                        storeName: e.target.value,
                                    })
                                }
                                className="w-full border border-[#E8DCCB] rounded-xl p-4 outline-none"
                            />

                        </div>

                        <div>

                            <label className="block text-sm text-gray-500 mb-2">
                                Store Email
                            </label>

                            <input
                                type="email"
                                value={settings.email}
                                onChange={(e) =>
                                    setSettings({
                                        ...settings,
                                        email: e.target.value,
                                    })
                                }
                                className="w-full border border-[#E8DCCB] rounded-xl p-4 outline-none"
                            />

                        </div>

                        <div>

                            <label className="block text-sm text-gray-500 mb-2">
                                Phone
                            </label>

                            <input
                                type="text"
                                value={settings.phone}
                                onChange={(e) =>
                                    setSettings({
                                        ...settings,
                                        phone: e.target.value,
                                    })
                                }
                                className="w-full border border-[#E8DCCB] rounded-xl p-4 outline-none"
                            />

                        </div>

                        <div>

                            <label className="block text-sm text-gray-500 mb-2">
                                Address
                            </label>

                            <textarea
                                rows="4"
                                value={settings.address}
                                onChange={(e) =>
                                    setSettings({
                                        ...settings,
                                        address: e.target.value,
                                    })
                                }
                                className="w-full border border-[#E8DCCB] rounded-xl p-4 outline-none"
                            />

                        </div>

                        <button
                            onClick={saveSettings}
                            className="bg-black text-white px-8 py-3 rounded-xl hover:opacity-90 transition"
                        >

                            Save Changes

                        </button>

                    </div>

                </div>

                {/* Admin Profile */}

                <div className="bg-white rounded-3xl shadow-sm p-8">

                    <h2 className="text-2xl font-serif mb-8">
                        Admin Profile
                    </h2>

                    <div className="flex flex-col items-center">

                        <div className="w-28 h-28 rounded-full bg-[#D9CFC2] mb-5"></div>

                        <h3 className="text-2xl font-serif">
                            Admin
                        </h3>

                        <p className="text-gray-500 mt-2">
                            admin@urbanstore.com
                        </p>

                    </div>

                    <div className="mt-10 space-y-5">

                        <input
                            type="password"
                            placeholder="Current Password"
                            value={passwords.currentPassword}
                            onChange={(e) =>
                                setPasswords({
                                    ...passwords,
                                    currentPassword: e.target.value
                                })
                            }
                            className="w-full border border-[#E8DCCB] rounded-xl p-4"
                        />

                        <input
                            type="password"
                            placeholder="New Password"
                            value={passwords.newPassword}
                            onChange={(e) =>
                                setPasswords({
                                    ...passwords,
                                    newPassword: e.target.value
                                })
                            }
                            className="w-full border border-[#E8DCCB] rounded-xl p-4"
                        />

                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={passwords.confirmPassword}
                            onChange={(e) =>
                                setPasswords({
                                    ...passwords,
                                    confirmPassword: e.target.value
                                })
                            }
                            className="w-full border border-[#E8DCCB] rounded-xl p-4"
                        />

                        <button
                            onClick={changePassword}
                            className="bg-[#D4A05F] text-white px-8 py-3 rounded-xl hover:bg-[#BC8C4D] transition"
                        >

                            Change Password

                        </button>

                    </div>

                </div>

            </div>

        </AdminLayout>

    )

}

export default AdminSettings