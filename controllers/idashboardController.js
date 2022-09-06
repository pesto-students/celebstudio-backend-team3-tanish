const Campaign = require('./../models/campaign_model');
const catchAsync = require('./../utils/catchAsync');
const Influencer = require('./../models/influencer_model');
const multer = require('multer');
const mongoose = require("mongoose");



exports.getProfile = catchAsync(async (req, res, next) => {

    influencerId = req.params.id;
    const influencer = await  Influencer.findById(influencerId);

    res.status(201).json({
    status:'success',
    data:{
        profile : influencer
    }
    });

});

exports.updateProfile = catchAsync(async (req, res, next) => {

    const influencerId = req.params.id;
     const filter = { _id: influencerId};
     let doc = await Influencer.findOneAndUpdate(filter, req.body, {
         new: true
       });
       res.status(201).json({
         status:'success',
         data:{
             profile : doc
         }
     });
     
     
 });


exports.campaigns = catchAsync(async (req, res, next) => {

    influencerId = req.params.id;
    const accept = "accept";
    const campaigns = await Campaign.find({"influencers":{$elemMatch:{'status':accept,'influencer':influencerId}}},{"influencers.$":1})
    .populate('business_id','company_name')
    .select("name").select("description").select("start_date")
    .select("end_date").select("campaign_objective").select("platform") ;
    res.status(201).json({
        status:'success',
        data:{
             campaigns
        }
        });
});

exports.post_link = catchAsync(async (req, res, next) => { 
    influencerId = req.params.id;
    campaignId = req.body.campaign_id;
    post_link = req.body.post_link;
    const filter = { _id: campaignId,'influencers.influencer':influencerId};
    const update = {'influencers.$.post_link':post_link}
  
    let doc = await Campaign.findOneAndUpdate(filter, update, {
        new: true
      });
      res.status(201).json({
        status:'success',
        data:doc
    });

});




exports.uploadPhoto= catchAsync(async (req, res, next) => {

    
            const data = req.file.filename;
            const contentType ='image/png';
            const filter = { _id: req.params.id};
            let doc = await Influencer.findOneAndUpdate(filter, {'img.data': data, 'img.contentType': contentType}, {
                new: true
              });
              res.status(201).json({
                status:'success',
                data:{
                    message: "successfully uploaded image",
                    profile : doc
                }
            });
        
        
   

});



 

 





exports.applyforCampaign = catchAsync(async (req, res, next) => {

    campaignId= req.params.id;
    influencerId = req.body.influencer_id;
    message = req.body.message;
    
    
    const filter = {_id: campaignId};
     const update = {
        $addToSet: {
            influencers: {influencer: influencerId, message: message}
        }
    }
    console.log(update);
    const campaign = await Campaign.findOneAndUpdate(filter, update, {new: true}, (err) => {
        if(err){
            console.log(err)
        }
    }) 
    res.status(201).json({
        status:'success',
        data:{
            campaign : campaign,
           
        }
    });


});

exports.eligible_campaigns = catchAsync(async (req, res, next) => {
     const influencerId = req.params.id;

  const influencer = await Influencer.findById(influencerId);
  const product_category = influencer.product_category;
 
  let all_campaigns = Array();
  if (influencer.facebook.isactive) 
  {platform = "facebook";
  cost = influencer.facebook.cost;
  const campaigns = await Campaign.find()
  .where("platform").equals(platform)
  .where("product_category").equals(product_category)
  .where("budget").lte(cost).gt(0.8*cost);
  all_campaigns.push(campaigns);
}
  if (influencer.instagram.isactive){
     platform="twitter";
     cost = influencer.instagram.cost;
     const campaigns2 = await Campaign.find()
  .where("platform").equals(platform)
  .where("product_category").equals(product_category)
  .where("budget").lte(cost).gt(0.8*cost);
  all_campaigns.push(campaigns2);
     }
  if (influencer.instagram.isactive) {
    platform="instagram";
    cost = influencer.twitter.cost;
    const campaigns3 = await Campaign.find()
    .where("platform").equals(platform)
  .where("product_category").equals(product_category)
  .where("budget").lte(cost).gt(0.8*cost);
  all_campaigns.push(campaigns3);
  }
  


  res.status(201).json({
    status:'success',
    data:{
        campaign : all_campaigns,
       
    }
});

});