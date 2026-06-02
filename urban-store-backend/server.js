const dotenv = require("dotenv")
dotenv.config()

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Admin = require("./models/Admin")

const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const multer = require("multer")
const cloudinary = require("./config/cloudinary") 

const Product = require("./models/Product")
const Order = require("./models/Order")

console.log(
  "Cloud Name:",
  process.env.CLOUDINARY_CLOUD_NAME
)

console.log(
  "API Key:",
  process.env.CLOUDINARY_API_KEY
)

console.log("API Secret Exists:",
  !!process.env.CLOUDINARY_API_SECRET)

const app = express()

app.use(cors())
app.use(express.json())

const storage = multer.memoryStorage()
const upload = multer({ storage })

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

app.post(
  "/upload",
  upload.single("image"),
  async (req, res) => {
    try {
      const file = req.file

      const result = await cloudinary.uploader.upload(
        `data:${file.mimetype};base64,${file.buffer.toString("base64")}`
      )

      res.json({
        imageUrl: result.secure_url,
      })
    } catch (error) {
      console.log("UPLOAD ERROR:")
      console.log(error)

      res.status(500).json({
        message: error.message,
      })
    }
  }
)

app.post("/create-admin", async (req, res) => {
  try {
    const hashedPassword =
      await bcrypt.hash(
        req.body.password,
        10
      )

    const admin = new Admin({
      email: req.body.email,
      password: hashedPassword,
    })

    await admin.save()

    res.json({
      message: "Admin Created",
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
})

app.post("/admin-login", async (req, res) => {
  try {
    const admin =
      await Admin.findOne({
        email: req.body.email,
      })

    if (!admin) {
      return res.status(400).json({
        message: "Invalid Email",
      })
    }

    const isMatch =
      await bcrypt.compare(
        req.body.password,
        admin.password
      )

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Password",
      })
    }

    const token = jwt.sign(
      {
        adminId: admin._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    )

    res.json({
      token,
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
})

app.post("/orders", async (req, res) => {
  try {
    const order = new Order({
      customerName:
        req.body.customerName,

      email: req.body.email,

      phone: req.body.phone,

      address: req.body.address,

      items: req.body.items,

      totalAmount:
        req.body.totalAmount,
    })

    const savedOrder =
      await order.save()

    res.status(201).json(
      savedOrder
    )
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
})

app.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find()

    res.json(orders)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
})

app.put("/orders/:id", async (req, res) => {
  try {
    const updatedOrder =
      await Order.findByIdAndUpdate(
        req.params.id,
        {
          status: req.body.status,
        },
        {
          new: true,
        }
      )

    res.json(updatedOrder)
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
      category: req.body.category,
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
          category: req.body.category,
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