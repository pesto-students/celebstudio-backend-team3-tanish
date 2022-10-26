const express = require("express");
const campaignController = require("./../controllers/campaignController");
const idashboardController = require("./../controllers/idashboardController");
const bdashboardController = require("./../controllers/bdashboardController");

const router = express.Router();

router.post("/:id/apply", idashboardController.applyforCampaign);
router.patch("/:id/apply", idashboardController.applyforCampaign);
router.get("/:id/influencer-list", campaignController.campaignView);
router.post("/:id/select-influencer", bdashboardController.selectInfluencer);

router
  .route("/:id")
  .patch(campaignController.editCampaign)
  .delete(campaignController.deleteCampaign);

module.exports = router;
