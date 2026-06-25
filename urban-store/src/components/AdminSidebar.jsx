import {
    LayoutDashboard,
    ShoppingBag,
    Users,
    Package,
    Ticket,
    Settings,
    BarChart3,
} from "lucide-react"

import { NavLink } from "react-router-dom"

function AdminSidebar() {

    const menuClass = ({ isActive }) =>
        `flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 ${isActive
            ? "bg-[#E8DCCB] text-[#1F2937] font-semibold shadow-lg"
            : "text-gray-300 hover:bg-[#2B3446] hover:text-white"
        }`

    return (
        <aside className="fixed left-0 top-0 h-screen w-80 bg-[#1A2234] shadow-2xl">

            <div className="h-full flex flex-col p-8">

                {/* Logo */}

                <div className="mb-14">

                    <h1 className="text-4xl font-bold tracking-wide text-white">
                        URBANSTORE
                    </h1>

                    <p className="text-gray-400 mt-2 text-sm tracking-[3px] uppercase">
                        Admin Panel
                    </p>

                </div>

                {/* Navigation */}

                <nav className="flex-1 space-y-3">

                    <NavLink
                        to="/admin"
                        end
                        className={menuClass}
                    >
                        <LayoutDashboard size={21} />
                        <span className="text-lg">Dashboard</span>
                    </NavLink>

                    <NavLink
                        to="/admin/orders"
                        className={menuClass}
                    >
                        <ShoppingBag size={21} />
                        <span className="text-lg">Orders</span>
                    </NavLink>

                    <NavLink
                        to="/admin/products"
                        className={menuClass}
                    >
                        <Package size={21} />
                        <span className="text-lg">Products</span>
                    </NavLink>

                    <NavLink
                        to="/admin/product-analytics"
                        className={menuClass}
                    >
                        <BarChart3 size={21} />
                        <span className="text-lg">
                            Product Analytics
                        </span>
                    </NavLink>

                    <NavLink
                        to="/admin/users"
                        className={menuClass}
                    >
                        <Users size={21} />
                        <span className="text-lg">Customers</span>
                    </NavLink>

                    <NavLink
                        to="/admin/coupons"
                        className={menuClass}
                    >
                        <Ticket size={21} />
                        <span className="text-lg">Coupons</span>
                    </NavLink>

                </nav>

                {/* Bottom */}

                <div className="pt-8 border-t border-white/10">

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