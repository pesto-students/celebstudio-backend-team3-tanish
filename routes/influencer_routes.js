const express = require("express");

const authController = require("./../controllers/authController");
const campaignController = require("./../controllers/campaignController");
const idashboardController = require("./../controllers/idashboardController");

const router = express.Router();

router.get("/:id/campaigns", idashboardController.campaigns);
router.get("/:id/eligible-campaigns", idashboardController.eligible_campaigns);
router.patch("/:id", idashboardController.updateProfile);
router.post("/:id/post-link", idashboardController.post_link);
router.patch("/:id/change-password", authController.updatePasswordInfluencer);
router.get("/:id/applied-campaigns", idashboardController.applied_campaigns);
router.post(
  "/:id/upload-image",
  idashboardController.uploadImage,
  idashboardController.upload
);

module.exports = router;
