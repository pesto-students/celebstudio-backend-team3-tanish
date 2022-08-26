const mongoose = require("mongoose");
const Product = require("./product_model");

const ProfileSchema = new mongoose.Schema({
    followers: { type: Number},
    product_category_1: { 
        type: mongoose.Schema.ObjectId ,
        ref: "Product", required: false
    },
    product_category_2: {   type: mongoose.Schema.ObjectId ,
    ref: "Product", required: false},
})

const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;