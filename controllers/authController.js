const Influencer = require('./../models/influencer_model');
const Business= require('./../models/business_model');
const catchAsync= require('./../utils/catchAsync');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');



const signToken = (id)=> {
    return jwt.sign({ id}, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });
  };

exports.signupinfluencer  = catchAsync(async( req, res) => { 
    const newInfluencer = await Influencer.create({
        first_name: req.body.fname,
        last_name: req.body.lname,
        phone: req.body.cno,
        email: req.body.email,
        password: req.body.password,
        
      })
   
    res.status(201).json({
        status:'success',
        // data:{
        //     Influencer : newInfluencer
        // }
    });
});

exports.signupbusiness  = catchAsync(async( req, res) => { 
  const newBusiness = await Business.create({
      first_name: req.body.fname,
      last_name: req.body.lname,
      company_name: req.body.cname,
      company_url: req.body.curl,
      email: req.body.email,
      password: req.body.password,
      
    })
  // const newInfluencer = await Influencer.create(req.body)
 
  res.status(201).json({
      status:'success',
      // data:{
      //     Business : newBusiness,
      // }
  });
});


exports.login = catchAsync(async( req, res ) => { 
    const email= req.body.email;
    const password= req.body.password;
    console.log(email, password);
//check if email and password are entered
    if(!email || !password) {
        res.status(400).json({
            status: 'error',
            message: 'Please enter both email and password'
          });
        }
        else{
          let usertype;
         // console.log(await Influencer.exists({email: email}));
          //console.log(await Business.exists({email: email}));
              if(await Influencer.exists({email: email})){
                
                usertype = await Influencer.findOne({email: email}).select('+password'); 
              }
            else if (await Business.exists({email: email})){
             
              usertype = await Business.findOne({email: email}).select('+password'); 
            }
            console.log(usertype);
            
         
            if(!usertype || !(await bcrypt.compare(password,usertype.password ))){
            res.status(400).json({
                status: 'error',
                message: 'Please enter a valid email and password'
          });
          }  else{
        const token = signToken(usertype._id);
        const user_type = usertype.isInfluencer ? 'Influencer' : 'Business'; 
        console.log(usertype._id);
        res.status(200).json({
            status:'success',
            token,
            user_type: user_type,
            user: usertype
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