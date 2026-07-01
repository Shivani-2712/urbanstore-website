import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Products from "./components/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Admin from "./pages/AdminProducts";
import AdminLogin from "./pages/AdminLogin";
import Wishlist from "./pages/Wishlist";
import HeroBanner from "./components/HeroBanner";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import UserProtectedRoute from "./components/UserProtectedRoute";
import MyAccount from "./pages/MyAccount";
import AdminOrders from "./pages/AdminOrders";
import AdminDashboard from "./pages/AdminDashboard";
import OrderHistory from "./pages/OrderHistory";
import ForgotPassword from "./pages/ForgotPassword";
import AdminCoupons from "./pages/AdminCoupons";
import AdminUsers from "./pages/AdminUsers";
import AdminProductAnalytics from "./pages/AdminProductAnalytics";
import AdminOrderDetails from "./pages/AdminOrderDetails";
import AdminInventory from "./pages/AdminInventory"
import AdminSettings from "./pages/AdminSettings"
import AdminBanners from "./pages/AdminBanners"

function Home() {
  return (
    <>
      <Navbar />
      <HeroBanner />
      <Products />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<Login />} />

        <Route path="/admin-login" element={<AdminLogin />} />

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
            <ProtectedRoute>
              <AdminOrders />
            </ProtectedRoute>
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
          path="/admin/users"
          element={
            <ProtectedRoute>
              <AdminUsers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/product-analytics"
          element={
            <ProtectedRoute>
              <AdminProductAnalytics />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/coupons"
          element={
            <ProtectedRoute>
              <AdminCoupons />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/orders/:id"
          element={
            <ProtectedRoute>
              <AdminOrderDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/inventory"
          element={
            <ProtectedRoute>
              <AdminInventory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/settings"
          element={<AdminSettings />}
        />

        <Route
          path="/admin/banners"
          element={
            <ProtectedRoute>
              <AdminBanners />
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

        <Route path="/order-success" element={<OrderSuccess />} />

        <Route
          path="/my-account"
          element={
            <UserProtectedRoute>
              <MyAccount />
            </UserProtectedRoute>
          }
        />

        <Route
          path="/my-orders"
          element={
            <UserProtectedRoute>
              <OrderHistory />
            </UserProtectedRoute>
          }
        />

        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
