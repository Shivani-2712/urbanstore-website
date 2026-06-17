import { useContext } from "react"
import { WishlistContext } from "../context/WishlistContext"
import { Link } from "react-router-dom"
import ProductCard from "../components/ProductCard"

function Wishlist() {
    const { wishlistItems } =
        useContext(WishlistContext)

    return (
        <div className="min-h-screen bg-[#F8F4EE] px-10 py-12">
            <div className="text-center mb-16">

                <p className="uppercase tracking-[4px] text-gray-400 mb-3">
                    Saved For Later
                </p>

                <h1 className=" text-5xl font-serif">
                    My Wishlist
                </h1>

                <p className="text-gray-500 mt-3">
                    {wishlistItems.length} {wishlistItems.length === 1 ? "piece" : "pieces"} saved
                </p>

                <div className="w-24 h-px bg-[#D9CFC2] mx-auto mt-6"></div>

            </div>

            {wishlistItems.length === 0 ? (
                <div className="text-center py-20">

                    <div className="text-7xl mb-6 opacity-80">
                        🤍
                    </div>

                    <h2 className="text-3xl font-serif mb-4">
                        Your Wishlist Is Empty
                    </h2>

                    <p className="text-gray-500">
                        Save your favorite fashion pieces and
                        access them anytime from your wishlist.
                    </p>

                    <Link
                        to="/"
                        className="inline-block mt-8 bg-black text-white px-8 py-4 uppercase tracking-[3px]">
                        Continue Shopping
                    </Link>

                </div>
            ) : (
                <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {wishlistItems.map((product) => (
                        <ProductCard
                            key={product._id}
                            product={product}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Wishlist