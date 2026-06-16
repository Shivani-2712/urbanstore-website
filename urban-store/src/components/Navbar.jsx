import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { Link } from "react-router-dom";
import { FaHeart, FaShoppingBag, FaUser } from "react-icons/fa";
import toast from "react-hot-toast"

function Navbar() {
    const userToken = localStorage.getItem("userToken");

    const handleLogout = () => {
        localStorage.removeItem("userToken");

        localStorage.removeItem("userInfo");

        toast.success(
            "Logged out successfully"
        )

        window.location.reload();
    };

    const { cartItems } = useContext(CartContext);

    const { wishlistItems } = useContext(WishlistContext);

    return (
        <nav
            className="
        bg-[#F8F4EE]
        border-b
        border-[#E8DCCB]
        sticky
        top-0
        z-50
        "
        >
            <div
                className="
            max-w-7xl
            mx-auto
            px-10
            py-6
            flex
            justify-between
            items-center
            "
            >
                <Link to="/">
                    <h1
                        className="
                    text-2xl
                    font-serif
                    tracking-[0.25em]
                    font-semibold
                    "
                    >
                        URBANSTORE
                    </h1>
                </Link>

                <ul
                    className="
                flex
                items-center
                gap-8
                text-sm
                uppercase
                tracking-wider
                "
                >
                    <li className="hover:text-gray-500 transition cursor-pointer">
                        <Link to="/">New Arrivals</Link>
                    </li>

                    <li className="hover:text-gray-500 transition cursor-pointer">
                        <Link to="/men">Men</Link>
                    </li>

                    <li className="hover:text-gray-500 transition cursor-pointer">
                        <Link to="/women">Women</Link>
                    </li>

                    <li className="hover:text-gray-500 transition cursor-pointer">
                        <Link to="/collections">Collections</Link>
                    </li>

                    <li className="hover:text-gray-500 transition cursor-pointer">
                        <Link to="/sale">Sale</Link>
                    </li>
                </ul>

                <div
                    className="
                flex
                items-center
                gap-6
                "
                >
                    {userToken ? (
                        <>
                            <Link
                                to="/wishlist"
                                className="
                            flex
                            items-center
                            gap-2
                            hover:opacity-60
transition
                            "
                            >
                                <FaHeart />
                                {wishlistItems.length}
                            </Link>

                            <Link
                                to="/cart"
                                className="
                            flex
                            items-center
                            gap-2
                            hover:opacity-60
transition
                            "
                            >
                                <FaShoppingBag />
                                {cartItems.length}
                            </Link>

                            <Link
                                to="/my-account"
                                className="
flex
items-center
gap-2
hover:opacity-60
transition
"
                            >
                                <FaUser />
                            </Link>

                            <Link to="/my-orders">
                                My Orders
                            </Link>

                            <button
                                onClick={handleLogout}
                                className="
flex
items-center
gap-2
hover:opacity-60
transition
"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="
                            text-sm
                            uppercase
                            "
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="
                            text-sm
                            uppercase
                            "
                            >
                                Register
                            </Link>

                            <Link
                                to="/login"
                                className="
                            flex
                            items-center
                            gap-2
                            "
                            >
                                <FaShoppingBag />
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
