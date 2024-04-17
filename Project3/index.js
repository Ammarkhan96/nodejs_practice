const express = require("express")
// const fs = require('fs')
// const mongoose = require('mongoose')
// const users = require('./MOCK_DATA.json')

const { logReqRes } = require("./middlewares")
const {connectMongoDb} =  require("./connection")
const userRouter = require("./routes/user")

const app = express()
const PORT = 5000

connectMongoDb("mongodb://127.0.0.1:27017/my-first-mongo-app").then(() => {
    console.log("MongoDB Connected");
})

app.use(express.urlencoded({ extended: false }))
app.use(logReqRes("log.txt"))


app.use("/api/users", userRouter)

app.listen(PORT, () =>console.log(`Server Started at PORT: ${PORT}`))