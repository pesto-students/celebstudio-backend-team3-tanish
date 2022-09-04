const Campaign = require('./../models/campaign_model');
const catchAsync = require('./../utils/catchAsync');
const Influencer = require('./../models/influencer_model');


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

    campaignId= req.params.id;
    influencerId = req.body.influencer_id;
    message = req.body.message;
   // const campaign = await Campaign.findById(campaignId);
    
   const influencer_applied = await Influencer.findById(influencerId);
    
    const filter = {_id: campaignId};
    const filter1 ={ _id :influencerId ,'campaigns.campaign':campaignId};
    const update1 ={$addToSet: {
        campaigns: {message :message, applied:true} // need to add more filters
    }}
     const update = {
        $addToSet: {
            influencer_list: {influencer: influencerId}
        }
    }
    console.log(update);
    const campaign = await Campaign.findOneAndUpdate(filter, update, {new: true}, (err) => {
        if(err){
            console.log(err)
        }
    }) 
    const influencer = await Influencer.findOneAndUpdate(filter1, update1, {new: true}, (err) => {
        if(err){
            console.log(err)
        }
    }) 
    res.status(201).json({
        status:'success',
        data:{
            campaign : campaign,
            influencer: influencer
        }
    });


});

exports.eligible_campaigns = catchAsync(async (req, res, next) => {


});