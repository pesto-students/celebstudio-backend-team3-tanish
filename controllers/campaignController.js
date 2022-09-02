const Campaign = require('./../models/campaign_model');
const catchAsync = require('./../utils/catchAsync');


exports.createCampaign = catchAsync(async (req, res, next) => {
    let obj
    if(req.body.obj === "acquire") obj= "Acquire Customer"
    const newCampaign = await Campaign.create({
        name:req.body.nameCamp, 

        start_date:req.body.start, 
        
        end_date:req.body.end, 
        
        description:req.body.campDesc,   
        
        budget:req.body.budget, 
        campaign_objective:req.body.campType,
        platform_details:req.body.platform,
        followers_count :req.body.fcount,
        product_category: req.body.prodCatagoryPri

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
            campaigns
        }
    });

}); 