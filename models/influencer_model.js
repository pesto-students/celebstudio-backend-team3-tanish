const mongoose = require("mongoose");
const Campaign = require('./campaign_model');
const Profile = require('./profile_model');
const InfluencerSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        active: { type: Boolean, required: true, default: false },
        phone: { type: String, required: false },

        profile:{
            type: [Schema.Types.ObjectId],
            ref: "Profile",
            required: false,

        },
        
        campaigns: {
            type: [Schema.Types.ObjectId],
            ref: "Campaign",
            required: false,
        },
        
    },
    { timestamps: true }
);

const Influencer = mongoose.model('Influencer', InfluencerSchema);

module.exports = Influencer;