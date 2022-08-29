const express = require('express');
require('dotenv').config();
const CORS = require('cors');

const app = express();

app.use(CORS());


app.get("/", (req,res) => {
    res.send("request home");
    console.log("request home");
}
)

app.get("/businessLogin", (req,res) => {
    res.send("business signup page")
    console.log("business signup page")
})

app.get("/influencerLogin", (req,res) => {
    res.send("influencer signup page")
    console.log("influencer signup page")
})


app.get("/signup", (req,res) => {
    res.send("request landed at signup endpoint");
    console.log("request landed at signup endpoint");
}
)

app.listen(process.env.PORT || 5050,() => {
    console.log("server started at 3030");
})
