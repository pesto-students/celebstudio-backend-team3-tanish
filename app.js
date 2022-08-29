const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routes/routes');

require('dotenv').config();
const CORS = require('cors');

const app = express();

app.use(CORS());


// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
//app.use(cookieParser());


app.use('/users', userRouter);


app.get("/",(request,response) => {
    response.status(200).json({message:"Hello from the server side", app : "celebstudio"});
})

module.exports = app;

