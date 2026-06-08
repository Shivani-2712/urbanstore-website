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
const Review = require("./models/Review")
const Order = require("./models/Order")
const User = require("./models/User")
const Wishlist = require("./models/Wishlist")
const Cart = require("./models/Cart")
const Razorpay = require("razorpay")

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

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret:
    process.env.RAZORPAY_KEY_SECRET,
})

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

      userId: req.body.userId,

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

app.get(
    "/admin/orders",
    async (req, res) => {
        try {

            const orders =
                await Order.find()
                    .sort({
                        createdAt: -1,
                    })

            res.json(orders)

        } catch (error) {

            res.status(500).json({
                message:
                    error.message,
            })

        }
    }
)

app.put(
    "/admin/orders/:id",
    async (req, res) => {
        try {

            const updatedOrder =
                await Order.findByIdAndUpdate(
                    req.params.id,
                    {
                        status:
                            req.body.status,
                    },
                    {
                        new: true,
                    }
                )

            res.json(
                updatedOrder
            )

        } catch (error) {

            res.status(500).json({
                message:
                    error.message,
            })

        }
    }
)

app.get(
    "/admin/stats",
    async (req, res) => {

        try {

            const totalOrders =
                await Order.countDocuments()

            const totalProducts =
                await Product.countDocuments()

            const totalUsers =
                await User.countDocuments()

            const orders =
                await Order.find()

            const totalRevenue =
                orders.reduce(
                    (sum, order) =>
                        sum +
                        order.totalAmount,
                    0
                )

            const recentOrders =
    await Order.find()
        .sort({
            createdAt: -1,
        })
        .limit(5)

res.json({
    totalOrders,
    totalProducts,
    totalUsers,
    totalRevenue,
    recentOrders,
})

        } catch (error) {

            res.status(500).json({
                message:
                    error.message,
            })

        }
    }
)

app.get(
  "/my-orders/:userId",
  async (req, res) => {
    try {
      const orders =
        await Order.find({
          userId:
            req.params.userId,
        }).sort({
          createdAt: -1,
        })

      res.json(orders)
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      })
    }
  }
)

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

app.post(
  "/create-payment-order",
  async (req, res) => {
    try {
      const options = {
        amount:
          req.body.amount * 100,
        currency: "INR",
        receipt:
          "receipt_" +
          Date.now(),
      }

      const order =
        await razorpay.orders.create(
          options
        )

      res.json(order)
    } catch (error) {
      res.status(500).json({
        message: error.message,
      })
    }
  }
)

app.post(
  "/register",
  async (req, res) => {
    try {
      const existingUser =
        await User.findOne({
          email:
            req.body.email,
        })

      if (existingUser) {
        return res
          .status(400)
          .json({
            message:
              "Email already exists",
          })
      }

      const hashedPassword =
        await bcrypt.hash(
          req.body.password,
          10
        )

      const user =
        new User({
          name:
            req.body.name,

          email:
            req.body.email,

          password:
            hashedPassword,
        })

      await user.save()

      res.json({
        message:
          "User Registered",
      })
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      })
    }
  }
)

app.post(
  "/login",
  async (req, res) => {
    try {
      const user =
        await User.findOne({
          email:
            req.body.email,
        })

      if (!user) {
        return res
          .status(400)
          .json({
            message:
              "Invalid Email",
          })
      }

      const isMatch =
        await bcrypt.compare(
          req.body.password,
          user.password
        )

      if (!isMatch) {
        return res
          .status(400)
          .json({
            message:
              "Invalid Password",
          })
      }

      const token =
        jwt.sign(
          {
            userId:
              user._id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn:
              "7d",
          }
        )

      res.json({
        token,

        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      })
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      })
    }
  }
)

app.put(
  "/update-profile/:id",
  async (req, res) => {
    try {
      const updatedUser =
        await User.findByIdAndUpdate(
          req.params.id,
          {
            phone:
              req.body.phone,

            address:
              req.body.address,
          },
          {
            new: true,
          }
        )

      res.json(updatedUser)
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      })
    }
  }
)

app.get(
  "/user/:id",
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.params.id
        )

      res.json(user)
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      })
    }
  }
)

app.post(
  "/reviews",
  async (req, res) => {
    try {

      const existingReview =
        await Review.findOne({
          productId:
            req.body.productId,

          userId:
            req.body.userId,
        })

      if (existingReview) {
        return res
          .status(400)
          .json({
            message:
              "You already reviewed this product",
          })
      }

      const orders =
    await Order.find({
        userId:
            req.body.userId,
    })

const hasPurchased =
    orders.some((order) =>
        order.items.some(
            (item) =>
                item._id?.toString() ===
                req.body.productId
        )
    )

      const review = new Review({
    productId:
        req.body.productId,

    userId:
        req.body.userId,

    userName:
        req.body.userName,

    rating:
        req.body.rating,

    comment:
        req.body.comment,

    verifiedBuyer:
        hasPurchased,
})
      const savedReview =
        await review.save()

      res.status(201).json(
        savedReview
      )

    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      })
    }
  }
)

