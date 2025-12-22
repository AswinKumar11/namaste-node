const express = require("express");
const connectDB = require("./src/config/database.js");
const User = require("./models/userSchema.js");

const app = express();

app.post("/signup", async(req, res) => {
    const user = new User({
        name:"aswin",
        age:25,
        email:"aswin@gmail.com",
        password:"aswin",
        gender:"male"
    });
    try{
        await user.save();
        res.send({ 
            status: 200,
            id: user._id,
            message: "User created successfully" 
        });
    }
    catch{
        res.send("User not created");
    }
})

connectDB().then(() => {
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    })
});
