const mongoose = require('mongoose')
const PersonSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    age:{
        type:Number,
    },
    work:{
        type:String,
        enum:["chef","waiter"],
        require:true
    },
    email:{
        type:String,
        unique:true,
        require:true
    },
})

const person = mongoose.model('Person',PersonSchema)
module.exports = person
