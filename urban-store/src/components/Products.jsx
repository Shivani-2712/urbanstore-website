import { useEffect, useState } from "react"
import axios from "axios"
import ProductCard from "./ProductCard"

function Products() {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState("")

  const [selectedCategory, setSelectedCategory] =
    useState("All")

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

  return (
    <section className="px-10 py-20 bg-gray-50">
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
          className="px-4 py-2 border rounded"
        >
          All
        </button>

        <button
          onClick={() =>
            setSelectedCategory("T-Shirts")
          }
          className="px-4 py-2 border rounded"
        >
          T-Shirts
        </button>

        <button
          onClick={() =>
            setSelectedCategory("Hoodies")
          }
          className="px-4 py-2 border rounded"
        >
          Hoodies
        </button>

        <button
          onClick={() =>
            setSelectedCategory("Jackets")
          }
          className="px-4 py-2 border rounded"
        >
          Jackets
        </button>

        <button
          onClick={() =>
            setSelectedCategory(
              "Sweatshirts"
            )
          }
          className="px-4 py-2 border rounded"
        >
          Sweatshirts
        </button>

        <button
          onClick={() =>
            setSelectedCategory("Dresses")
          }
          className="px-4 py-2 border rounded"
        >
          Dresses
        </button>

        <button
          onClick={() =>
            setSelectedCategory("Jeans")
          }
          className="px-4 py-2 border rounded"
        >
          Jeans
        </button>

        <button
          onClick={() =>
            setSelectedCategory("Shirts")
          }
          className="px-4 py-2 border rounded"
        >
          Shirts
        </button>

      </div>
      <h2 className="text-5xl font-bold mb-12 text-center">
        Trending Products
      </h2>

      <div className="grid md:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
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