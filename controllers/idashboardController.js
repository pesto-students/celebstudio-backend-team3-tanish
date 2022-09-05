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
    const campaigns= await Campaign.find({"influencers.influencer":influencerId,"influencers.status":"accept"}).populate('business_id','company_name').select('-influencers');
    res.status(201).json({
        status:'success',
        data:{
             campaigns
        }
        });
});

exports.post_link = catchAsync(async (req, res, next) => { 
    influencerId = req.body.influencer_id;
    campaignId = req.params.id;
    post_link = req.body.post_link;
    const filter = { _id: campaignId,'influencers.influencer':mongoose.Types.ObjectId(influencerId)};
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
   if (req.body.fname) update.first_name= req.body.fname;
   if (req.body.lname) update.last_name = req.body.lname;
   if (req.body.email) update.email= req.body.email;
   if (req.body.contact) update.phone = req.body.contact;

    if(req.body.dob) update.Date_of_Birth= req.body.dob;
    if(req.body.furl) update['facebook.url'] = req.body.furl;
    if(req.body.furl) update['facebook.isactive'] = true;
    if(req.body.ffcount) update['facebook.follower_count'] = req.body.ffcount;
    if(req.body.fcost) update['facebook.cost'] = req.body.fcost;

    if(req.body.iurl) update['instagram.url'] = req.body.iurl;
    if(req.body.iurl) update['instagram.isactive'] = true;
    if(req.body.ifcount) update['instagram.follower_count'] = req.body.ifcount;
    if(req.body.icost) update['instagram.cost'] = req.body.icost;

    if(req.body.turl) update['twitter.url'] = req.body.turl;
    if(req.body.turl) update['twitter.isactive'] = true;
    if(req.body.tfcount) update['twitter.follower_count'] = req.body.tfcount;
    if(req.body.tcost) update['twitter.cost'] = req.body.tcost;



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
  if (influencer.facebook.isactive) platform = 'facebook';
  const campaigns = await Campaign.find().where("platform").equals(platform);

  res.status(201).json({
    status:'success',
    data:{
        campaign : campaigns,
       
    }
});

});