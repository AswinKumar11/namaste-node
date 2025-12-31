const mongoose = require("mongoose");

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
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate:((email) => {
            return email.match(
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

module.exports = mongoose.model("User",userSchema);