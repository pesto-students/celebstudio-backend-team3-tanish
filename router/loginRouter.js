const express = require('express');
const router = express.Router();
const handleLogin = require('../handler/loginHandler')


router.post('/influencer', handleLogin.handleInfluencerLogin )
router.post('/business', handleLogin.handleBusinessLogin )

module.exports = router;