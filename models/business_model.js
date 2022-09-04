const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const Campaigns = require('./campaign_model');
const BusinessSchema = new mongoose.Schema(
    {
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        company_name: { type: String, required: true },
        company_url: { type: String, required: true },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true , select:false },
        isInfluencer: { type: Boolean, default: false},
        active: { type: Boolean, required: true, default: true },
        img :{ type: String, required: false}

             
    },
    { timestamps: true }
);


BusinessSchema.pre("save", async function (next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});
BusinessSchema.methods.isValidPassword = async function (password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
};

const Business = mongoose.model('Business', BusinessSchema);

module.exports = Business;