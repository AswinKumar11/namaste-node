const express = require("express");
const connectDB = require("./src/config/database.js");
const User = require("./models/userSchema.js");

const app = express();

app.use(express.json());

app.post("/signup", async(req, res) => {
    // initializing user table in mongodb
    const user = new User(req.body);
    try{
        await user.save();
        res.send({ 
            status: 200,
            id: user._id,
            message: "User created successfully" 
        });
    }
    catch(err){
        res.send({
            status: 400,
            message: "User not created : "+err.message
        });
    }
})

app.get("/getUser",async(req, res) => {
    const users = await User.find(req.body);
    res.send(users);
});

app.delete("/deleteUser",async(req, res) => {
    try{
        await User.findByIdAndDelete({ _id: req.body.id });
        res.send("user deleted successfully");
    }
    catch(e){
        res.send("user not found");
        return;
    }
});

app.patch("/updateUser",async(req,res)=>{
    try{
        await User.findByIdAndUpdate({ _id: req.body.id }, req.body);
        res.send("user updated successfully");
    }
    catch(e){
        res.send("user not found");
        return;
    }
});

connectDB().then(() => {
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    })
});
