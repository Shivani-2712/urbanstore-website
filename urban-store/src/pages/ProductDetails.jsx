import { useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { CartContext } from "../context/CartContext"

function ProductDetails() {
    const { id } = useParams()
    const { addToCart } = useContext(CartContext)

    const [product, setProduct] = useState(null)

    useEffect(() => {
        axios
            .get(`http://localhost:5000/products/${id}`)
            .then((res) => {
                setProduct(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [id])

    if (!product) {
        return (
            <div className="text-center py-20 text-2xl">
                Loading...
            </div>
        )
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
        </div>
    )
}

export default ProductDetails