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
        <div className="min-h-screen px-10 py-16 bg-[#F8F4EE]">
            <div className="text-center mb-12">

                <p className="uppercase tracking-[4px] text-gray-400 mb-3">
                    Your Selection
                </p>

                <h1 className="text-5xl font-serif">
                    Shopping Cart
                </h1>

                <p className="text-gray-500 mt-3">
                    {cartItems.length} Items
                </p>

                <div className="w-24 h-px bg-[#D9CFC2] mx-auto mt-6"></div>
            </div>

            {cartItems.length === 0 ? (
                <div className="text-center py-20">

                    <div className="text-7xl mb-6">
                        🛒
                    </div>

                    <h2 className="text-3xl font-serif mb-4">
                        Your Cart Is Empty
                    </h2>

                    <p className="text-gray-500">
                        Discover timeless fashion pieces
                        and add them to your cart.
                    </p>

                    <Link
                        to="/"
                        className="inline-block mt-8 bg-black text-white px-8 py-4 uppercase tracking-[3px]"
                    >
                        Start Shopping
                    </Link>

                </div>
            ) : (
                <div className="grid gap-6">
                    {cartItems.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white border border-[#E8DCCB] p-6 flex items-center justify-between hover:shadow-lg transition">

                            <div className="flex items-center gap-6">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-32 h-32 object-cover border border-[#E8DCCB]"
                                />

                                <div>
                                    <h2 className="text-2xl font-serif mb-2">
                                        {item.name}
                                    </h2>

                                    <p className="text-gray-500">
                                        ₹{item.price}
                                    </p>

                                    {item.size && (
                                        <p className="text-sm text-gray-400 mt-1">
                                            Size: {item.size}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center border border-[#D9CFC2]">
                                <button onClick={() => decreaseQuantity(item._id)}
                                    className="w-12 h-12 border-r border-[#D9CFC2] hover:bg-black hover:text-white transition">
                                    −
                                </button>

                                <span className="w-12 text-center font-medium">
                                    {item.quantity}
                                </span>

                                <button onClick={() => increaseQuantity(item._id)}
                                    className="w-12 h-12 border-l border-[#D9CFC2] hover:bg-black hover:text-white transition">
                                    +
                                </button>
                            </div>

                            <button onClick={() => removeFromCart(item._id)}
                                className="border border-[#D9CFC2] px-5 py-3 uppercase tracking-[2px] text-sm hover:bg-black hover:text-white transition">
                                Remove
                            </button>
                        </div>
                    ))}

                    <div
                        className="bg-white border border-[#E8DCCB] p-10 mt-8"
                    >
                        <div className="flex justify-between items-end">

                            <div>
                                <p className="uppercase tracking-[4px] text-gray-400 text-sm mb-2">
                                    Order Total
                                </p>

                                <div className="w-24 border-t border-[#E8DCCB]"></div>
                            </div>

                            <h2 className="text-5xl font-serif">
                                ₹{totalPrice}
                            </h2>

                        </div>


                        <div className="border-t border-[#E8DCCB] my-6"></div>
                        <Link to="/checkout">
                            <button className="w-full bg-black text-white py-5 uppercase tracking-[4px] hover:opacity-90 transition">
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