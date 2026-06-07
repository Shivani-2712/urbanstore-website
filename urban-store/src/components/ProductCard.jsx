import { FaHeart, FaRegHeart } from "react-icons/fa"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { WishlistContext } from "../context/WishlistContext"

function ProductCard({ product }) {
    const {
        wishlistItems,
        toggleWishlist,
    } = useContext(WishlistContext)

    const user =
    JSON.parse(
        localStorage.getItem(
            "userInfo"
        )
    )

const isWishlisted =
    user &&
    wishlistItems.some(
        (item) =>
            item._id === product._id
    )

    return (
        <Link to={`/product/${product._id}`}>
            <div className="rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300 group bg-white">
                <div className="overflow-hidden">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-96 object-cover group-hover:scale-105 transition duration-500"
                    />
                </div>

                <div className="p-5">
                    <div className="flex justify-end mb-3">

                        <button
                            onClick={(e) => {
                                e.preventDefault()
                                toggleWishlist(product)
                            }}
                            className={`text-2xl transition hover:scale-110 ${isWishlisted
                                    ? "text-red-500"
                                    : "text-gray-500"
                                }`}
                        >
                            {isWishlisted ? (
                                <FaHeart />
                            ) : (
                                <FaRegHeart />
                            )}
                        </button>

                    </div>
                    <h2 className="text-xl font-semibold mb-2">
                        {product.name}
                    </h2>

                    <p className="text-gray-500 mb-4">
                        ₹{product.price}
                    </p>

                    <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition">
                        View Product
                    </button>
                </div>
            </div>
        </Link>
    )
}

export default ProductCard