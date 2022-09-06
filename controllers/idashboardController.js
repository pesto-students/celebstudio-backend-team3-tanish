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

exports.campaigns = catchAsync(async (req, res, next) => {
    influencerId = req.params.id;
    const accept = "accept";
    const campaigns= await Campaign.find({'influencers.influencer':influencerId})
    .populate('business_id','company_name');
    //.populate('influencers','influencer.$.post_link');
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
  // const doc= await Campaign.findOne({ _id: campaignId,'influencers.influencer':influencerId}).exec();
    let doc = await Campaign.findOneAndUpdate(filter, update, {
        new: true
      });
      res.status(201).json({
        status:'success',
        data:doc
    });

});

exports.updateProfile = catchAsync(async (req, res, next) => {

   const influencerId = req.params.id;
    let update = {};
   if (req.body.first_name) update.first_name= req.body.first_name;
   if (req.body.last_name) update.last_name = req.body.last_name;
   if (req.body.email) update.email= req.body.email;
   if (req.body.phone) update.phone = req.body.phone;
   if(req.body.product_category) update.product_category= req.body.product_category;

    if(req.body.Date_of_Birth) update.Date_of_Birth= req.body.Date_of_Birth;
    if(req.body.facebook){
    if(req.body.facebook.url) update['facebook.url'] = req.body.facebook.url;
    if(req.body.facebook.url) update['facebook.isactive'] = true;
    if(req.body.facebook.follower_count) update['facebook.follower_count'] = req.body.facebook.follower_count;
    if(req.body.facebook.cost) update['facebook.cost'] = req.body.facebook.cost;
    }
    if(req.body.instagram){
    if(req.body.instagram.url) update['instagram.url'] = req.body.instagram.url;
    if(req.body.instagram.url) update['instagram.isactive'] = true;
    if(req.body.instagram.follower_count) update['instagram.follower_count'] = req.body.instagram.follower_count;
    if(req.body.instagram.cost) update['instagram.cost'] = req.body.instagram.cost;
    }
    if(req.body.twitter){
    if(req.body.twitter.url) update['twitter.url'] = req.body.twitter.url;
    if(req.body.twitter.url) update['twitter.isactive'] = true;
    if(req.body.twitter.follower_count) update['twitter.follower_count'] = req.body.twitter.follower_count;
    if(req.body.twitter.cost) update['twitter.cost'] = req.body.twitter.cost;
    }



    console.log(update);

    
    
    const filter = { _id: influencerId};
    let doc = await Influencer.findOneAndUpdate(filter, update, {
        new: true
      });
      res.status(201).json({
        status:'success',
        data:{
            profile : doc
        }
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
  if (influencer.facebook.isactive) 
  {platform = 'facebook';
  cost = influencer.facebook.cost;}
  if (influencer.instagram.isactive){
     platform = 'instagram';
     cost = influencer.instagram.cost;
     }
  if (influencer.instagram.isactive) {
    platform = 'twitter';
    cost = influencer.twitter.cost;
  }
  const campaigns = await Campaign.find()
  .where("platform").equals(platform)
  .where("product_category").equals(product_category)
  .where("budget").lte(cost).gt(0.8*cost);

// const campaigns = await Campaign.find()
//   .where("platform").equals(platform)
//   .where("product_category").equals(product_category);

  res.status(201).json({
    status:'success',
    data:{
        campaign : campaigns,
       
    }
});

});