import { useContext } from "react"
import { WishlistContext } from "../context/WishlistContext"
import ProductCard from "../components/ProductCard"

function Wishlist() {
    const { wishlistItems } =
        useContext(WishlistContext)

    return (
        <div className="px-10 py-20">
            <h1 className="text-5xl font-bold mb-10 text-center">
                ❤️ Wishlist
            </h1>

            {wishlistItems.length === 0 ? (
                <p className="text-center text-gray-500">
                    No products in wishlist
                </p>
            ) : (
                <div className="grid md:grid-cols-4 gap-8">
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