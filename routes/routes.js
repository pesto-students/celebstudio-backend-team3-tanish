const express = require("express");

const authController = require("./../controllers/authController");
const campaignController = require("./../controllers/campaignController");

const router = express.Router();

router.post("/signup/business", authController.signupbusiness);
router.post("/signup/influencer", authController.signupinfluencer);
router.post("/login", authController.login);

router.post("/newCampaign", campaignController.createCampaign);

//router.post('applyforCampaign/:id',idashboardController.applyForCampaign);

module.exports = router;
