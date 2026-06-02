import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import WishlistProvider from "./context/WishlistContext"
import CartProvider from "./context/CartContext"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WishlistProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </WishlistProvider>
  </React.StrictMode>
)