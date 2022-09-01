const mongoose = require("mongoose");
const Product = require("./product_model");

const ProfileSchema = new mongoose.Schema({

    platform_details: { 
        facebook:{ProfileUrl:{type: String, default:null}, FollowerCount:{type: Number,default:null},PostCost:{type: Number,default:null} },
        twitter:{ProfileUrl:{type: String,default:null}, FollowerCount:{type: Number,default:null},PostCost:{type: Number,default:null}} , 
        instagram:{profileUrl:{type: String,default:null}, FollowerCount:{type: Number,default:null},PostCost:{type: Number,default:null}} },
    Date_of_Birth: { type: Date,default:null},
    product_category_1: { 
        type: String, enum: ["Fashion & Apparel", "Food & Beverages","Health & Wellness"," Pets" ,"Beauty", "Jewellery & Accessories"],default:null
    },
    product_category_2: { 
        type: String, enum: ["Fashion & Apparel", "Food & Beverages","Health & Wellness"," Pets" ,"Beauty", "Jewellery & Accessories"],default:null
    },
})

const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;