require('dotenv').config();
const bcrypt = require('bcrypt');
const signupQueryHandler = require('../queryHandler/signupQuery');
const jwt = require('jsonwebtoken');



async function handleInfluencerLogin(req,res) {
    //get username and password from db store
    //it in the user 
    const user = {}
    if(user.userid === null){
        res.code(400).send();
    }
    try{
        if(bcrypt.compare(req.body.password,user.password )){
            //get userid and name and usertype from the db.
            //code to be added in the handler file
            const user = {}
            const accessToken = jwt.sign(user,process.env.ACCESS_SECRET_TOKEN);
            res.send({accessToken:accessToken});
        }else{
            res.code(403).send("Please enter the correct password");
        }
    }
    catch(err) {
        res.send(`err: ${err}`);
    }
   

}

async function handleBusinessLogin(req,res) {
     //get username and password from db store
    //it in the user 
    const user = {}
    if(user.userid === null){
        res.code(400).send();
    }
    try{
        if(bcrypt.compare(req.body.password,user.password )){
            
        }else{
            res.code(403).send("Please enter the correct password");
        }
    }
    catch(err) {
        res.send(`err: ${err}`);
    }
   
}

module.exports = {
    handleBusinessLogin,
    handleInfluencerLogin,
}