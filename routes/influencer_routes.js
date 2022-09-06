const express = require('express');
const multer = require('multer');

const authController = require('./../controllers/authController');
const campaignController = require('./../controllers/campaignController');
const idashboardController = require('./../controllers/idashboardController');

const router = express.Router();

const Storage = multer.diskStorage({
    destination: "images",
    filename: (req, file, cb)=>{
        cb(null, file.originalname);
    },

});

const upload = multer({
    storage: Storage,

}).single('testImage')
 router.get('/:id/campaigns', idashboardController.campaigns);
 router.get('/:id/eligible-campaigns', idashboardController.eligible_campaigns);
 router.patch('/:id', idashboardController.updateProfile);
 router.post('/:id/post-link', idashboardController.post_link)
 



// router
// .route('/:id')
// .get(bdashboardController.getProfile)
// .patch(bdashboardController.updateProfile);
//router.post('/:id/uploadPhoto',upload.single('testImage'),idashboardController.uploadPhoto);
//.post('/update-password',userController.updatePassword)


module.exports = router;