app.get(
  "/reviews/:productId",
  async (req, res) => {
    try {
      const reviews =
        await Review.find({
          productId:
            req.params.productId,
        }).sort({
          createdAt: -1,
        })

      res.json(reviews)
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      })
    }
  }
)

app.get(
  "/can-review/:userId/:productId",
  async (req, res) => {
    try {
      const orders =
        await Order.find({
          userId:
            req.params.userId,
        })

      const hasPurchased =
        orders.some((order) =>
          order.items.some(
            (item) =>
              item._id?.toString() ===
              req.params.productId
          )
        )

      res.json({
        canReview:
          hasPurchased,
      })
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      })
    }
  }
)

app.get(
    "/can-review/:userId/:productId",
    async (req, res) => {
        try {
            const orders =
                await Order.find({
                    userId:
                        req.params.userId,
                })

            const hasPurchased =
                orders.some(
                    (order) =>
                        order.items.some(
                            (item) =>
                                item._id?.toString() ===
                                req.params.productId
                        )
                )

            res.json({
                canReview:
                    hasPurchased,
            })
        } catch (error) {
            res.status(500).json({
                message:
                    error.message,
            })
        }
    }
)

app.put(
  "/reviews/:id",
  async (req, res) => {
    try {
      const updatedReview =
        await Review.findByIdAndUpdate(
          req.params.id,
          {
            rating:
              req.body.rating,

            comment:
              req.body.comment,
          },
          {
            new: true,
          }
        )

      res.json(
        updatedReview
      )
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      })
    }
  }
)

app.post(
    "/wishlist",
    async (req, res) => {
        try {

            const exists =
                await Wishlist.findOne(
                    {
                        userId:
                            req.body.userId,

                        productId:
                            req.body.productId,
                    }
                )

            if (exists) {
                return res.json({
                    message:
                        "Already in wishlist",
                })
            }

            const wishlist =
                new Wishlist({
                    userId:
                        req.body.userId,

                    productId:
                        req.body.productId,
                })

            await wishlist.save()

            res.json({
                message:
                    "Added to wishlist",
            })

        } catch (error) {
            res.status(500).json({
                message:
                    error.message,
            })
        }
    }
)

app.get(
    "/wishlist/:userId",
    async (req, res) => {
        try {

            const wishlist =
                await Wishlist.find(
                    {
                        userId:
                            req.params.userId,
                    }
                )

            res.json(
                wishlist
            )

        } catch (error) {
            res.status(500).json({
                message:
                    error.message,
            })
        }
    }
)

app.delete(
    "/wishlist/:userId/:productId",
    async (req, res) => {
        try {

            await Wishlist.deleteOne({
                userId:
                    req.params.userId,

                productId:
                    req.params.productId,
            })

            res.json({
                message:
                    "Removed from wishlist",
            })

        } catch (error) {

            res.status(500).json({
                message:
                    error.message,
            })

        }
    }
)

app.post(
    "/cart",
    async (req, res) => {
        try {

            const existingItem =
                await Cart.findOne({
                    userId:
                        req.body.userId,

                    productId:
                        req.body.productId,
                })

            if (existingItem) {

                existingItem.quantity += 1

                await existingItem.save()

                return res.json(
                    existingItem
                )
            }

            const cart =
                new Cart({
                    userId:
                        req.body.userId,

                    productId:
                        req.body.productId,

                    quantity: 1,
                })

            await cart.save()

            res.json(cart)

        } catch (error) {

            res.status(500).json({
                message:
                    error.message,
            })

        }
    }
)

app.get(
    "/cart/:userId",
    async (req, res) => {
        try {

            const cart =
                await Cart.find({
                    userId:
                        req.params.userId,
                })

            res.json(cart)

        } catch (error) {

            res.status(500).json({
                message:
                    error.message,
            })

        }
    }
)

app.put(
    "/cart/:userId/:productId",
    async (req, res) => {
        try {

            const cartItem =
                await Cart.findOneAndUpdate(
                    {
                        userId:
                            req.params.userId,

                        productId:
                            req.params.productId,
                    },
                    {
                        quantity:
                            req.body.quantity,
                    },
                    {
                        new: true,
                    }
                )

            res.json(cartItem)

        } catch (error) {

            res.status(500).json({
                message:
                    error.message,
            })

        }
    }
)

app.delete(
    "/cart/clear/:userId",
    async (req, res) => {
        try {
          console.log(
                "CLEAR CART API HIT",
                req.params.userId
            )

            await Cart.deleteMany({
                userId:
                    req.params.userId,
            })

            res.json({
                message:
                    "Cart cleared",
            })

        } catch (error) {

            res.status(500).json({
                message:
                    error.message,
            })

        }
    }
)

app.delete(
    "/cart/:userId/:productId",
    async (req, res) => {
        try {

            await Cart.deleteOne({
                userId:
                    req.params.userId,

                productId:
                    req.params.productId,
            })

            res.json({
                message:
                    "Item removed",
            })

        } catch (error) {

            res.status(500).json({
                message:
                    error.message,
            })

        }
    }
)

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