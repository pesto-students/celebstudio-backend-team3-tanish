const express = require('express');
const router = express.Router();
const handleLogin = require('../handler/signupHandler')


router.post('/influencer', handleLogin.handleInfluencerSignup )
router.post('/business', handleLogin.handleBusinessSignup )

module.exports = router;