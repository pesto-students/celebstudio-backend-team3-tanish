const mongoose = require("mongoose");
const Product = require("./product_model");

const ProfileSchema = new mongoose.Schema({
    followers: { type: Number},
    product_category_1: { 
        type: [Schema.Types.ObjectId] ,
        ref: "Product",
    },
    product_category_2: {   type:[  Schema.Types.ObjectId] ,
    ref: "Product",},
})

const Profile = mongoose.model('Product', ProfileSchema);

module.exports = Profile;