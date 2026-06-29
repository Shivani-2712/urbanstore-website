const mongoose = require("mongoose")

const settingsSchema = new mongoose.Schema(
    {
        storeName: {
            type: String,
            default: "UrbanStore",
        },

        email: {
            type: String,
            default: "admin@urbanstore.com",
        },

        phone: {
            type: String,
            default: "+91 9876543210",
        },

        address: {
            type: String,
            default: "Noida Sector 63",
        },

        logo: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model(
    "Settings",
    settingsSchema
)