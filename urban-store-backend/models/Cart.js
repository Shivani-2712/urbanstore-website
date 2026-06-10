const mongoose = require(
    "mongoose"
)

const cartSchema =
    new mongoose.Schema(
        {
            userId: {
                type: String,
                required: true,
            },

            productId: {
                type: String,
                required: true,
            },

            size: {
                type: String,
                default: "",
            },

            quantity: {
                type: Number,
                default: 1,
            },
        },
        {
            timestamps: true,
        }
    )

module.exports =
    mongoose.model(
        "Cart",
        cartSchema
    )