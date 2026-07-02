import { useEffect, useState } from "react"
import axios from "axios"
import AdminLayout from "../layouts/AdminLayout"

function AdminReviews() {

    const [reviews, setReviews] = useState([])

    const [search, setSearch] = useState("")

    const [ratingFilter, setRatingFilter] = useState("All")

    useEffect(() => {

        fetchReviews()

    }, [])

    const fetchReviews = async () => {

        try {

            const res = await axios.get(
                "http://localhost:5000/admin/reviews"
            )

            setReviews(res.data)

        } catch (error) {

            console.log(error)

        }

    }

    const deleteReview = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this review?"
        )

        if (!confirmDelete) return

        try {

            await axios.delete(
                `http://localhost:5000/admin/reviews/${id}`
            )

            fetchReviews()

            toast.success("Review deleted successfully!")

        } catch (error) {

            console.log(error)

            toast.error("Failed to delete review.")

        }

    }

    const filteredReviews = reviews.filter((review) => {

        const customer =
            review.userName
                ?.toLowerCase()
                .includes(search.toLowerCase())

        const product =
            review.productId?.name
                ?.toLowerCase()
                .includes(search.toLowerCase())

        const ratingMatch =
            ratingFilter === "All"
                ? true
                : review.rating === Number(ratingFilter)

        return (customer || product) && ratingMatch

    })

    const averageRating =
        reviews.length > 0
            ? (
                reviews.reduce(
                    (sum, review) =>
                        sum + review.rating,
                    0
                ) / reviews.length
            ).toFixed(1)
            : 0

    const fiveStar =
        reviews.filter(
            review => review.rating === 5
        ).length

    const oneStar =
        reviews.filter(
            review => review.rating === 1
        ).length

    return (

        <AdminLayout>

            <div className="flex justify-between items-center mb-10">

                <div>

                    <p className="uppercase tracking-[4px] text-gray-400">
                        UrbanStore Admin
                    </p>

                    <h1 className="text-4xl font-serif mt-2">
                        Review Management
                    </h1>

                    <div className="grid md:grid-cols-4 gap-6 mt-10 mb-10">

                        <div className="bg-white rounded-3xl shadow-sm p-8">

                            <p className="text-gray-500">

                                Total Reviews

                            </p>

                            <h2 className="text-5xl font-serif mt-4">

                                {reviews.length}

                            </h2>

                        </div>

                        <div className="bg-white rounded-3xl shadow-sm p-8">

                            <p className="text-gray-500">

                                Average Rating

                            </p>

                            <h2 className="text-5xl font-serif mt-4">

                                ⭐ {averageRating}

                            </h2>

                        </div>

                        <div className="bg-white rounded-3xl shadow-sm p-8">

                            <p className="text-gray-500">

                                5 Star Reviews

                            </p>

                            <h2 className="text-5xl font-serif text-green-600 mt-4">

                                {fiveStar}

                            </h2>

                        </div>

                        <div className="bg-white rounded-3xl shadow-sm p-8">

                            <p className="text-gray-500">

                                1 Star Reviews

                            </p>

                            <h2 className="text-5xl font-serif text-red-500 mt-4">

                                {oneStar}

                            </h2>

                        </div>

                    </div>

                </div>

            </div>

            <div className="bg-white rounded-3xl shadow-sm p-6 mb-8 flex gap-4">

                <input
                    type="text"
                    placeholder="Search customer or product..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    className="flex-1 border border-[#E8DCCB] rounded-xl px-5 py-3"
                />

                <select
                    value={ratingFilter}
                    onChange={(e) =>
                        setRatingFilter(e.target.value)
                    }
                    className="border border-[#E8DCCB] rounded-xl px-5"
                >

                    <option>All</option>
                    <option value="5">★★★★★</option>
                    <option value="4">★★★★☆</option>
                    <option value="3">★★★☆☆</option>
                    <option value="2">★★☆☆☆</option>
                    <option value="1">★☆☆☆☆</option>

                </select>

            </div>

            <div className="bg-white rounded-3xl shadow-sm overflow-x-auto">

                <table className="w-full">

                    <thead>

                        <tr className="border-b border-[#E8DCCB] uppercase tracking-[2px] text-xs text-gray-500">

                            <th className="py-5 text-left pl-8">
                                Product
                            </th>

                            <th>
                                Customer
                            </th>

                            <th>
                                Rating
                            </th>

                            <th>
                                Review
                            </th>

                            <th>
                                Date
                            </th>

                            <th>
                                Action
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {filteredReviews.map((review) => (

                            <tr
                                key={review._id}
                                className="border-b border-[#F0E7DB]"
                            >

                                <td className="py-5 pl-8">

                                    <div className="flex items-center gap-4">

                                        <img
                                            src={review.productId?.image}
                                            alt=""
                                            className="w-14 h-14 rounded-lg object-cover border"
                                        />

                                        <div>

                                            <p className="font-medium">

                                                {review.productId?.name}

                                            </p>

                                        </div>

                                    </div>

                                </td>

                                <td>

                                    <div>

                                        <p className="font-medium">

                                            {review.userName}

                                        </p>

                                        <p className="text-sm text-gray-500">

                                            {review.userId?.email}

                                        </p>

                                    </div>

                                </td>

                                <td>

                                    {"⭐".repeat(review.rating)}

                                </td>

                                <td className="max-w-xs">

                                    {review.comment}

                                </td>

                                <td>

                                    {new Date(
                                        review.createdAt
                                    ).toLocaleDateString()}

                                </td>

                                <td>

                                    <button
                                        onClick={() => deleteReview(review._id)}
                                        className="text-red-600 font-medium hover:underline"
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </AdminLayout>

    )

}

export default AdminReviews