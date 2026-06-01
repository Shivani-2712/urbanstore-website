const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: String,
    description: String,
    
    category: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model("Product", productSchema)