const mongoose = require("mongoose");
const Campaigns = require('./campaign_model');
const profile = require('./profile_model');
const BusinessSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        active: { type: Boolean, required: true, default: false },
        phone: { type: String, required: false },

        campaigns: {
            type: [Schema.Types.ObjectId],
            ref: 'Campaign',
            required: false,
        },
        
    },
    { timestamps: true }
);

const Business = mongoose.model('Business', BusinessSchema);

module.exports = Business;