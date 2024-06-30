const mongoose = require('mongoose')
require("dotenv").config()
const MONGODBURL = process.env.MONGODBURL;

mongoose.connect(MONGODBURL)
const db = mongoose.connection

db.on("connected",()=>
    {console.log("Database is connected")
    })

db.on('error',()=>{
    console.log("MongoDB connection ERROR",error);
})

db.on("disconnected",()=>{
    console.log("MongoDB Disconnected");
})

module.exports = db




