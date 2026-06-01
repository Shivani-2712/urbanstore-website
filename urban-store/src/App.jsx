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

function Home() {
  return (
    <>
      <Hero />
      <Products />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />

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
      </Routes>
    </BrowserRouter>
  )
}

export default App