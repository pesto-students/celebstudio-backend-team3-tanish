const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Campaign = require("./campaign_model");
const InfluencerSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true, select: false },
    isInfluencer: { type: Boolean, default: true },
    active: { type: Boolean, required: true, default: true },
    phone: { type: String, required: false },
    Date_of_Birth: { type: Date, default: Date.now },
    img: { type: String, required: false },

    facebook: {
      isactive: { type: Boolean, default: false },
      url: { type: String, default: "" },
      follower_count: { type: Number, default: "" },
      cost: { type: Number, default: "" },
    },
    twitter: {
      isactive: { type: Boolean, default: false },
      url: { type: String, default: "" },
      follower_count: { type: Number, default: "" },
      cost: { type: Number, default: "" },
    },
    instagram: {
      isactive: { type: Boolean, default: false },
      url: { type: String, default: "" },
      follower_count: { type: Number, default: "" },
      cost: { type: Number, default: "" },
    },

    product_category: { type: Number, default: 0 },

    metrics: {
      post_share: { type: Number, default: 0 },
      earning: { type: Number, default: 0 },
      collabs: [String],
    },
  },
  { timestamps: true }
);

InfluencerSchema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});
InfluencerSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};
InfluencerSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

InfluencerSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

const Influencer = mongoose.model("Influencer", InfluencerSchema);
module.exports = Influencer;
