const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv")

const Product = require("./models/Product")

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected 🚀")
  })
  .catch((err) => {
    console.log(err)
  })

app.get("/", (req, res) => {
  res.send("Backend Running 🚀")
})

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
})

app.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)

    res.json(product)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
})

app.listen(process.env.PORT, () => {
  console.log(
    `Server running on port ${process.env.PORT}`
  )
})

app.delete("/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(
      req.params.id
    )

    res.json({
      message: "Product deleted"
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
})

app.post("/products", async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      image: req.body.image,
      description: req.body.description,
    })

    const savedProduct = await product.save()

    res.status(201).json(savedProduct)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
})

app.put("/products/:id", async (req, res) => {
  try {
    const updatedProduct =
      await Product.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name,
          price: req.body.price,
          image: req.body.image,
          description: req.body.description,
        },
        { new: true }
      )

    res.json(updatedProduct)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
})