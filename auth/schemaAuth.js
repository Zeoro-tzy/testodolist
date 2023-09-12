const mongoose = require("mongoose");

const SchemaAuth = mongoose.Schema({
    username : {
        type : String,
        required : true,
        max : 255
    },
    email : {
        type : String,
        required : true,
        max : 100
    },
    password : {
        type : String,
        required : true,
        min : 6,
        max : 1024
    },
    createdAt : {
        type : Date,
        default : Date.now()
    },
    tasks : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Task"
    }]
}) 

module.exports = mongoose.model("User",SchemaAuth)