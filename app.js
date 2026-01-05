const express = require("express");
const connectDB = require("./src/config/database.js");
const User = require("./src/models/userSchema.js");
const cookieParser = require("cookie-parser");
const userLoginValidation = require("./src/middlewares/validation.js");
const authRouter = require("./src/routes/auth.js");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/auth",authRouter);

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

app.delete("/deleteUser",userLoginValidation, async(req, res) => {
    try{
        await User.findByIdAndDelete({ _id: req.body.id });
        res.send("user deleted successfully");
    }
    catch(e){
        res.status(400).send("user not found");
        return;
    }
});

app.patch("/updateUser",userLoginValidation, async(req,res)=>{
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
