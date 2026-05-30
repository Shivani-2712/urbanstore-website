import { Link } from "react-router-dom"

function ProductCard({ product }) {
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