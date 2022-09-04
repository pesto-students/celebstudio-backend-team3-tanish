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
        img: { type: String, required: false },
        
        
        profile:{
            facebook:{isactive:{type: Boolean,default: true},profileUrl:{type: String, default:''}, followerCount:{type: Number,default:''},postCost:{type: Number,default:''} },
            twitter:{isactive:{type: Boolean,default: false},profileUrl:{type: String,default:''}, followerCount:{type: Number,default:''},postCost:{type: Number,default:''}} , 
            instagram:{isactive:{type: Boolean,default: false},profileUrl:{type: String,default:''}, followerCount:{type: Number,default:''},postCost:{type: Number,default:''}} },
            
        
        product_category:{ type: Number, default: 0 },

        campaigns:[{
        campaign:{type:mongoose.Schema.ObjectId,ref :'Campaign', required: false},
        message:{type: String, required: false, default: ''},
        accepted:{type: Boolean, default: false},
        applied:{type: Boolean, default: false},
        post_link:{type: String, required: false,default: ''}}]
        
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

