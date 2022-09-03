const express = require('express');

const authController = require('./../controllers/authController');
const campaignController = require('./../controllers/campaignController');
const idashboardController = require('./../controllers/idashboardController');

const router = express.Router();

router.post('/signup/business', authController.signupbusiness);
router.post('/signup/influencer', authController.signupinfluencer);
router.post('/login', authController.login);

router.post('/newCampaign',campaignController.createCampaign);
router.get('/getAllCampaigns', campaignController.getAllCampaigns);

router.get('/getProfile/:id', idashboardController.getProfile);
router.patch('/updatePersonalDetails',idashboardController.updatePersonalDetails);
router.post('/updateContact',idashboardController.updateContact);
router.post('/updatePlatformDetails', idashboardController.updatePlatformDetails);
//router.post('applyforCampaign/:id',idashboardController.applyForCampaign);


module.exports = router;
