import AdminLayout from "../layouts/AdminLayout"
import { useEffect, useState } from "react"
import axios from "axios"

function Admin() {
    const [products, setProducts] = useState([])
    const [search, setSearch] = useState("")
    const [imagePreview, setImagePreview] = useState("")

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

            let imageUrl = editingProduct.image

            if (imageFile) {
                imageUrl = await uploadImage()
            }

            await axios.put(
                `http://localhost:5000/products/${editingProduct._id}`,
                {
                    ...formData,
                    image: imageUrl,
                }
            )

            setEditingProduct(null)

            setFormData({
                name: "",
                price: "",
                image: "",
                description: "",
                category: "",
            })

            setImageFile(null)
            setImagePreview("")

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
        category: "",
        stock: "",
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
                category: "",
                stock: "",
            })

            setImageFile(null)

            fetchProducts()
        } catch (error) {
            console.log(error)
        }
    }

    const filteredProducts = products.filter(
        (product) =>
            product.name
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                ) ||
            product.category
                ?.toLowerCase()
                .includes(
                    search.toLowerCase()
                )
    )

    return (
        <AdminLayout>
            <div className="mb-12">

                <p className="uppercase tracking-[4px] text-gray-400 mb-3">
                    UrbanStore Admin
                </p>

                <h1 className="text-5xl font-serif">
                    Products
                </h1>

                <div className="w-24 h-px bg-[#D9CFC2] mt-6"></div>

            </div>

            <div
                className="bg-white border border-[#E8DCCB] p-8 mb-10">

                <p className="uppercase tracking-[3px] text-xs text-gray-400 mb-6">
                    Add New Product
                </p>

                {
                    editingProduct && (
                        <div className="mb-6 bg-yellow-50 border border-yellow-200 text-yellow-700 p-4">
                            Editing Product:
                            {" "}
                            {editingProduct.name}
                        </div>
                    )
                }

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
                        className="w-full border border-[#D9CFC2] p-4 bg-white outline-none focus:border-black transition"
                    />

                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full border border-[#D9CFC2] p-4 bg-white outline-none focus:border-black transition"
                    />

                    <input
                        type="number"
                        name="stock"
                        placeholder="Stock Quantity"
                        value={formData.stock}
                        onChange={handleChange}
                        className="w-full border border-[#D9CFC2] p-4 bg-white outline-none focus:border-black transition"
                    />

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {

                            setImageFile(
                                e.target.files[0]
                            )

                            if (e.target.files[0]) {

                                setImagePreview(
                                    URL.createObjectURL(
                                        e.target.files[0]
                                    )
                                )

                            }

                        }}
                        className="w-full border border-[#D9CFC2] p-4 bg-white" />

                    {
                        (imagePreview || editingProduct?.image) && (

                            <img
                                src={
                                    imagePreview
                                        ? imagePreview
                                        : editingProduct.image
                                }
                                alt="Preview"
                                className="w-32 h-32 object-cover border border-[#D9CFC2]" />

                        )
                    }

                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full border border-[#D9CFC2] p-4 bg-white outline-none focus:border-black transition
                    ">
                        <option value="">
                            Select Category
                        </option>

                        <option value="T-Shirts">
                            T-Shirts
                        </option>

                        <option value="Hoodies">
                            Hoodies
                        </option>

                        <option value="Jackets">
                            Jackets
                        </option>

                        <option value="Sweatshirts">
                            Sweatshirts
                        </option>

                        <option value="Dresses">
                            Dresses
                        </option>

                        <option value="Jeans">
                            Jeans
                        </option>

                        <option value="Shirts">
                            Shirts
                        </option>

                        <option value="Skirts">
                            Skirts
                        </option>
                    </select>

                    <textarea
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full border border-[#D9CFC2] p-4 bg-white outline-none focus:border-black transition"
                    />

                    <button
                        type="submit"
                        className="bg-black text-white px-8 py-4 uppercase tracking-[3px] hover:opacity-90 transition"
                    >
                        {editingProduct
                            ? "Update Product"
                            : "Add Product"}
                    </button>

                    {
                        editingProduct && (

                            <button
                                type="button"
                                onClick={() => {

                                    setEditingProduct(null)

                                    setFormData({
                                        name: "",
                                        price: "",
                                        image: "",
                                        description: "",
                                        category: "",
                                    })

                                    setImagePreview(
                                        product.image
                                    )

                                    setImageFile(null)

                                }}
                                className="ml-4 border border-[#D9CFC2] px-8 py-4 uppercase tracking-[3px] hover:bg-black hover:text-white transition"
                            >
                                Cancel
                            </button>

                        )
                    }
                </form>
            </div>

            <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                }
                className="w-full max-w-md border border-[#D9CFC2] p-4 mb-4 bg-white outline-none focus:border-black"
            />
            <p className="text-gray-400 uppercase tracking-[3px] text-xs mb-6">
                {filteredProducts.length} Products Available
            </p>

            <div className="grid gap-4">
                {filteredProducts.map((product) => (

                    <div
                        key={product._id}
                        className="bg-white border border-[#E8DCCB] px-6 py-4 hover:shadow-lg transition duration-300"
                    >

                        <div className="flex justify-between items-center">

                            <div className="flex items-center gap-6">

                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-20 h-20 object-cover border border-[#E8DCCB]"
                                />

                                <div>

                                    <h2 className="text-xl font-serif">
                                        {product.name}
                                    </h2>

                                    <p className="text-gray-500 mt-1">
                                        {product.category}
                                    </p>

                                    <p className="text-gray-400 text-sm mt-1 max-w-md truncate">
                                        {product.description}
                                    </p>

                                    <p className="mt-2 text-md">
                                        ₹{product.price}
                                    </p>

                                    <p
                                        className={`text-sm mt-1 ${product.stock > 0
                                            ? "text-green-600"
                                            : "text-red-600"
                                            }`}
                                    >
                                        Stock: {product.stock}
                                    </p>

                                </div>

                            </div>

                            <div className="flex gap-3">

                                <button
                                    onClick={() => {
                                        setEditingProduct(product)

                                        setFormData({
                                            name: product.name,
                                            price: product.price,
                                            image: product.image,
                                            description: product.description,
                                            category: product.category,
                                            stock: product.stock,
                                        })
                                    }}
                                    className="bg-black text-white px-5 py-2 uppercase tracking-[2px] text-xs"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => {
                                        if (
                                            window.confirm(
                                                "Delete this product?"
                                            )
                                        ) {
                                            deleteProduct(product._id)
                                        }
                                    }}
                                    className="border border-red-300 text-red-600 px-5 py-2 uppercase tracking-[2px] text-xs hover:bg-red-600 hover:text-white transition"
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    </div>

                ))}
            </div>
        </AdminLayout>
    )
}

export default Admin