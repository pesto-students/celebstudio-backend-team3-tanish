const Campaign = require('./../models/campaign_model');
const catchAsync = require('./../utils/catchAsync');


exports.createCampaign = catchAsync(async (req, res, next) => {
    const newCampaign = await Campaign.create({
        name:req.body.name, 

        start_date:req.body.start_date, 
        
        end_date:req.body.end_date, 
        
        description:req.body.description,   
        
        budget:req.body.budget, 
    
        
        productId: req.body.productId
    } ); 
    res.status(201).json({
        status:'success',
        data:{
            Campaign: newCampaign,
        }
    });

});


exports.viewCampaign = catchAsync(async (req, res, next) =>{

});


exports.deleteCampaign = catchAsync(async (req, res, next) =>{

});


exports.getAllCampaigns = catchAsync(async (req, res, next) =>{

    const campaigns = await Campaign.find({});
    res.status(201).json({
        status:'success',
        data:{
            Campaign: campaigns,
        }
    });

}); 