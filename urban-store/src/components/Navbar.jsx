import { useContext } from "react"
import { CartContext } from "../context/CartContext"
import { WishlistContext } from "../context/WishlistContext"
import { Link } from "react-router-dom"

function Navbar() {
    const userToken = localStorage.getItem(
        "userToken"
    )

    const handleLogout = () => {
        localStorage.removeItem(
            "userToken"
        )

        window.location.reload()
    }

    const { cartItems } = useContext(CartContext)

    const { wishlistItems } =
        useContext(WishlistContext)

    return (
        <nav className="flex justify-between items-center px-10 py-5 border-b bg-white sticky top-0 z-50">
            <h1 className="text-3xl font-extrabold tracking-wide cursor-pointer">
                UrbanStore
            </h1>

            <ul className="flex gap-8 text-lg font-medium">
                {userToken ? (
                    <>
                        <li>
                            <Link to="/my-orders">
                                My Orders
                            </Link>
                        </li>

                        <li>
                            <button
                                onClick={handleLogout}
                                className="hover:text-gray-500"
                            >
                                Logout
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/login">
                                Login
                            </Link>
                        </li>

                        <li>
                            <Link to="/register">
                                Register
                            </Link>
                        </li>
                    </>
                )}
                <li className="hover:text-gray-500 cursor-pointer transition">
                    Men
                </li>

                <li className="hover:text-gray-500 cursor-pointer transition">
                    Women
                </li>

                <li className="hover:text-gray-500 cursor-pointer transition">
                    Collections
                </li>

                <li className="hover:text-gray-500 cursor-pointer transition">
                    <Link to="/wishlist">
                        ❤️ Wishlist ({wishlistItems.length})
                    </Link>
                </li>

                <li className="hover:text-gray-500 cursor-pointer transition">
                    <Link to="/cart">
                        🛒 Cart ({cartItems.length})
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar