import {
    createContext,
    useState,
    useEffect,
} from "react"

import axios from "axios"

export const CartContext = createContext()

function CartProvider({ children }) {
    const [cartItems, setCartItems] =
    useState([])

    const loadCart = async () => {

    const user =
        JSON.parse(
            localStorage.getItem(
                "userInfo"
            )
        )

    if (!user) {

        setCartItems([])

        return
    }

    try {

        const res =
            await axios.get(
                `http://localhost:5000/cart/${user._id}`
            )

        const cartData =
            await Promise.all(

                res.data.map(
                    async (item) => {

                        const product =
                            await axios.get(
                                `http://localhost:5000/products/${item.productId}`
                            )

                        return {
                            ...product.data,
                            quantity:
                                item.quantity,
                        }
                    }
                )
            )

        setCartItems(
            cartData
        )

    } catch (error) {

        console.log(error)

    }
}
useEffect(() => {

    loadCart()

}, [])

    const addToCart =
    async (product) => {

        const user =
            JSON.parse(
                localStorage.getItem(
                    "userInfo"
                )
            )

        if (!user) {

            alert(
                "Please login first"
            )

            return
        }

        await axios.post(
            "http://localhost:5000/cart",
            {
                userId:
                    user._id,

                productId:
                    product._id,
            }
        )

        loadCart()
    }

    const increaseQuantity =
    async (_id) => {

        const user =
            JSON.parse(
                localStorage.getItem(
                    "userInfo"
                )
            )

        const item =
            cartItems.find(
                (item) =>
                    item._id === _id
            )

        await axios.put(
            `http://localhost:5000/cart/${user._id}/${_id}`,
            {
                quantity:
                    item.quantity + 1,
            }
        )

        loadCart()
    }

    const decreaseQuantity =
    async (_id) => {

        const user =
            JSON.parse(
                localStorage.getItem(
                    "userInfo"
                )
            )

        const item =
            cartItems.find(
                (item) =>
                    item._id === _id
            )

        if (
            item.quantity === 1
        ) {

            await axios.delete(
                `http://localhost:5000/cart/${user._id}/${_id}`
            )

        } else {

            await axios.put(
                `http://localhost:5000/cart/${user._id}/${_id}`,
                {
                    quantity:
                        item.quantity - 1,
                }
            )
        }

        loadCart()
    }

    const removeFromCart =
    async (_id) => {

        const user =
            JSON.parse(
                localStorage.getItem(
                    "userInfo"
                )
            )

        await axios.delete(
            `http://localhost:5000/cart/${user._id}/${_id}`
        )

        loadCart()
    }

    const clearCart =
    async () => {
console.log("CLEAR CART RUNNING")
        const user =
            JSON.parse(
                localStorage.getItem(
                    "userInfo"
                )
            )

        await axios.delete(
            `http://localhost:5000/cart/clear/${user._id}`
        )

        setCartItems([])
    }

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                increaseQuantity,
                decreaseQuantity,
                removeFromCart,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider