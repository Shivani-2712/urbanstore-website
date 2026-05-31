import { useEffect, useState } from "react"
import axios from "axios"

function Admin() {
    const [products, setProducts] = useState([])

    const fetchProducts = async () => {
        try {
            const res = await axios.get(
                "http://localhost:5000/products"
            )

            setProducts(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    const [imageFile, setImageFile] = useState(null)

    const [editingProduct, setEditingProduct] =
        useState(null)

    const updateProduct = async (e) => {
        e.preventDefault()

        try {
            await axios.put(
                `http://localhost:5000/products/${editingProduct._id}`,
                formData
            )

            setEditingProduct(null)

            setFormData({
                name: "",
                price: "",
                image: "",
                description: "",
            })

            fetchProducts()
        } catch (error) {
            console.log(error)
        }
    }

    const deleteProduct = async (id) => {
        try {
            await axios.delete(
                `http://localhost:5000/products/${id}`
            )

            fetchProducts()
        } catch (error) {
            console.log(error)
        }
    }

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        image: "",
        description: "",
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const uploadImage = async () => {
        const data = new FormData()

        data.append("image", imageFile)

        const res = await axios.post(
            "http://localhost:5000/upload",
            data
        )

        return res.data.imageUrl
    }

    const addProduct = async (e) => {
        e.preventDefault()

        console.log("Add Product clicked")

        try {
            let imageUrl = ""

            if (imageFile) {
                imageUrl = await uploadImage()
            }

            await axios.post(
                "http://localhost:5000/products",
                {
                    ...formData,
                    image: imageUrl,
                }
            )

            setFormData({
                name: "",
                price: "",
                description: "",
            })

            setImageFile(null)

            fetchProducts()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="p-10">
            <h1 className="text-4xl font-bold mb-8">
                Admin Dashboard
            </h1>

            <form
                onSubmit={
                    editingProduct
                        ? updateProduct
                        : addProduct
                }
                className="mb-10 space-y-4"
            >
                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                />

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                />

                <input
                    type="file"
                    accept="image/*"
                    placeholder="Image URL"
                    onChange={(e) => setImageFile(e.target.files[0])}
                    className="w-full border p-3 rounded"
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                />

                <button
                    type="submit"
                    className="bg-green-600 text-white px-6 py-3 rounded"
                >
                    {editingProduct
                        ? "Update Product"
                        : "Add Product"}
                </button>
            </form>

            <div className="grid gap-4">
                {products.map((product) => (
                    <div
                        key={product._id}
                        className="flex justify-between items-center p-4 border rounded-lg"
                    >
                        <div>
                            <h2 className="font-bold">
                                {product.name}
                            </h2>

                            <p>
                                ₹{product.price}
                            </p>
                        </div>

                        <button
                            onClick={() => deleteProduct(product._id)}
                            className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                            Delete
                        </button>

                        <button
                            onClick={() => {
                                setEditingProduct(product)

                                setFormData({
                                    name: product.name,
                                    price: product.price,
                                    image: product.image,
                                    description: product.description,
                                })
                            }}
                            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                        >
                            Edit
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Admin