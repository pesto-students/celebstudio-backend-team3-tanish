const express = require('express');

const authController = require('./../controllers/authController');
const campaignController = require('./../controllers/campaignController');
const idashboardController = require('./../controllers/idashboardController');

const router = express.Router();

router.post('/:id/apply', idashboardController.applyforCampaign);
router
  .route('/:id')
  .get(campaignController.campaignView)
  .patch(campaignController.editCampaign)
  .delete(campaignController.deleteCampaign);

module.exports = router;