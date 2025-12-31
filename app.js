const express = require("express");
const connectDB = require("./src/config/database.js");
const User = require("./src/models/userSchema.js");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const userLoginValidation = require("./src/utils/validation.js");

const app = express();

app.use(express.json());
app.use(cookieParser());
const saltRounds = 10;

app.post("/signup", async(req, res) => {
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

app.post("/login", async(req,res)=>{
    const {emailId, password} = req.body;
    try{
        const user = await User.findOne({emailId:emailId});
        if(user){
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if(isPasswordCorrect){
                const token = await jwt.sign({_id:user._id}, "secretKey",{expiresIn:"7d"});
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

app.get("/profile",userLoginValidation, async(req,res)=>{
    try {
      const userDetails = req.user;
      res.send(userDetails);
    } catch (err) {
      res.status(400).send({
        status: 400,
        message: "Invalid Credentials :" + err.message,
      });
    }
});

app.get("/getUser",userLoginValidation, async(req, res) => {
    const users = await User.find(req.body);
    res.send(users);
});

app.delete("/deleteUser",async(req, res) => {
    try{
        await User.findByIdAndDelete({ _id: req.body.id });
        res.send("user deleted successfully");
    }
    catch(e){
        res.status(400).send("user not found");
        return;
    }
});

app.patch("/updateUser",async(req,res)=>{
    try{
        await User.findByIdAndUpdate({ _id: req.body.id }, req.body);
        res.send("user updated successfully");
    }
    catch(e){
        res.status(400).send("user not found");
        return;
    }
});

connectDB().then(() => {
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    })
});
