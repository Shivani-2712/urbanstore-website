const mongoose = require("mongoose")

const reviewSchema =
    new mongoose.Schema(
        {
            productId: {
                type:
                    mongoose.Schema.Types.ObjectId,

                ref: "Product",

                required: true,
            },

            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },

            userName: {
                type: String,
                required: true,
            },

            rating: {
                type: Number,
                required: true,
            },

            comment: {
                type: String,
                required: true,
            },

            verifiedBuyer: {
                type: Boolean,
                default: false,
            },
        },
        {
            timestamps: true,
        }
    )

module.exports =
    mongoose.model(
        "Review",
        reviewSchema
    )