const Campaign = require('./../models/campaign_model');
const catchAsync = require('./../utils/catchAsync');


exports.createCampaign = catchAsync(async (req, res, next) => {
    
    const newCampaign = await Campaign.create(req.body); 
    res.status(201).json({
        status:'success',
        data:{
            Campaign: newCampaign,
        }
    });

});


exports.editCampaign = catchAsync(async (req, res, next) =>{
    

});


exports.deleteCampaign = catchAsync(async (req, res, next) =>{

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