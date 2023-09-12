const mongoose = require("mongoose");

const HomeSchema = new mongoose.Schema({
    text : {
        type : String,
        required : true
    },
    edit : {
        type : Boolean,
        default : false
    },
    createdAt : {
        type : Date,
        default : Date.now()
    }
})

module.exports = mongoose.model("Home",HomeSchema)