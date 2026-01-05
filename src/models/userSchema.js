const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
        min: 18
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate:((emailId) => {
            return emailId.match(
               /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            );
        })
    },
    password: {
        type: String,
        required: true,
        match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
    },
    gender:{
        type: String
    }
},{
    timestamps: true
});
userSchema.methods.getJWTToken = async function(){
    const user = this;
    const token = await jwt.sign({_id:user._id}, "secretKey",{expiresIn:"7d"});
    return token;
}

userSchema.methods.validatePassword = async function(password){
    const user = this;
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    return isPasswordCorrect;
}


module.exports = mongoose.model("User",userSchema);