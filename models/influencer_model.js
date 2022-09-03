const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const Campaign = require('./campaign_model');
const InfluencerSchema = new mongoose.Schema(
    {
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true , select:false },
        isInfluencer:{type: Boolean, default: true},
        active: { type: Boolean, required: true, default: true },
        phone: { type: String, required: false },
        Date_of_Birth: { type: Date,default: Date.now },
        profile_photo: { type: String, required: false },
        

        profile:{
            facebook:{ProfileUrl:{type: String, default:''}, FollowerCount:{type: Number,default:''},PostCost:{type: Number,default:''} },
            twitter:{ProfileUrl:{type: String,default:''}, FollowerCount:{type: Number,default:''},PostCost:{type: Number,default:''}} , 
            instagram:{ProfileUrl:{type: String,default:''}, FollowerCount:{type: Number,default:''},PostCost:{type: Number,default:''}} },
            
        
        product_category_1:{ type: Number, default: 0 },

        product_category_2:{ type: Number,default:0},

      
        
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

