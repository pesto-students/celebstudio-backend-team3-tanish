const express = require('express');
const bcrypt = require('bcrypt');
const signupQueryHandler = require('../queryHandler/signupQuery');


async function handleInfluencerSignup(req,res) {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password,10);
        console.table(req.body);
        const user = {fname:req.body.fname,
            lname:req.body.lname,
            cno:req.body.cno,   
            email:req.body.email,  
           password:hashedPassword}
        await signupQueryHandler.influencerSignUpQuery(user);
        res.code(201).send("sign up successful");
    }
    catch(err) {
        res.send(`error: ${err}`);
    }
}


async function handleBusinessSignup(req,res) {
    try{
        const hashPassword = await bcrypt.hash(req.body.password,10);
        console.table(req.body);
        const user = {fname:req.body.fname,lname:req.body.lname,company:req.body.cname,CompanyUrl:req.body.curl,email:req.body.email,password:hashPassword}
        await signupQueryHandler.businessSignUpQuery(user);
        res.code(201).send("signup successful");
    }
    catch(err) {
        res.send(`error: ${err}`);
    }
}



module.exports = {
    handleBusinessSignup,
    handleInfluencerSignup,
}