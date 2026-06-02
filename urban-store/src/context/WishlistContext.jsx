import { createContext, useState, useEffect } from "react"

export const WishlistContext =
    createContext()

function WishlistProvider({
    children,
}) {
    const [wishlistItems, setWishlistItems] =
        useState(() => {
            const savedWishlist =
                localStorage.getItem(
                    "wishlistItems"
                )

            return savedWishlist
                ? JSON.parse(savedWishlist)
                : []
        })

    useEffect(() => {
        localStorage.setItem(
            "wishlistItems",
            JSON.stringify(wishlistItems)
        )
    }, [wishlistItems])

    const toggleWishlist = (product) => {
        const exists = wishlistItems.find(
            (item) => item._id === product._id
        )

        if (exists) {
            setWishlistItems(
                wishlistItems.filter(
                    (item) => item._id !== product._id
                )
            )
        } else {
            setWishlistItems([
                ...wishlistItems,
                product,
            ])
        }
    }

    const removeFromWishlist = (
        id
    ) => {
        setWishlistItems(
            wishlistItems.filter(
                (item) => item._id !== id
            )
        )
    }

    return (
        <WishlistContext.Provider
            value={{
                wishlistItems,
                toggleWishlist,
                removeFromWishlist,
            }}
        >
            {children}
        </WishlistContext.Provider>
    )
}

export default WishlistProvider