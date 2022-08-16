const express = require('express');
require('dotenv').config();
const CORS = require('cors');
const signupRoute = require('./router/signupRouter');
const loginRoute = require('./router/loginRouter');
const app = express();

app.use(CORS());
app.use(express.json());


app.get("/", (req,res) => {
    res.send("request home");
    console.log("request home");
}
)

//app.use("/signup", signupRoute);

app.use("/login", loginRoute);
app.listen(process.env.PORT || 8000,() => {
    console.log("server started at 3030");
})
