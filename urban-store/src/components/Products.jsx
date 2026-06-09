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
  className="
  pt-12
  pb-24
  bg-[#F8F4EE]
"
>
  <div className="max-w-7xl mx-auto px-8">
      <div className="text-center mb-10 mt-6">
<div className="w-40 h-px bg-[#D9CFC2] mx-auto mb-8"></div>
    <p
        className="
        uppercase
        tracking-[4px]
        text-gray-400
        mb-4
        "
    >
        Featured Collection
    </p>

    <h2 className="
text-6xl
font-serif
font-medium
tracking-tight
">
        New Arrivals
    </h2>

</div>
      <div className="flex justify-center mb-10">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="
w-full
max-w-xl
border
border-[#D9CFC2]
bg-white
p-5
text-lg
outline-none
"
        />
      </div>

      <div className="flex justify-center gap-3 mb-6 flex-wrap">

        <button
          onClick={() =>
            setSelectedCategory("All")
          }
          className={`px-4 py-2 rounded transition
    ${selectedCategory === "All"
              ? "bg-black text-white"
: "border border-[#D9CFC2] bg-white"
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
              : "border border-[#D9CFC2] bg-white"
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
              : "border border-[#D9CFC2] bg-white "
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
              : "border border-[#D9CFC2] bg-white"
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
              : "border border-[#D9CFC2] bg-white"
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
              : "border border-[#D9CFC2] bg-white"
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
              : "border border-[#D9CFC2] bg-white"
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
              : "border border-[#D9CFC2] bg-white"
            }`}
        >
          Shirts
        </button>

      </div>
      <div className="flex justify-center mb-4">
        <select
          value={sortOption}
          onChange={(e) =>
            setSortOption(e.target.value)
          }
          className="
border
border-[#D9CFC2]
bg-white
p-3
"
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
      <p className="text-center text-gray-400 text-sm mb-10">
        {sortedProducts.length} Pieces Available
      </p>
      {sortedProducts.length === 0 && (
  <p className="text-center text-red-500 mb-6">
    No products found
  </p>
)}
      

      <div className="
max-w-7xl
mx-auto
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-4
gap-6
px-8
">
        {sortedProducts.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}
      </div>
      </div>
    </section>
  )
}

export default Products