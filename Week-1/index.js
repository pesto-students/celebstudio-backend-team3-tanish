const express = require('express');
const CORS = require('cors');

const app = express();

app.use(CORS());

app.get("/login", (req,res) => {
    res.send("request landed on login endpoint");
    console.log("request landed on login endpoint");
}
)

app.get("/signup", (req,res) => {
    res.send("request landed at signup endpoint");
    console.log("request landed at signup endpoint");
}
)

app.listen(3030,() => {
    console.log("server started at 3030");
})
