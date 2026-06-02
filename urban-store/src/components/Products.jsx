import { useEffect, useState } from "react"
import axios from "axios"
import ProductCard from "./ProductCard"

function Products() {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState("")

  const [selectedCategory, setSelectedCategory] =
    useState("All")

  const [sortOption, setSortOption] =
    useState("default")

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((res) => {
        setProducts(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const filteredProducts = products.filter(
    (product) => {
      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(search.toLowerCase())

      const matchesCategory =
        selectedCategory === "All" ||
        product.category === selectedCategory

      return (
        matchesSearch &&
        matchesCategory
      )
    }
  )

  const sortedProducts = [...filteredProducts]

  if (sortOption === "lowToHigh") {
    sortedProducts.sort(
      (a, b) => a.price - b.price
    )
  }

  if (sortOption === "highToLow") {
    sortedProducts.sort(
      (a, b) => b.price - a.price
    )
  }

  return (
    <section
      id="products"
      className="px-10 py-20 bg-gray-50"
    >
      <div className="flex justify-center mb-10">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full max-w-lg border p-4 rounded-xl shadow-sm"
        />
      </div>

      <div className="flex justify-center gap-3 mb-10 flex-wrap">

        <button
          onClick={() =>
            setSelectedCategory("All")
          }
          className={`px-4 py-2 rounded transition
    ${selectedCategory === "All"
              ? "bg-black text-white"
              : "border"
            }`}
        >
          All
        </button>

        <button
          onClick={() =>
            setSelectedCategory("Jackets")
          }
          className={`px-4 py-2 rounded transition
    ${selectedCategory === "Jackets"
              ? "bg-black text-white"
              : "border"
            }`}
        >
          Jackets
        </button>

        <button
          onClick={() =>
            setSelectedCategory("Hoodies")
          }
          className={`px-4 py-2 rounded transition
    ${selectedCategory === "Hoodies"
              ? "bg-black text-white"
              : "border"
            }`}
        >
          Hoodies
        </button>

        <button
          onClick={() =>
            setSelectedCategory("T-shirts")
          }
          className={`px-4 py-2 rounded transition
    ${selectedCategory === "T-shirts"
              ? "bg-black text-white"
              : "border"
            }`}
        >
          T-shirts
        </button>

        <button
          onClick={() =>
            setSelectedCategory(
              "Sweatshirts"
            )
          }
          className={`px-4 py-2 rounded transition
    ${selectedCategory === "Sweatshirts"
              ? "bg-black text-white"
              : "border"
            }`}
        >
          Sweatshirts
        </button>

        <button
          onClick={() =>
            setSelectedCategory("Dresses")
          }
          className={`px-4 py-2 rounded transition
    ${selectedCategory === "Dresses"
              ? "bg-black text-white"
              : "border"
            }`}
        >
          Dresses
        </button>

        <button
          onClick={() =>
            setSelectedCategory("Jeans")
          }
          className={`px-4 py-2 rounded transition
    ${selectedCategory === "Jeans"
              ? "bg-black text-white"
              : "border"
            }`}
        >
          Jeans
        </button>

        <button
          onClick={() =>
            setSelectedCategory("Shirts")
          }
          className={`px-4 py-2 rounded transition
    ${selectedCategory === "Shirts"
              ? "bg-black text-white"
              : "border"
            }`}
        >
          Shirts
        </button>

      </div>
      <div className="flex justify-center mb-8">
        <select
          value={sortOption}
          onChange={(e) =>
            setSortOption(e.target.value)
          }
          className="border p-3 rounded-lg"
        >
          <option value="default">
            Sort By
          </option>

          <option value="lowToHigh">
            Price: Low to High
          </option>

          <option value="highToLow">
            Price: High to Low
          </option>
        </select>
      </div>
      <p className="text-center text-gray-500 mb-4">
        Showing {sortedProducts.length} Products
      </p>
      <h2 className="text-5xl font-bold mb-12 text-center">
        Trending Products
      </h2>

      <div className="grid md:grid-cols-4 gap-8">
        {sortedProducts.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}
      </div>
    </section>
  )
}

export default Products