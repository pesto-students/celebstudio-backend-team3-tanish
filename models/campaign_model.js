const mongoose = require("mongoose");
const Business  = require('./business_model');
const Influencer = require('./influencer_model');



const campaignSchema = new mongoose.Schema({
name:{type: String, required: [true, 'name cannot be empty!']}, 

start_date:{type: Date,required: true}, 

end_date:{type: Date,required: true}, 

description:{type: String, required: [true, 'description cannot be empty!']},   

budget:{type: Number,required: true}, 

status:{type: String, enum: ["pre-launched", 'launched','closed'], default: 'pre-launched'}, 

product_category : {type: Number, required: [true, 'product_category cannot be empty!']}, 

campaign_objective : {type: String, required: true},

platform:{type: String, required: true, enum: ["facebook", "instagram", "twitter"]},

followers_count:{type: Number, required:false},

business_id : {type:mongoose.Schema.ObjectId,ref :'Business' ,required: true},

influencers:[{
influencer :{type:mongoose.Schema.ObjectId,ref :'Influencer', required: false},
message: {type:String, default:''},
applied: {type:Boolean, required:false},
status:{type:String, default:''},
post_link: {type:String, default:''}
}]


}, { timestamps: true });

const Campaign = mongoose.model('Campaign', campaignSchema);

module.exports = Campaign;