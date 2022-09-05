const { decodeBase64 } = require('bcryptjs');
const Influencer = require('../models/influencer_model');
const Campaign = require('./../models/campaign_model');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');


exports.createCampaign = catchAsync(async (req, res, next) => {
    
    const newCampaign = await Campaign.create(req.body); 
   // await this.sendEligibleCampaigns(newCampaign._id);
    res.status(201).json({
        status:'success',
        data:{
            Campaign: newCampaign,
        }
    });

});


exports.editCampaign = catchAsync(async (req, res, next) =>{
    const campaign_id = req.params.id;
    let update = {};
   if (req.body.start_date) update.start_date= req.body.start_date;
   if (req.body.end_date) update.end_date = req.body.end_date;
   if (req.body.name) update.name = req.body.name;
   if (req.body.description) update.description = req.body.description;
   if (req.body.campaign_objective) update.campaign_objective = req.body.campaign_objective;
   console.log(update);
   const filter = { _id: campaign_id};
    let doc = await Campaign.findOneAndUpdate(filter, update, {
        new: true
      });
      res.status(200).json({
        status:'success',
        data:{
            profile : doc
        }
    });
    

});


exports.deleteCampaign = catchAsync(async (req, res, next) =>{
   const campaign = await Campaign.findByIdAndDelete(req.params.id);

     if (!campaign) {
      return next(new AppError('No campaign found with that ID', 404));
     }  
     
  res.status(204).json({
    status: 'success',
    data: null
  });

});


exports.getAllCampaigns = catchAsync(async (req, res, next) =>{

    const campaigns = await Campaign.find({});

    res.status(201).json({
        status:'success',
        data:{
            campaigns
        }
    });

}); 


exports.campaignView = catchAsync(async (req, res, next) => {
    campaign_id = req.params.id;
    
    const campaign = await Campaign.findById(campaign_id);
    const start_date = campaign.start_date;
    const start_date_ =(start_date.getDate()+
          "/"+(start_date.getMonth()+1)+
          "/"+start_date.getFullYear()
          )
    
    const current =new Date();
  console.log(start_date_);
   const current_date= current.getDate()+
    "/"+(current.getMonth()+1)+
    "/"+current.getFullYear();
    console.log(current_date);
    
     if(start_date_==current_date) { campaign.status = "launched"; }
   await campaign.save();  
   // Campaign.find({Posted:{$gt: Date("2012-10-01"), $lt:Date("2012-10-02")}}).where(start_date).equals()
     const platform = campaign.platform;
   const influencers = await Campaign.findOne({_id: campaign_id}).populate({path:'influencers.influencer',select:['first_name', `${platform}`]}).select('influencers').exec();
    res.status(201).json({
        status:'success',
        data:influencers,
        campaign:campaign
    });

});
