import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"

import ProtectedRoute from "./components/ProtectedRoute"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Products from "./components/Products"
import ProductDetails from "./pages/ProductDetails"
import Cart from "./pages/Cart"
import Admin from "./pages/Admin"
import AdminLogin from "./pages/AdminLogin"
import Wishlist from "./pages/Wishlist"
import HeroBanner from "./components/HeroBanner"
import Checkout from "./pages/Checkout"

function Home() {
  return (
    <>
      <Navbar />
      <HeroBanner />
      <Products />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/admin-login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/wishlist"
          element={<Wishlist />}
        />

        <Route
          path="/checkout"
          element={<Checkout />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App