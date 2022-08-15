const mongoose = require("mongoose");
const Product = require('./product_model');

const campaignSchema = new mongoose.Schema({
name:{type: "string", required: [true, 'name cannot be empty!']}, 

start_date:{type: "date"}, 

end_date:{type: "date"}, 

description:{type: "string", required: [true, 'description cannot be empty!']},   

budget:{type: Number}, 

status:{type: String, enum: ["open", 'closed', 'pending'], default: 'open'}, 

product:{type:mongoose.Schema.ObjectId, ref:'Product'}

});

const Campaign = mongoose.model('Campaign', campaignSchema);

module.exports = Campaign;