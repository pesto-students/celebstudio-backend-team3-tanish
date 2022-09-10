const express = require("express");

const bodyParser = require("body-parser");
const userRouter = require("./routes/routes");
const businessRouter = require("./routes/business_routes");
const campaignRouter = require("./routes/campaign_routes");
const influencerRouter = require("./routes/influencer_routes");
require("dotenv").config();
const CORS = require("cors");

const app = express();

app.use(CORS());
////
app.use(express.static("public"));
//////

///app.use("/public", express.static("public"));
// Body parser, reading data from body into req.body
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
//app.use(cookieParser());

app.use("/api/v1", userRouter);
app.use("/api/v1/business", businessRouter);
app.use("/api/v1/campaign", campaignRouter);
app.use("/api/v1/influencer", influencerRouter);

app.get("/", (request, response) => {
  response
    .status(200)
    .json({ message: "Hello from the server side", app: "celebstudio" });
});
module.exports = app;
