import { useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { CartContext } from "../context/CartContext"
import ProductCard from "../components/ProductCard"

function ProductDetails() {
    const { id } = useParams()
    const { addToCart } = useContext(CartContext)

    const [product, setProduct] = useState(null)

    const [relatedProducts,
        setRelatedProducts] =
        useState([])

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

    useEffect(() => {
        axios
            .get(
                `http://localhost:5000/products/${id}`
            )
            .then(async (res) => {

                setProduct(
                    res.data
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

    return (
        <div className="min-h-screen px-10 py-20">
            <div className="grid md:grid-cols-2 gap-16">
                <img
                    src={product.image}
                    alt={product.name}
                    className="rounded-2xl w-full"
                />

                <div>
                    <h1 className="text-5xl font-bold mb-6">
                        {product.name}
                    </h1>

                    {reviews.length > 0 ? (
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-yellow-500 text-xl">
                                ⭐
                            </span>

                            <span className="font-semibold">
                                {averageRating}
                            </span>

                            <span className="text-gray-500">
                                ({reviews.length} Reviews)
                            </span>
                        </div>
                    ) : (
                        <p className="text-gray-500 mb-4">
                            No Reviews Yet
                        </p>
                    )}

                    <p className="text-3xl mb-6">
                        ₹{product.price}
                    </p>

                    <p className="text-gray-600 text-lg mb-8">
                        {product.description}
                    </p>

                    <div className="flex gap-4 mb-8">
                        <button className="border px-4 py-2 rounded">
                            S
                        </button>

                        <button className="border px-4 py-2 rounded">
                            M
                        </button>

                        <button className="border px-4 py-2 rounded">
                            L
                        </button>

                        <button className="border px-4 py-2 rounded">
                            XL
                        </button>
                    </div>

                    <button
                        onClick={() => addToCart(product)}
                        className="bg-black text-white px-8 py-4 rounded-lg"
                    >
                        Add To Cart
                    </button>
                </div>
            </div>
            <div className="mt-20">

                <h2 className="text-4xl font-bold mb-8">
                    Reviews
                </h2>

                {canReview && (!hasReviewed || editingReviewId) ? (
                    <div className="bg-white p-6 rounded-2xl shadow mb-10">
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
                            className="bg-white p-6 rounded-2xl shadow mb-4"
                        >
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-bold text-xl">
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

                            <button
                                onClick={() =>
                                    editReview(
                                        review
                                    )
                                }
                                className="bg-blue-500 text-white px-4 py-2 rounded mb-3"
                            >
                                Edit Review
                            </button>

                            <p className="text-gray-500 text-sm">
                                {new Date(
                                    review.createdAt
                                ).toLocaleDateString()}
                            </p>
                        </div>
                    )
                )}
            </div>
            <div className="mt-24">

                <h2 className="text-4xl font-bold mb-10">

                    You May Also Like

                </h2>

                {relatedProducts.length === 0 && (
                    <p className="text-gray-500">
                        No related products found
                    </p>
                )}

                <div className="grid md:grid-cols-4 gap-8">

                    {relatedProducts.map(
                        (item) => (
                            <ProductCard
                                key={item._id}
                                product={item}
                            />
                        )
                    )}

                </div>

            </div>
        </div>
    )
}

export default ProductDetails