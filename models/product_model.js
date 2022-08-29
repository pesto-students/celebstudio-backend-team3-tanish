const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    category:{type:"string",}
})


const Product = mongoose.model('Product', productSchema);

module.exports = Product;