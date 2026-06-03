import { createContext, useState, useEffect } from "react"

export const CartContext = createContext()

function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart =
            localStorage.getItem("cartItems")

        return savedCart
            ? JSON.parse(savedCart)
            : []
    })

    useEffect(() => {
        localStorage.setItem(
            "cartItems",
            JSON.stringify(cartItems)
        )
    }, [cartItems])

    const addToCart = (product) => {
        setCartItems((prev) => {
            const existingItem = prev.find(
                (item) => item._id === product._id
            )

            if (existingItem) {
                return prev.map((item) =>
                    item._id === product._id
                        ? {
                            ...item,
                            quantity: item.quantity + 1,
                        }
                        : item
                )
            }

            return [
                ...prev,
                {
                    ...product,
                    quantity: 1,
                },
            ]
        })
    }

    const increaseQuantity = (_id) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item._id === _id
                    ? {
                        ...item,
                        quantity: item.quantity + 1,
                    }
                    : item
            )
        )
    }

    const decreaseQuantity = (_id) => {
        setCartItems((prev) =>
            prev
                .map((item) =>
                    item._id === _id
                        ? {
                            ...item,
                            quantity: item.quantity - 1,
                        }
                        : item
                )
                .filter((item) => item.quantity > 0)
        )
    }

    const removeFromCart = (indexToRemove) => {
        setCartItems(
            cartItems.filter(
                (_, index) => index !== indexToRemove
            )
        )
    }

    const clearCart = () => {
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