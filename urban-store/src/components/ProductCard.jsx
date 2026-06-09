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
            <div
    className="
    bg-white
    border
    border-[#E8DCCB]
    overflow-hidden
    transition
    duration-300
    group
hover:shadow-2xl
hover:-translate-y-2    "
>
                <div className="relative overflow-hidden">

    <img
        src={product.image}
        alt={product.name}
        className="
w-full
h-[380px]
object-cover
transition
duration-500
group-hover:scale-105
"
    />

    <button
        onClick={(e) => {
            e.preventDefault()
            toggleWishlist(product)
        }}
        className="
absolute
top-4
right-4
bg-white
w-9
h-9
rounded-full
shadow-md
flex
items-center
justify-center
"
    >
        {isWishlisted ? (
            <FaHeart className="text-red-500" />
        ) : (
            <FaRegHeart className="text-gray-500" />
        )}
    </button>

</div>

                <div className="p-6">
                    
                    <p
    className="
    uppercase
    text-xs
    tracking-[3px]
    text-gray-400
    mb-2
    "
>
    Collection
</p>
                    <h2
    className="
    text-lg
    font-serif
    mb-3
    "
>
                        {product.name}
                    </h2>

                    <p
className="
text-black
font-medium
tracking-wide
mb-6
"
>
    ₹ {product.price}
</p>

                    <p
className="
uppercase
tracking-[3px]
text-sm
border-b
border-black
inline-block
pb-1
"
>
    View Details
</p>
                </div>
            </div>
        </Link>
    )
}

export default ProductCard