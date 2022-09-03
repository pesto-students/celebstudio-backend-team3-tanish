const express = require('express');

const authController = require('./../controllers/authController');
const campaignController = require('./../controllers/campaignController');
const bdashboardController = require('./../controllers/bdashboardController');

const router = express.Router();




router
.route('/:id')
.get(bdashboardController.getProfile)
.patch(bdashboardController.updateProfile);
router.get('/:id/dashboard',bdashboardController.getallCampaigns);
//.post('/update-password',userController.updatePassword)


module.exports = router;