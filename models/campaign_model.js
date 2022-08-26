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

status:{type: String, enum: ["pre-launced", 'launced'], default: 'pre-launched'}, 

product:{type:mongoose.Schema.ObjectId, ref:'Product'},

business: {
    type: mongoose.Schema.ObjectId,
    ref: 'Business',
    required: [true, 'campaign must belong to  a business']
  },

influencer:{
    type: mongoose.Schema.ObjectId,
    ref: 'Influencer',
    required: false
}

});

const Campaign = mongoose.model('Campaign', campaignSchema);

module.exports = Campaign;