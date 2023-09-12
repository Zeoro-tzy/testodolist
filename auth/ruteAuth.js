const express = require("express")
const router = express.Router()
const SchemaAuth = require("./schemaAuth")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

//1.Register
router.post("/register",async(req,res) => {
    //Cek email
    const emailExist = await SchemaAuth.findOne({email : req.body.email})
    if(emailExist) return res.status(400).json({message : "Email sudah digunakan"})
    
    //Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password,salt)

    const user = new SchemaAuth({
        username : req.body.username,
        email : req.body.email,
        password : hashPassword
    })

    try{
        const saveUser = await user.save()
        res.json(saveUser)
    }catch(err){
        res.status(500).json({message : "Server sedang bermasalah"})
    }
})

//2.Get Data
router.get("/getData",async(req,res) => {
    try{
        const user = await SchemaAuth.find()
        res.status(200).json(user)
    }catch(err){
        res.status(400).json({message : "Data tidak ditemukan"})
    }
})


//3.Login
router.post("/login",async(req,res) => {
    try{
        //if email exist
        const user = await SchemaAuth.findOne({email : req.body.email})
        if(!user) res.status(404).json({message : "Email tidak ada"})

        //Cek Password
        const validPwd = await bcrypt.compare(req.body.password,user.password)
        if(!validPwd) return res.status(400).json({message : "Password salah"})

        //Membuat token dengan jwt
        const token = jwt.sign({_id : user._id},process.env.SECRET_KEY)
        res.header("todo-token",token).json({
            token : token
        })

    }catch(err){
        res.status(404).json(err)
    }
})

module.exports = router