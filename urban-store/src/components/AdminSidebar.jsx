import {
    LayoutDashboard,
    ShoppingBag,
    Users,
    Package,
    Ticket,
    Settings,
    BarChart3,
    Boxes,
    Image,
    MessageSquare,
} from "lucide-react"

import { useEffect, useState } from "react"
import axios from "axios"

import { NavLink } from "react-router-dom"

function AdminSidebar() {

    const [settings, setSettings] = useState(null)

    useEffect(() => {

        axios
            .get("http://localhost:5000/admin/settings")
            .then((res) => {

                setSettings(res.data)

            })
            .catch(console.log)

    }, [])

    const menuClass = ({ isActive }) =>
        `flex items-center gap-4 h-14 px-6 rounded-xl transition-all duration-300 ${isActive
            ? "bg-[#E8DCCB] text-[#1F2937] font-semibold"
            : "text-gray-300 hover:bg-[#2B3446] hover:text-white"
        }`

    return (
        <aside className="fixed left-0 top-0 h-screen w-[270px] bg-[#1A2234] shadow-2xl">

            <div className="h-screen flex flex-col">

                {/* Logo */}

                <div className="flex flex-col items-center py-8 flex-shrink-0">

                    {settings?.logo ? (
                        <img
                            src={settings.logo}
                            alt="Store Logo"
                            className="w-20 h-20 rounded-2xl bg-white p-2 shadow-md object-contain"
                        />
                    ) : (
                        <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center">
                            🛍️
                        </div>
                    )}

                    <h2 className="mt-4 text-3xl font-bold text-[#F5EAD7]">
                        {settings?.storeName || "UrbanStore"}
                    </h2>

                    <p className="mt-1 text-xs tracking-[5px] uppercase text-gray-400">
                        Admin Panel
                    </p>

                    <div className="w-40 h-px bg-white/10 mt-6"></div>

                </div>

                {/* Scrollable Navigation */}

                <div className="flex-1 overflow-y-auto px-4">

                    <nav className="space-y-2 pb-6">

                        <NavLink to="/admin" end className={menuClass}>
                            <LayoutDashboard size={21} />
                            <span className="text-lg">Dashboard</span>
                        </NavLink>

                        <NavLink to="/admin/orders" className={menuClass}>
                            <ShoppingBag size={21} />
                            <span className="text-lg">Orders</span>
                        </NavLink>

                        <NavLink to="/admin/products" className={menuClass}>
                            <Package size={21} />
                            <span className="text-lg">Products</span>
                        </NavLink>

                        <NavLink to="/admin/inventory" className={menuClass}>
                            <Boxes size={21} />
                            <span className="text-lg">Inventory</span>
                        </NavLink>

                        <NavLink to="/admin/product-analytics" className={menuClass}>
                            <BarChart3 size={21} />
                            <span className="text-lg">Product Analytics</span>
                        </NavLink>

                        <NavLink to="/admin/users" className={menuClass}>
                            <Users size={21} />
                            <span className="text-lg">Customers</span>
                        </NavLink>

                        <NavLink
                            to="/admin/reviews"
                            className={menuClass}
                        >
                            <MessageSquare size={21} />
                            <span className="text-lg">
                                Reviews
                            </span>
                        </NavLink>

                        <NavLink to="/admin/coupons" className={menuClass}>
                            <Ticket size={21} />
                            <span className="text-lg">Coupons</span>
                        </NavLink>

                        <NavLink
                            to="/admin/banners"
                            className={menuClass}
                        >
                            <Image size={21} />
                            <span className="text-lg">
                                Banners
                            </span>
                        </NavLink>

                    </nav>

                </div>

                {/* Fixed Bottom */}

                <div className="p-4 border-t border-white/10 flex-shrink-0">

                    <NavLink
                        to="/admin/settings"
                        className={menuClass}
                    >
                        <Settings size={21} />
                        <span className="text-lg">Settings</span>
                    </NavLink>

                </div>

            </div>

        </aside>
    )
}

export default AdminSidebar