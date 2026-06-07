import { createContext, useState, useEffect } from "react"
import axios from "axios"

export const WishlistContext =
    createContext()

function WishlistProvider({
    children,
}) {
    const [
    wishlistItems,
    setWishlistItems,
] = useState([])

const loadWishlist = async () => {

    const user =
        JSON.parse(
            localStorage.getItem(
                "userInfo"
            )
        )

    if (!user) {

        setWishlistItems([])

        return
    }

    try {

        const res =
            await axios.get(
                `http://localhost:5000/wishlist/${user._id}`
            )

        const wishlistData =
            await Promise.all(

                res.data.map(
                    async (item) => {

                        const product =
                            await axios.get(
                                `http://localhost:5000/products/${item.productId}`
                            )

                        return product.data
                    }
                )
            )

        setWishlistItems(
            wishlistData
        )

    } catch (error) {

        console.log(error)

    }
}

useEffect(() => {

    loadWishlist()

}, [])

useEffect(() => {

    const handleWishlistReload =
        () => {

            loadWishlist()

        }

    window.addEventListener(
        "wishlistUpdated",
        handleWishlistReload
    )

    return () =>
        window.removeEventListener(
            "wishlistUpdated",
            handleWishlistReload
        )

}, [])

    const toggleWishlist =
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

        const exists =
            wishlistItems.find(
                (item) =>
                    item._id ===
                    product._id
            )

        if (exists) {

    await axios.delete(
        `http://localhost:5000/wishlist/${user._id}/${product._id}`
    )

    setWishlistItems(
        wishlistItems.filter(
            (item) =>
                item._id !==
                product._id
        )
    )
        } else {

            await axios.post(
                "http://localhost:5000/wishlist",
                {
                    userId:
                        user._id,

                    productId:
                        product._id,
                }
            )

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