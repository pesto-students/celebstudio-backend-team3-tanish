const mongoose = require("mongoose");
const Product = require('./product_model');
const Business  = require('./business_model');
const Influencer = require('./influencer_model');

const campaignSchema = new mongoose.Schema({
name:{type: "string", required: [true, 'name cannot be empty!']}, 

start_date:{type: "date"}, 

end_date:{type: "date"}, 

description:{type: "string", required: [true, 'description cannot be empty!']},   

budget:{type: Number}, 

status:{type: String, enum: ["pre-launched", 'launced'], default: 'pre-launched'}, 

product_category : {type: String, required: [true, 'product_category cannot be empty!']}, 


campaign_objective : {type: String, required: true, enum: ["Brand awareness", " Acquiring customers"]},

platform_details:{type: String, required: false, enum: ["facebook", "instagram", "twitter"]},

followers_count:{type: Number, required:false},


business: {
    type: mongoose.Schema.ObjectId,
    ref: 'Business',
    required: false
},

influencer:{
    type: mongoose.Schema.ObjectId,
    ref: 'Influencer',
    required: false
}

});

const Campaign = mongoose.model('Campaign', campaignSchema);

module.exports = Campaign;