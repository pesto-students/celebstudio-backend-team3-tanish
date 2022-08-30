const mongoose = require("mongoose");
const Product = require('./product_model');
const Business  = require('./business_model');
const Influencer = require('./influencer_model');

const campaignSchema = new mongoose.Schema({
name:{type: "string", required: [true, 'name cannot be empty!']}, 

start_date:{type: "date"}, 

end_date:{type: "date"}, 

description:{type: "string", required: [true, 'description cannot be empty!']},   

budget:{type: String, enum: ['0-10,000', '10,000-50000','>50,000'], default: '0-10,000'}, 

status:{type: String, enum: ["pre-launched", 'launced'], default: 'pre-launched'}, 

productId:{type: Number, required: true},

//product:{type:mongoose.Schema.ObjectId, ref:'Product'},

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