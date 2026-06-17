import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { CartContext } from "../context/CartContext"
import ProductCard from "../components/ProductCard"

function ProductDetails() {
    const { id } = useParams()
    const { addToCart } = useContext(CartContext)
    const navigate = useNavigate()

    const [product, setProduct] = useState(null)

    const [relatedProducts,
        setRelatedProducts] =
        useState([])

    const [
        recentlyViewed,
        setRecentlyViewed,
    ] = useState([])

    const [reviews, setReviews] = useState([])

    const [canReview, setCanReview] =
        useState(false)

    const [hasReviewed, setHasReviewed] =
        useState(false)

    const [editingReviewId,
        setEditingReviewId] =
        useState(null)

    const averageRating =
        reviews.length > 0
            ? (
                reviews.reduce(
                    (total, review) =>
                        total +
                        review.rating,
                    0
                ) / reviews.length
            ).toFixed(1)
            : 0

    const [rating, setRating] = useState(5)

    const [comment, setComment] =
        useState("")

    const [selectedSize, setSelectedSize] = useState("")

    useEffect(() => {
        axios
            .get(
                `http://localhost:5000/products/${id}`
            )
            .then(async (res) => {

                setProduct(
                    res.data
                )

                const viewedProducts =
                    JSON.parse(
                        localStorage.getItem(
                            "recentlyViewed"
                        )
                    ) || []

                const updatedProducts =
                    [
                        res.data,
                        ...viewedProducts.filter(
                            (item) =>
                                item._id !==
                                res.data._id
                        ),
                    ].slice(0, 6)

                localStorage.setItem(
                    "recentlyViewed",
                    JSON.stringify(
                        updatedProducts
                    )
                )

                const allProducts =
                    await axios.get(
                        "http://localhost:5000/products"
                    )

                const related =
                    allProducts.data.filter(
                        (item) =>
                            item.category ===
                            res.data.category &&
                            item._id !==
                            res.data._id
                    )

                setRelatedProducts(
                    related.slice(0, 4)
                )

            })
            .catch((err) => {
                console.log(err)
            })
    }, [id])

    useEffect(() => {
        axios
            .get(
                `http://localhost:5000/reviews/${id}`
            )
            .then((res) => {
                setReviews(res.data)

                const user =
                    JSON.parse(
                        localStorage.getItem(
                            "userInfo"
                        )
                    )

                if (user) {
                    const existingReview =
                        res.data.find(
                            (review) =>
                                review.userId ===
                                user._id
                        )

                    setHasReviewed(
                        !!existingReview
                    )
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }, [id])

    useEffect(() => {
        const user = JSON.parse(
            localStorage.getItem(
                "userInfo"
            )
        )

        if (!user) return

        axios
            .get(
                `http://localhost:5000/can-review/${user._id}/${id}`
            )
            .then((res) => {
                setCanReview(
                    res.data.canReview
                )
            })
            .catch((err) => {
                console.log(err)
            })
    }, [id])

    useEffect(() => {

        const products =
            JSON.parse(
                localStorage.getItem(
                    "recentlyViewed"
                )
            ) || []

        setRecentlyViewed(
            products.filter(
                (item) =>
                    item._id !== id
            )
        )

    }, [id])

    const submitReview = async () => {
        try {
            const user = JSON.parse(
                localStorage.getItem(
                    "userInfo"
                )
            )

            await axios.post(
                "http://localhost:5000/reviews",
                {
                    productId: id,

                    userId:
                        user._id,

                    userName:
                        user.name,

                    rating,

                    comment,
                }
            )

            const res =
                await axios.get(
                    `http://localhost:5000/reviews/${id}`
                )

            setReviews(res.data)

            setHasReviewed(true)

            setComment("")

            setRating(5)

            alert(
                "Review Added ⭐"
            )
        } catch (error) {

            if (
                error.response
            ) {
                alert(
                    error.response
                        .data
                        .message
                )
            }

            console.log(error)
        }
    }

    if (!product) {
        return (
            <div className="text-center py-20 text-2xl">
                Loading...
            </div>
        )
    }

    const editReview = (
        review
    ) => {

        console.log("EDIT CLICKED", review)

        setRating(
            review.rating
        )

        setComment(
            review.comment
        )

        setEditingReviewId(
            review._id
        )
    }

    const updateReview =
        async () => {
            try {

                await axios.put(
                    `http://localhost:5000/reviews/${editingReviewId}`,
                    {
                        rating,
                        comment,
                    }
                )

                const res =
                    await axios.get(
                        `http://localhost:5000/reviews/${id}`
                    )

                setReviews(
                    res.data
                )

                setEditingReviewId(
                    null
                )

                setComment("")

                setRating(5)

                alert(
                    "Review Updated ⭐"
                )

            } catch (error) {
                console.log(error)
            }
        }

    const handleBuyNow = () => {

        if (!selectedSize) {
            alert("Please select a size")
            return
        }

        addToCart({
            ...product,
            size: selectedSize,
        })

        setTimeout(() => {
            navigate("/checkout")
        }, 300)
    }
    return (
        <div className="min-h-screen px-10 py-12 bg-[#F8F4EE]">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-start">

                {/* Product Image */}

                <div>
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-[500px] object-cover border border-[#E8DCCB]" />
                </div>

                {/* Product Details */}

                <div>

                    <p className="uppercase tracking-[4px] text-gray-400 mb-4">
                        UrbanStore Collection
                    </p>

                    <h1 className="text-3xl font-serif leading-tight mb-6">
                        {product.name}
                    </h1>

                    {reviews.length > 0 ? (
                        <div className="flex items-center gap-2 mb-6">
                            <span className="text-yellow-500">
                                ⭐
                            </span>

                            <span>
                                {averageRating}
                            </span>

                            <span className="text-gray-500">
                                ({reviews.length} Reviews)
                            </span>
                        </div>
                    ) : (
                        <p className="text-gray-500 mb-6">
                            No Reviews Yet
                        </p>
                    )}

                    <p className="text-3xl font-semibold mb-8">
                        ₹ {product.price}
                    </p>

                    <p className="text-gray-600 text-lg leading-8 mb-10">
                        {product.description}
                    </p>

                    {/* Size */}

                    <div className="mb-10">

                        <p className="uppercase tracking-[3px] text-sm mb-4">
                            Select Size
                        </p>

                        <div className="flex gap-3">

                            {["S", "M", "L", "XL"].map((size) => (
                                <button
                                    key={size}
                                    onClick={() =>
                                        setSelectedSize(size)
                                    }
                                    className={`px-5 py-3 border transition
                ${selectedSize === size
                                            ? "bg-black text-white border-black shadow-lg"
                                            : "border-gray-300 hover:bg-black hover:text-white"
                                        }
            `}
                                >
                                    {size}
                                </button>
                            ))}

                        </div>

                        {selectedSize && (
                            <p className="mt-3 text-gray-600">
                                Selected Size: {selectedSize}
                            </p>
                        )}

                    </div>

                    {/* Buttons */}

                    <div className="space-y-4">

                        <button
                            onClick={() => {
                                if (!selectedSize) {
                                    alert("Please select a size")
                                    return
                                }

                                addToCart({
                                    ...product,
                                    size: selectedSize,
                                })
                            }}
                            className="w-full bg-black text-white py-4 uppercase tracking-[3px]">
                            Add To Cart
                        </button>

                        <button
                            onClick={handleBuyNow}
                            className="w-full border border-black py-4 uppercase tracking-[3px] hover:bg-black hover:text-white transition">
                            Buy Now
                        </button>

                    </div>

                </div>

            </div>
            <div className="mt-12">

                <h2 className="text-2xl font-serif mb-6">
                    Reviews
                </h2>

                {canReview && (!hasReviewed || editingReviewId) ? (
                    <div className="bg-white p-5 rounded-xl shadow-sm mb-8 max-w-5xl">
                        <select
                            value={rating}
                            onChange={(e) =>
                                setRating(
                                    Number(
                                        e.target.value
                                    )
                                )
                            }
                            className="border p-3 rounded mb-4"
                        >
                            <option value="5">
                                ⭐⭐⭐⭐⭐
                            </option>

                            <option value="4">
                                ⭐⭐⭐⭐
                            </option>

                            <option value="3">
                                ⭐⭐⭐
                            </option>

                            <option value="2">
                                ⭐⭐
                            </option>

                            <option value="1">
                                ⭐
                            </option>
                        </select>

                        <textarea
                            rows={2}
                            placeholder="Write your review..."
                            value={comment}
                            onChange={(e) =>
                                setComment(
                                    e.target.value
                                )
                            }
                            className="w-full border p-4 rounded mb-4"
                        />

                        <button
                            onClick={
                                editingReviewId
                                    ? updateReview
                                    : submitReview
                            }
                            className="bg-black text-white px-6 py-3 rounded"
                        >
                            {editingReviewId
                                ? "Update Review"
                                : "Submit Review"}
                        </button>
                    </div>
                ) : hasReviewed ? (
                    <div className="bg-green-50 border border-green-300 p-4 rounded-xl mb-10">

                        ✓ You have already reviewed this product

                        <button
                            onClick={() => {
                                const user =
                                    JSON.parse(
                                        localStorage.getItem(
                                            "userInfo"
                                        )
                                    )

                                const review =
                                    reviews.find(
                                        (r) =>
                                            r.userId ===
                                            user._id
                                    )

                                if (
                                    review
                                ) {
                                    editReview(
                                        review
                                    )
                                }
                            }}
                            className="ml-4 bg-blue-500 text-white px-3 py-1 rounded"
                        >
                            Edit Review
                        </button>

                    </div>
                ) : (
                    <div className="bg-yellow-50 border border-yellow-300 p-4 rounded-xl mb-10">
                        Only customers who purchased this product can review it.
                    </div>
                )}

                {reviews.map(
                    (review) => (
                        <div
                            key={review._id}
                            className="bg-white p-5 rounded-xl border border-[#E8DCCB] mb-4">
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-semibold text-lg">
                                        {review.userName}
                                    </h3>

                                    {review.verifiedBuyer && (
                                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                                            Verified Buyer
                                        </span>
                                    )}
                                </div>
                            </div>

                            <p className="mb-2">
                                {"⭐".repeat(
                                    review.rating
                                )}
                            </p>

                            <p className="mb-2">
                                {review.comment}
                            </p>

                            <p className="text-gray-500 text-sm">
                                {new Date(
                                    review.createdAt
                                ).toLocaleDateString()}
                            </p>
                        </div>
                    )
                )}
            </div>

            <div className="mt-16 pt-12 border-t border-[#E8DCCB]">

                {relatedProducts.length > 0 && (
                    <>
                        <h2 className="text-2xl font-serif mb-6">
                            You May Also Like
                        </h2>

                        <div className="grid md:grid-cols-4 gap-8">

                            {relatedProducts.map((item) => (
                                <ProductCard
                                    key={item._id}
                                    product={item}
                                />
                            ))}

                        </div>
                    </>
                )}

                {recentlyViewed.length >
                    0 && (
                        <div className="mt-16 pt-12 border-t border-[#E8DCCB]">

                            <h2 className="text-2xl font-serif mb-8">
                                Recently Viewed
                            </h2>

                            <div className="grid md:grid-cols-4 gap-8">

                                {recentlyViewed.map(
                                    (product) => (
                                        <ProductCard
                                            key={
                                                product._id
                                            }
                                            product={
                                                product
                                            }
                                        />
                                    )
                                )}

                            </div>

                        </div>
                    )}
            </div>
        </div>
    )
}

export default ProductDetails