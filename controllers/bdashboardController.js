const { request } = require('express');
const Campaign = require('./../models/campaign_model');
const Business = require('./models/business_model');
const catchAsync = require('./../utils/catchAsync');



exports.getallCampaigns = catchAsync(async (req, res, next) => {
    // 1) Get the currently booked tour

    const businessuser = Business.findOne({ userid: req.params.userID });

    const campaign_info = await Campaign.find({ user: businessuser}).exec();

    res.status(201).json({
        status:'success',
        data:{
           campaign_info
        }
    });

});