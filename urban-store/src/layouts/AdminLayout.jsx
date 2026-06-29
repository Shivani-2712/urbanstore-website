import { useEffect, useState } from "react"
import axios from "axios"

import AdminSidebar from "../components/AdminSidebar"
import AdminTopbar from "../components/AdminTopbar"

function AdminLayout({ children }) {

    const [notifications, setNotifications] =
        useState([])

    useEffect(() => {

        axios
            .get("http://localhost:5000/admin/stats")
            .then((res) => {

                setNotifications(
                    res.data.topLowStockProducts || []
                )

            })
            .catch(console.log)

    }, [])

    return (

        <div className="min-h-screen flex bg-[#F4F7FE]">

            <AdminSidebar />

            <main className="flex-1 ml-[280px]">

                <AdminTopbar
                    notifications={notifications}
                />

                <div className="px-10 py-8">

                    {children}

                </div>

            </main>

        </div>

    )

}

export default AdminLayout