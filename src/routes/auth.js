const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/userSchema");

const authRouter = express.Router();

const saltRounds = 10;

authRouter.post("/signup", async(req, res) => {
    // initializing user table in mongodb
    const {name, age, emailId, password} = req.body;
    const hashPassword = await bcrypt.hash(password, saltRounds);
    const user = new User({
        name:name,
        age:age,
        emailId:emailId,
        password:hashPassword
    });
    try{
        await user.save();
        res.send({ 
            status: 200,
            id: user._id,
            message: "User created successfully" 
        });
    }
    catch(err){
        res.status(400).send({
            status: 400,
            message: "User not created : "+err.message
        });
    }
});

authRouter.post("/login", async(req,res)=>{
    const {emailId, password} = req.body;
    try{
        const user = await User.findOne({emailId:emailId});
        if(user){
            const isPasswordCorrect = await user.validatePassword(password);
            if(isPasswordCorrect){
                const token = await user.getJWTToken();
                res.cookie("loginToken",token, {expires: new Date(Date.now() + 7*24*60*60*1000)});
                res.send({
                    status: 200,
                    message: "User logged in successfully"
                });
            }
            else{
                throw new Error("Invalid Credentials");
            }
        }
        else{
            throw new Error("Invalid Credentials");
        }
    }
    catch(err){
        res.send({
            status: 400,
            message: "Invalid Credentials"
        })
    }
});

authRouter.post("/logout", async(req,res)=>{
    // res.clearCookie("loginToken");
    res.cookie("loginToken",null, {expires: new Date(Date.now())});
    res.send({
        status: 200,
        message: "User logged out successfully"
    });
});

module.exports = authRouter;


// validatePassword and getJWTToken methods are defined in src/models/userSchema.js (This is the best approach) for better code organization and separation of concerns. we are  doing in mongodb model itself.