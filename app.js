const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routes/routes');
const businessRouter = require('./routes/business_routes');

require('dotenv').config();
const CORS = require('cors');

const app = express();

app.use(CORS());


// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
//app.use(cookieParser());


app.use('/api/v1', userRouter);
app.use('/api/v1/business', businessRouter);


app.get("/",(request,response) => {
    response.status(200).json({message:"Hello from the server side", app : "celebstudio"});
})

module.exports = app;

