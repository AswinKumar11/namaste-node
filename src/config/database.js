const mongoose = require("mongoose");

const connectDB = async()=>{
    try{
        await mongoose.connect("mongodb+srv://aswinyadav123:NUr9VQqiRC94SR5q@namastenode.twkfcmk.mongodb.net/devTinder");
        console.log("Database connected");
    }
    catch(e){
        console.log(e,"Database not connected");
    }
}
module.exports = connectDB;