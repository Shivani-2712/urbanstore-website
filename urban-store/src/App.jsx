import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"

import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Products from "./components/Products"
import ProductDetails from "./pages/ProductDetails"
import Cart from "./pages/Cart"
import Admin from "./pages/Admin"

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
          path="/admin"
          element={<Admin />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App