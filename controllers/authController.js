const Influencer = require('./../models/influencer_model');
const catchAsync= require('./../utils/catchAsync');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');



const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });
  };

exports.signup  = catchAsync(async( req, res) => { 
    // const newInfluencer = await Influencer.create({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password,
        
    //   });
    console.log(req.body);
     const newInfluencer = await Influencer.create(req.body)
   
    res.status(201).json({
        status:'success',
        data:{
            Influencer : newInfluencer
        }
    });
});


exports.login = catchAsync(async( req, res ) => { 
    const email= req.body.email;
    const password= req.body.password;
//check if email and password are entered
    if(!email || !password) {
        res.status(400).json({
            status: 'error',
            message: 'Please enter both email and password'
          });
        }
        else{
            const influencer = await Influencer.findOne({email: email}).select('+password');   
         
            if(!influencer || !(await bcrypt.compare(password,influencer.password ))){
            res.status(400).json({
                status: 'error',
                message: 'Please enter a valid email and password'
          });
          }  else{
        const token = signToken(influencer._id);
        res.status(200).json({
            status:'success',
            token
        })
    
    }
}                     

});


exports.protect = catchAsync(async (req, res, next) => {
    // 1) Getting token and check of it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }
  
    if (!token) {
      return next(
        new AppError('You are not logged in! Please log in to get access.', 401)
      );
    }
  
    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    
});  