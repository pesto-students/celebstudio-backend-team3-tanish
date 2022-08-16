const mongoose = require('mongoose')
require('dotenv').config();
const url = process.env.DATABASE;

console.log(process.env.DATABASE)
const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}

mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })


async function businessSignUpQuery(){

}

async function influencerSignUpQuery(){

}

module.exports = {
    businessSignUpQuery,
    influencerSignUpQuery,
}