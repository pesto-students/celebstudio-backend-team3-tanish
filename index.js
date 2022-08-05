const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors);

app.get('/',(req,res) => {
    res.send("You have reached the home page");
})


app.listen((3000), () => {
    console.log("Server started 3000");
})