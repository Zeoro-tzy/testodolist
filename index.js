require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const mongoString = process.env.DATABASE_URL;
const app = express()
const cors = require("cors")
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const ruteHome = require("./crudHome/ruteHome")
const ruteUser = require("./auth/ruteAuth")
const ruteTask = require("./task/ruteTask")
app.use(cors())


//Menghubungkan dengan mongodb 
mongoose.connect(mongoString)
const db = mongoose.connection

db.once("connected",() => {
    console.log("Database connected")
})

db.on("error",(err) => {
    console.log(err)
})

//1.Menambah Rute
app.use("/data",ruteHome)

//2.Get User
app.use("/user",ruteUser)

//3.Task 
app.use("/task",ruteTask)

app.listen(3001,() => {
    console.log("Server sudah berjalan")
})