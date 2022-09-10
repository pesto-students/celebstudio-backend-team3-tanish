const Campaign = require("./../models/campaign_model");
const catchAsync = require("./../utils/catchAsync");
const Influencer = require("./../models/influencer_model");
const multer = require("multer");
const mongoose = require("mongoose");

exports.getProfile = catchAsync(async (req, res, next) => {
  influencerId = req.params.id;
  const influencer = await Influencer.findById(influencerId);

  res.status(201).json({
    status: "success",
    data: {
      profile: influencer,
    },
  });
});

exports.updateProfile = catchAsync(async (req, res, next) => {
  const influencerId = req.params.id;
  const filter = { _id: influencerId };
  let doc = await Influencer.findOneAndUpdate(filter, req.body, {
    new: true,
  });
  res.status(201).json({
    status: "success",
    data: {
      profile: doc,
    },
  });
});

exports.campaigns = catchAsync(async (req, res, next) => {
  influencerId = req.params.id;
  const influencer = await Influencer.findById(influencerId);
  let platform = 0;
  if (influencer.facebook.isactive) platform = platform + 1;
  if (influencer.instagram.isactive) platform = platform + 1;
  if (influencer.twitter.isactive) platform = platform + 1;
  let collabs = influencer.metrics.collabs;
  const unique = (value, index, self) => {
    return self.indexOf(value) === index;
  };

  const uniquebs = collabs.filter(unique);

  collabs = uniquebs.length;
  const post_share = influencer.metrics.post_share;
  const earnings = influencer.metrics.earnings;

  const accept = "accept";
  const campaigns = await Campaign.find(
    {
      influencers: { $elemMatch: { status: accept, influencer: influencerId } },
    },
    { "influencers.$": 1 }
  )
    .populate("business_id", "company_name")
    .select("name")
    .select("description")
    .select("start_date")
    .select("end_date")
    .select("campaign_objective")
    .select("platform");
  res.status(201).json({
    status: "success",
    data: {
      campaigns,
      platform,
      post_share,
      collabs,
      earnings,
    },
  });
});

exports.post_link = catchAsync(async (req, res, next) => {
  influencerId = req.params.id;
  campaignId = req.body.campaign_id;
  post_link = req.body.post_link;
  const influencer = await Influencer.findById(influencerId);
  const post_share = influencer.metrics.post_share;
  influencer.metrics.post_share = cost + post_share;
  await influencer.save();
  const filter = { _id: campaignId, "influencers.influencer": influencerId };
  const update = { "influencers.$.post_link": post_link };

  let doc = await Campaign.findOneAndUpdate(filter, update, {
    new: true,
  });
  res.status(201).json({
    status: "success",
    data: doc,
  });
});

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `image-${Date.now()}.${ext}`);
  },
});
// const isImage = (req, file, cb) => {
//   if (file.mimeType.startsWith("image")) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only images are allowed"));
//   }
// };
const upload = multer({
  dest: "public/",
  storage: multerConfig,

  //fileFilter: isImage,
});

exports.uploadImage = upload.single("photo");

exports.upload = catchAsync(async (req, res, next) => {
  const data = req.file;
  console.log(data);
  const filter = { _id: req.params.id };
  let doc = await Influencer.findOneAndUpdate(
    filter,
    { img: req.file.path },
    {
      new: true,
    }
  );
  res.status(201).json({
    status: "success",
    data: {
      message: "successfully uploaded image",
      profile: doc,
    },
  });
});

exports.applyforCampaign = catchAsync(async (req, res, next) => {
  campaignId = req.params.id;
  influencerId = req.body.influencer_id;
  message = req.body.message;

  const filter = { _id: campaignId };
  const update = {
    $addToSet: {
      influencers: {
        influencer: influencerId,
        message: message,
        applied: true,
      },
    },
  };
  console.log(update);
  const campaign = await Campaign.findOneAndUpdate(
    filter,
    update,
    { new: true },
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
  const influencer = await Campaign.find(
    { influencers: { $elemMatch: { influencer: influencerId } } },
    { "influencers.$": 1 }
  );
  console.log(influencer);
  res.status(201).json({
    status: "success",
    data: influencer,
  });
});

exports.eligible_campaigns = catchAsync(async (req, res, next) => {
  const influencerId = req.params.id;

  const influencer = await Influencer.findById(influencerId);
  const product_category = influencer.product_category;

  let all_campaigns = Array();

  if (influencer.facebook.isactive) {
    platform = "facebook";
    cost = influencer.facebook.cost;
    const campaigns = await Campaign.find()
      .where("platform")
      .equals(platform)
      .where("product_category")
      .equals(product_category)
      .where("influencers.influencer")
      .ne(influencerId);
    //.where("budget").lte(cost).gt(0.8*cost);
    all_campaigns = campaigns;
  }
  if (influencer.twitter.isactive) {
    platform = "twitter";
    cost = influencer.twitter.cost;
    const campaigns2 = await Campaign.find()
      .where("platform")
      .equals(platform)
      .where("product_category")
      .equals(product_category)
      .where("influencers.influencer")
      .ne(influencerId);
    //.where("budget").lte(cost).gt(0.8*cost);
    all_campaigns = all_campaigns.concat(campaigns2);
  }

  if (influencer.instagram.isactive) {
    platform = "instagram";
    cost = influencer.twitter.cost;
    const campaigns3 = await Campaign.find()
      .where("platform")
      .equals(platform)
      .where("product_category")
      .equals(product_category)
      .where("influencers.influencer")
      .ne(influencerId);
    //.where("budget").lte(cost);
    all_campaigns = all_campaigns.concat(campaigns3);
  }

  res.status(201).json({
    status: "success",
    data: {
      campaign: all_campaigns,
    },
  });
});

exports.applied_campaigns = catchAsync(async (req, res, next) => {
  influencerId = req.params.id;
  const accept = "accept";
  const campaigns = await Campaign.find({
    influencers: { $elemMatch: { applied: true, influencer: influencerId } },
  }).populate("business_id", "company_name");
  res.status(201).json({
    status: "success",
    data: {
      campaigns,
    },
  });
});
