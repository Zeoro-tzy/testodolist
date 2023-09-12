const express = require("express")
const rute = express.Router();
const TaskSchema = require("./schemaTask")
const jwt = require("jsonwebtoken")

const verifyToken = (req,res,next) => {
    const token = req.header("todo-token")

    if(!token) return res.status(400).json({message : "Access Denied"})
    try{
        const verified = jwt.verify(token,process.env.SECRET_KEY)
        req.user = verified
        next()
    }catch(err){
        res.status(400).json({message : "Invalid Token"})
    }
}


//1.Get Data
rute.get("/getData",verifyToken,async(req,res) => {
    try{
        const userId = req.user._id;
        const getData = await TaskSchema.find({createdBy : userId})
        res.status(200).json(getData)
        // res.send(getData)
    }catch(err){
        res.status(404).json({message : "Data tidak ditemukan"})
    }
})

//2.Get by ID
rute.get("/getData/:id",async(req,res) => {
    try{
        const id = req.params.id;
        const cariById = await TaskSchema.findById(id)
        res.status(200).json(cariById)
    }catch(err){
        res.status(404).json({message : "Data tidak ditemukan"})
    }
})

//3.Post
rute.post("/postData",verifyToken,async (req,res) => {
    try{
        const userId = req.user._id
        const newTsk = new TaskSchema({
            ...req.body,
            createdBy : userId
        });
        const saveData = await newTsk.save();
        res.status(200).json(saveData)
    }catch(err){
        console.log(err)
        res.status(500).json({message : "Server sedang bermasalah"})
    }
})

//4.Delete
rute.delete("/delData/:id",async(req,res) => {
    try{
        const id = req.params.id;
        const delData = await TaskSchema.findByIdAndDelete(id);
        res.status(200).json({message : "Berhasil dihapus"})
    }catch(err){
        res.status(500).json({message : "Server sedang bermasalah"})
    }
}) 

//5.Patch
rute.patch("/updData/:id",async(req,res) => {
    try{
        const id = req.params.id
        const body = req.body;
        const updData = await TaskSchema.findByIdAndUpdate(id,body,{new : true})
        res.status(200).json(updData)
    }catch(err){
        res.status(500).json({message : "Server sedang bermasalah"})
    }
    
})
 
module.exports = rute;