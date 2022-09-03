const mongoose = require("mongoose");
const influencer = require('./influencer_model');




const influencerListSchema = new mongoose.Schema({
        campaignid :{type: String, required: false},
        influencerid :{type: String, required: false},
        influencer_message:{type: String, required: false},
        accepted:{type: Boolean, default: false},
        applied:{type: Boolean, default: false},
        post_link:{type: String, required: false},
    
});

const InfluencerList = mongoose.model('InfluencerList', influencerListSchema);
module.exports = InfluencerList;