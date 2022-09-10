const { request } = require("express");
const Campaign = require("./../models/campaign_model");
const Business = require("./../models/business_model");
const Influencer = require("./../models/influencer_model");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

// get all campaigns created by the business
exports.getallCampaigns = catchAsync(async (req, res, next) => {
  const campaign_info = await Campaign.find({
    business_id: req.params.id,
  }).exec();
  if (!campaign_info) {
    return next(new AppError("No Campaign found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      campaign_info,
    },
  });
});

// Get business profile

exports.getProfile = catchAsync(async (req, res, next) => {
  const business_id = req.user.id;
  const business = await Business.findById(business_id).exec();
  res.status(201).json({
    status: "success",
    data: {
      business,
    },
  });
});

// Update business profile

exports.updateProfile = catchAsync(async (req, res, next) => {
  const business_id = req.params.id;
  const filter = { _id: business_id };
  let doc = await Business.findOneAndUpdate(filter, req.body, {
    new: true,
  });
  res.status(201).json({
    status: "success",
    data: {
      profile: doc,
    },
  });
});

exports.selectInfluencer = catchAsync(async (req, res, next) => {
  const influencerId = req.body.influencer_id;
  const campaignId = req.params.id;
  const status = req.body.status;
  let cost;

  const influencer = await Influencer.findById(influencerId).select(
    "+password"
  );

  const campaign = await Campaign.findById(campaignId);

  platform = campaign.platform;
  if (platform == "facebook") cost = influencer.facebook.cost;
  if (platform == "twitter") cost = influencer.twitter.cost;
  if (platform == "instagram") cost = influencer.instagram.cost;

  const earning = influencer.metrics.earning;

  influencer.metrics.earning = parseInt(cost) + earning;

  const collabs = influencer.metrics.collabs;

  collabs.push(String(campaignId));

  influencer.metrics.collabs = collabs;

  await influencer.save();

  const filter = { _id: campaignId, "influencers.influencer": influencerId };
  const update = { "influencers.$.status": status, "influencers.$.cost": cost };
  let doc = await Campaign.findOneAndUpdate(filter, update, {
    new: true,
  });
  res.status(201).json({
    status: "success",
    data: doc,
  });
});
