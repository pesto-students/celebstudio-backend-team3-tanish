const Campaign = require('./../models/campaign_model');
const catchAsync = require('./../utils/catchAsync');
const Influencer = require('./../models/influencer_model');


exports.getProfile = catchAsync(async (req, res, next) => {

influencerId = req.body.id;
const influencer = await  Influencer.findById(influencerId);
const profile_details = {
    first_name : influencer.first_name,
    last_name : influencer.last_name,
    DOB :influencer.Date_of_Birth,
    email :influencer.email,
    contact : influencer.phone,
    facebook :{
        url : influencer.profile.facebook.ProfileUrl,
        fcount :influencer.profile.facebook.FollowerCount,
        cost :influencer.profile.facebook.PostCost
    },
    twitter :{
        url : influencer.profile.twitter.ProfileUrl,
        fcount :influencer.profile.twitter.FollowerCount,
        cost :influencer.profile.twitter.PostCost
    },
    instagram :{
        url : influencer.profile.instagram.ProfileUrl,
        fcount :influencer.profile.instagram.FollowerCount,
        cost :influencer.profile.instagram.PostCost
    }

    
}
res.status(201).json({
    status:'success',
    data:{
        profile : profile_details
    }
});

});

exports.updatePersonalDetails = catchAsync(async (req, res, next) => {

   const influencerId = req.body.id;
    let update = {};
   if (req.body.fname) update.first_name= req.body.fname;
   if (req.body.lname) update.last_name = req.body.lname;

    if(req.body.dob) update.Date_of_Birth= req.body.dob;
    console.log(update);
    //if (req.body.facebookurl) update['profile.facebook.ProfileUrl']= req.body.facebookurl;

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


exports.updateContact = catchAsync(async (req, res, next) => {
   const influencerId = req.body.id;
    let update = {};
   if (req.body.email) update.email= req.body.email;
   if (req.body.contact) update.phone = req.body.contact;

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


exports.updatePlatformDetails = catchAsync(async (req, res, next) => {
    const influencerId = req.body.id;
    let update = {};
     
    if (req.body.facebookurl) update['profile.facebook.ProfileUrl']= req.body.facebookurl;
    if (req.body.facebookFcount) update['profile.facebook.FollowerCount']= req.body.facebookFcount;
    if (req.body.facebookCost) update['profile.facebook.PostCost']= req.body.facebookCost;

    if (req.body.instagramurl) update['profile.instagram.ProfileUrl']= req.body.instagramurl;
    if (req.body.instagramFcount) update['profile.instagram.FollowerCount']= req.body.instagramFcount;
    if (req.body.instagramCost) update['profile.instagram.PostCost']= req.body.instagramCost;
    
    if (req.body.twitterurl) update['profile.twitter.ProfileUrl']= req.body.twitterurl;
    if (req.body.twitterFcount) update['profile.twitter.FollowerCount']= req.body.twitterFcount;
    if (req.body.twitterCost) update['profile.twitter.PostCost']= req.body.twitterCost;
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


exports.applyforCampaign = catchAsync(async (req, res, next) => {

});