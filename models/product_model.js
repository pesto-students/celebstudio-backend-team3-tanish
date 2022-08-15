const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    category:{type:"string",}
})


const Product = mongoose.model('Product', productSchema);

module.exports = Product;