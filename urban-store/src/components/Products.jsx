import { useEffect, useState } from "react"
import axios from "axios"
import ProductCard from "./ProductCard"

function Products() {
  const [products, setProducts] = useState([])

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

  return (
    <section className="px-10 py-20 bg-gray-50">
      <h2 className="text-5xl font-bold mb-12 text-center">
        Trending Products
      </h2>

      <div className="grid md:grid-cols-4 gap-8">
        {products.map((product) => (
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