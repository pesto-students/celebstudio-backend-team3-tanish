const { request } = require('express');
const Campaign = require('./../models/campaign_model');
const Business = require('./../models/business_model');
const catchAsync = require('./../utils/catchAsync');


// get all campaigns created by the business
exports.getallCampaigns = catchAsync(async (req, res, next) => {

    const campaign_info = await Campaign.find({ business_id: req.params.id}).exec();

    res.status(201).json({
        status:'success',
        data:{
           campaign_info
        }
    });

});

// Get business profile 

exports.getProfile = catchAsync(async (req, res, next)=>{
    const business_id = req.params.id;
    const business = await Business.findById(business_id).exec();
    res.status(201).json({
        status:'success',
        data:{
            business
        }
    });

});


// Update business profile

exports.updateProfile = catchAsync(async (req, res, next) => {
    const business_id = req.params.id;
    let update = {};
   if (req.body.first_name) update.first_name= req.body.first_name;
   if (req.body.last_name) update.last_name = req.body.last_name;
   if (req.body.email) update.email = req.body.email;
   if (req.body.company_name) update.company_name = req.body.company_name;
   if (req.body.company_url) update.company_url = req.body.company_url;
   console.log(update);
   const filter = { _id: business_id};
    let doc = await Business.findOneAndUpdate(filter, update, {
        new: true
      });
      res.status(201).json({
        status:'success',
        data:{
            profile : doc
        }
    });


});


exports.selectInfluencer = catchAsync(async (req, res, next) => {
   const influencerId = req.body.influencer_id;
   const  campaignId = req.params.id;
   const status= req.body.status;
    const filter = { _id: campaignId,'influencers.influencer':mongoose.Types.ObjectId(influencerId)};
    const update = {'influencers.$.status':status}
  // const doc= await Campaign.findOne({ _id: campaignId,'influencers.influencer':influencerId}).exec();
    let doc = await Campaign.findOneAndUpdate(filter, update, {
        new: true
      });
      res.status(201).json({
        status:'success',
        data:doc
      });

});