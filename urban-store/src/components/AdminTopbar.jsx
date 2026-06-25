import { useState } from "react"
import { useNavigate } from "react-router-dom"
import NotificationDropdown from "./NotificationDropdown"

function AdminTopbar({ notifications }) {

    const [showNotifications, setShowNotifications] =
        useState(false)

    const navigate = useNavigate()

    const handleLogout = () => {

        const handleLogout = () => {

            if (
                window.confirm(
                    "Are you sure you want to logout?"
                )
            ) {

                localStorage.removeItem(
                    "adminToken"
                )

                navigate("/admin-login")

            }

        }

        navigate("/admin-login")

    }

    return (

        <div className="sticky top-0 z-40 bg-white shadow-sm px-10 py-5 flex justify-between items-center">

            <input
                type="text"
                placeholder="Search..."
                className="w-[420px] px-5 py-3 rounded-xl border border-[#E8DCCB] outline-none"
            />

            <div className="flex items-center gap-5">

                <div className="relative">

                    <button
                        onClick={() =>
                            setShowNotifications(
                                !showNotifications
                            )
                        }
                        className="w-14 h-14 rounded-2xl bg-white border border-[#E8DCCB] shadow-sm flex items-center justify-center text-2xl relative"
                    >

                        🔔

                        {
                            notifications.length > 0 && (

                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">

                                    {notifications.length}

                                </span>

                            )
                        }

                    </button>

                    {
                        showNotifications && (

                            <NotificationDropdown
                                notifications={notifications}
                            />

                        )
                    }

                </div>

                <div className="flex items-center gap-4">

                    <div className="text-right">

                        <p className="font-semibold">
                            Admin
                        </p>

                        <p className="text-sm text-gray-500">
                            UrbanStore
                        </p>

                    </div>

                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition"
                    >
                        Logout
                    </button>

                </div>

            </div>

        </div>

    )

}

export default AdminTopbar