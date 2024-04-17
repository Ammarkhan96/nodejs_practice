const express = require("express");
const {connectToMongoose} = require("./connect")
const path = require("path")
const ejs = require("ejs")

const URL = require("./models/url")

const urlRoute = require("./routes/url")
const staticRoute = require("./routes/staticRouter")
const userRoutes = require("./routes/user")

const app = express()
const PORT = 8002

connectToMongoose('mongodb://localhost:27017/short-url').then(()=>console.log("MongoDB connected"))

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.use(express.json())
app.use(express.urlencoded({extended: false}))

// app.get('/test', (req, res) => {
//     return res.end("<h1>Hey from Server</h1>")
// })

// app.get('/test', async (req, res) => {
//     const allUrls = await URL.find({})
//     return res.render('home',{
//         urls: allUrls,
//     })
    // return res.end
       // (`
    // <html>
    //  <head></head>
    //  <body>
    //  <ol>
    //  ${allUrls.map(url => `<li>${url.shortId} - ${url.redirectURL} - ${url.visitHistory.length}</li>`).join("")}
    //  </ol>
    //  </body>
    // </html>
    // `)
//})

app.use("/url", urlRoute)
app.use("/user", userRoutes)
app.use("/", staticRoute)

app.get('/url/:shortId', async (req, res) => {
     const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
     }, { $push: {
        visitHistory: {
            timestamp: Date.now(),
        }
     },
     })
     res.redirect(entry.redirectURL)
})
// to check result (http://localhost:8002/MFZNNgesC) or (view-source:http://localhost:8002/)

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`))