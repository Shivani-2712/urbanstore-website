import {
    LayoutDashboard,
    ShoppingBag,
    Users,
    Package,
    Ticket,
    Settings,
    BarChart3,
} from "lucide-react"

function AdminSidebar() {
    return (
        <div className="fixed left-0 top-0 h-screen w-80 bg-[#32458C] text-white">

            <div className="h-full flex flex-col p-8">

                {/* Logo */}

                <h1 className="text-4xl font-bold mb-16">
                    URBANSTORE
                </h1>

                {/* Menu */}

                <div className="space-y-8 flex-1">

                    <a
                        href="/admin"
                        className="flex items-center gap-3 text-xl"
                    >
                        <LayoutDashboard size={22} />
                        Dashboard
                    </a>

                    <a
                        href="/admin/orders"
                        className="flex items-center gap-3 text-xl"
                    >
                        <ShoppingBag size={22} />
                        Orders
                    </a>

                    <a
                        href="/admin/products"
                        className="flex items-center gap-3 text-xl"
                    >
                        <Package size={22} />
                        Products
                    </a>

                    <a
                        href="/admin/product-analytics"
                        className="flex items-center gap-3 text-xl"
                    >
                        <BarChart3 size={22} />
                        Product Analytics
                    </a>

                    <a
                        href="/admin/users"
                        className="flex items-center gap-3 text-xl"
                    >
                        <Users size={22} />
                        Customers
                    </a>

                    <a
                        href="/admin/coupons"
                        className="flex items-center gap-3 text-xl"
                    >
                        <Ticket size={22} />
                        Coupons
                    </a>

                </div>

                {/* Bottom */}

                <div>

                    <a
                        href="#"
                        className="flex items-center gap-3 text-xl"
                    >
                        <Settings size={22} />
                        Settings
                    </a>

                </div>

            </div>

        </div>
    )
}

export default AdminSidebar