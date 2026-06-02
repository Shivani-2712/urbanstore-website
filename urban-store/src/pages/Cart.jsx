import { Link } from "react-router-dom"
import { useContext } from "react"
import { CartContext } from "../context/CartContext"

function Cart() {
    const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } =
        useContext(CartContext)

    const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    )

    return (
        <div className="min-h-screen px-10 py-16 bg-gray-50">
            <h1 className="text-5xl font-bold mb-10">
                Shopping Cart
            </h1>

            {cartItems.length === 0 ? (
                <h2 className="text-2xl text-gray-500">
                    Your cart is empty
                </h2>
            ) : (
                <div className="grid gap-6">
                    {cartItems.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white p-5 rounded-2xl shadow flex items-center justify-between"
                        >
                            <div className="flex items-center gap-5">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-32 h-32 object-cover rounded-xl"
                                />

                                <div>
                                    <h2 className="text-2xl font-semibold">
                                        {item.name}
                                    </h2>

                                    <p className="text-gray-500">
                                        ₹{item.price}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 mt-4">
                                <button
                                    onClick={() => decreaseQuantity(item._id)}
                                    className="bg-gray-200 px-4 py-2 rounded-lg"
                                >
                                    -
                                </button>

                                <span className="text-xl font-semibold">
                                    {item.quantity}
                                </span>

                                <button
                                    onClick={() => increaseQuantity(item._id)}
                                    className="bg-gray-200 px-4 py-2 rounded-lg"
                                >
                                    +
                                </button>
                            </div>

                            <button
                                onClick={() => removeFromCart(index)}
                                className="bg-red-500 text-white px-5 py-3 rounded-lg hover:bg-red-600 transition"
                            >
                                Remove
                            </button>
                        </div>
                    ))}

                    <div className="bg-white p-6 rounded-2xl shadow mt-6">
                        <h2 className="text-3xl font-bold">
                            Total: ₹{totalPrice}
                        </h2>

                        <Link to="/checkout">
                            <button className="mt-6 bg-black text-white px-8 py-4 rounded-lg">
                                Checkout
                            </button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Cart