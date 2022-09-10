const express = require("express");

const authController = require("./../controllers/authController");
const bdashboardController = require("./../controllers/bdashboardController");

const router = express.Router();

router
  .route("/:id")
  .get(bdashboardController.getProfile)
  .patch(bdashboardController.updateProfile);
router.get("/:id/campaigns", bdashboardController.getallCampaigns);
router.patch("/:id/change-password", authController.updatePasswordBusiness);

module.exports = router;
