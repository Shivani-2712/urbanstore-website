import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"

import Register from "./pages/Register"
import Login from "./pages/Login"
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
import OrderSuccess from "./pages/OrderSuccess"
import MyOrders from "./pages/MyOrders"
import UserProtectedRoute from "./components/UserProtectedRoute"
import MyAccount from "./pages/MyAccount"
import AdminOrders from "./pages/AdminOrders"
import AdminDashboard from "./pages/AdminDashboard"

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
          path="/register"
          element={<Register />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/admin-login"
          element={<AdminLogin />}
        />

        <Route
  path="/admin/products"
  element={
    <ProtectedRoute>
      <Admin />
    </ProtectedRoute>
  }
/>

        <Route
    path="/admin/orders"
    element={
        <AdminOrders />
    }
/>

<Route
  path="/admin"
  element={
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>

        <Route
    path="/wishlist"
    element={
        <UserProtectedRoute>
            <Wishlist />
        </UserProtectedRoute>
    }
/>

        <Route
          path="/checkout"
          element={
            <UserProtectedRoute>
              <Checkout />
            </UserProtectedRoute>
          }
        />

        <Route
          path="/order-success"
          element={<OrderSuccess />}
        />

        <Route
          path="/my-orders"
          element={
            <UserProtectedRoute>
              <MyOrders />
            </UserProtectedRoute>
          }
        />

        <Route
          path="/my-account"
          element={
            <UserProtectedRoute>
              <MyAccount />
            </UserProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App