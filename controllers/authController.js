const Influencer = require("./../models/influencer_model");
const Business = require("./../models/business_model");
const catchAsync = require("./../utils/catchAsync");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Campaign = require("../models/campaign_model");
const AppError = require("./../utils/appError");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signupinfluencer = catchAsync(async (req, res) => {
  const newInfluencer = await Influencer.create({
    first_name: req.body.fname,
    last_name: req.body.lname,
    phone: req.body.cno,
    email: req.body.email,
    password: req.body.password,
  });

  res.status(201).json({
    status: "success",
    data: {
      Influencer: newInfluencer,
    },
  });
});

exports.signupbusiness = catchAsync(async (req, res) => {
  const newBusiness = await Business.create({
    first_name: req.body.fname,
    last_name: req.body.lname,
    company_name: req.body.cname,
    company_url: req.body.curl,
    email: req.body.email,
    password: req.body.password,
  });
  res.status(201).json({
    status: "success",
    data: {
      Business: newBusiness,
    },
  });
});

exports.login = catchAsync(async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email, password);
  //check if email and password are entered
  if (!email || !password) {
    res.status(400).json({
      status: "error",
      message: "Please enter both email and password",
    });
  } else {
    let user;
    if (await Influencer.exists({ email: email })) {
      user = await Influencer.findOne({ email: email }).select("+password");
    } else if (await Business.exists({ email: email })) {
      user = await Business.findOne({ email: email }).select("+password");
    }
    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(400).json({
        status: "error",
        message: "Please enter a valid email and password",
      });
    } else {
      const token = signToken(user._id);
      const user_type = user.isInfluencer ? "Influencer" : "Business";
      console.log(user._id);
      res.status(200).json({
        status: "success",
        token,
        user_type: user_type,
        user: user,
      });
    }
  }
});

exports.updatePasswordInfluencer = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await Influencer.findById(req.params.id).select("+password");

  // 2) Check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError("Your current password is wrong.", 401));
  }

  // 3) If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  const token = signToken(user._id);
  // 4) Log user in, send JWT
  res.status(200).json({
    status: "success",
    token,
  });
});

exports.updatePasswordBusiness = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await Business.findById(req.params.id).select("+password");

  // 2) Check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError("Your current password is wrong.", 401));
  }

  // 3) If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  const token = signToken(user._id);
  // 4) Log user in, send JWT
  res.status(200).json({
    status: "success",
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await Influencer.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again.", 401)
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});
