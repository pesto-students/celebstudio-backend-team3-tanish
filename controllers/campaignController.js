const { decodeBase64 } = require('bcryptjs');
const Influencer = require('../models/influencer_model');
const Campaign = require('./../models/campaign_model');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');


exports.createCampaign = catchAsync(async (req, res, next) => {
    
    const newCampaign = await Campaign.create(req.body); 
    await this.sendEligibleCampaigns(newCampaign._id);
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
   console.log(update);
   const filter = { _id: campaign_id};
    let doc = await Campaign.findOneAndUpdate(filter, update, {
        new: true
      });
      res.status(201).json({
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
   
   console.log(campaign.influencer_list);
   // const influencers =  await campaign.influencer_list;
    //console.log(influencers);
    const doc = await Campaign.findOne({_id:campaign_id}).select("influencer_list");
    const ids = doc.influencer_list;
    const records = await Influencer.find().where('_id').in(ids).exec();
      //console.log(doc);
    res.status(201).json({
        status:'success',
        data:{
            records
        }
    });

});

exports.sendEligibleCampaigns = catchAsync(async (campaign_id) =>{
    const  campaign = await Campaign.findById(campaign_id);
    const platform = campaign.platform;
    console.log(platform);
    let influencers;
    if (platform=="facebook"){
         influencers = await Influencer.find({'profile.facebook.isactive':true}).select("_id").exec();
    }
   // const ids =influencers;
    
    const ids = influencers;
    let ids2 = ids.map(item => (item._id));
   console.log(ids2);
   // console.log(influencers);

   await Influencer.updateMany(
    {
        _id:
            {
                $in:
                    
                        ids2

                    
            }
    },
    {
        $addToSet: { campaigns:{campaign:campaign_id}  }

    }).exec();
    

});