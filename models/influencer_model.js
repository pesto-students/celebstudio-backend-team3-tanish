const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const Campaign = require('./campaign_model');
const Profile = require('./profile_model');
const InfluencerSchema = new mongoose.Schema(
    {
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true , select:false },
        isInfluencer:{type: Boolean, default: true},
        active: { type: Boolean, required: true, default: true },
        phone: { type: String, required: false },

        campaigns: {
            type: mongoose.Schema.ObjectId,
            ref: "Campaign",
            required: false,
        },

        profile:{
            facebook:{ProfileUrl:{type: String, default:''}, FollowerCount:{type: Number,default:''},PostCost:{type: Number,default:''} },
            twitter:{ProfileUrl:{type: String,default:''}, FollowerCount:{type: Number,default:''},PostCost:{type: Number,default:''}} , 
            instagram:{ProfileUrl:{type: String,default:''}, FollowerCount:{type: Number,default:''},PostCost:{type: Number,default:''}} },
            Date_of_Birth: { type: Date,default: Date.now },
        product_category_1: { 
            type: String, enum: ["Fashion & Apparel", "Food & Beverages","Health & Wellness"," Pets" ,"Beauty", "Jewellery & Accessories"],required: false
        },
        product_category_2: { 
            type: String, enum: ["Fashion & Apparel", "Food & Beverages","Health & Wellness"," Pets" ,"Beauty", "Jewellery & Accessories"],required: false
            
        }
        
    },
    { timestamps: true }
);



InfluencerSchema.pre("save", async function (next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});
InfluencerSchema.methods.isValidPassword = async function (password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
};


const Influencer = mongoose.model('Influencer', InfluencerSchema);
module.exports = Influencer;

