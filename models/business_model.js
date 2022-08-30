const mongoose = require("mongoose");
const Campaigns = require('./campaign_model');
const profile = require('./profile_model');
const BusinessSchema = new mongoose.Schema(
    {
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        company_name: { type: String, required: true },
        company_url: { type: String, required: true },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true , select:false },
        isInfluencer: { type: Boolean, default: false},
        active: { type: Boolean, required: true, default: false },
        

             
    },
    { timestamps: true }
);

const Business = mongoose.model('Business', BusinessSchema);

module.exports = Business;