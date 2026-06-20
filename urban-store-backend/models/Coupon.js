const mongoose = require("mongoose")

const couponSchema = new mongoose.Schema(
    {
        code: {
            type: String,
            required: true,
            unique: true,
        },

        discount: {
            type: Number,
            required: true,
        },

        minimumOrder: {
            type: Number,
            default: 0,
        },

        usageLimit: {
            type: Number,
            default: 100,
        },

        usedCount: {
            type: Number,
            default: 0,
        },

        active: {
            type: Boolean,
            default: true,
        },

        expiryDate: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model(
    "Coupon",
    couponSchema
)