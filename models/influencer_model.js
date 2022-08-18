const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const Campaign = require('./campaign_model');
const Profile = require('./profile_model');
const InfluencerSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true , select:false },
        active: { type: Boolean, required: true, default: false },
        phone: { type: String, required: false },

        campaigns: {
            type: mongoose.Schema.ObjectId,
            ref: "Campaign",
            required: false,
        },
        
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

