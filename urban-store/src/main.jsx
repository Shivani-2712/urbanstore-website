import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import WishlistProvider from "./context/WishlistContext"
import CartProvider from "./context/CartContext"
import { Toaster } from "react-hot-toast"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WishlistProvider>
      <CartProvider>
        <App />
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            duration: 3000,
            style: {
              background: "#1A2234",
              color: "#F8F5F0",
              border: "1px solid #D9CFC2",
              borderRadius: "14px",
              padding: "16px",
              fontSize: "15px",
            },
            success: {
              iconTheme: {
                primary: "#22C55E",
                secondary: "#FFFFFF",
              },
            },
            error: {
              iconTheme: {
                primary: "#EF4444",
                secondary: "#FFFFFF",
              },
            },
          }}
        />
      </CartProvider>
    </WishlistProvider>
  </React.StrictMode>
)