// const http = require('http')
// const fs = require('fs')
// const url = require('url')
const express = require('express')

const app = express() //this app is basically a handler function

app.get("/", (req, res) => {
    return res.send("Hello from Home Page")
})

app.get("/about", (req, res) => {
    // return res.send("Hello from About Page" + " hey " + req.query.name)
    return res.send(`Hello ${req.query.name}`)
})

app.listen(8003, () => console.log("Server Started"));

// function myHandler(req, res){
//     if(req.url === '/favicon.ico') return res.end();
//     const expressServer = `${Date.now()}: ${req.method} ${req.url} New Req Received\n`
//     const myUrl = url.parse(req.url, true)
    
//     fs.appendFile('expressServer.txt', expressServer, (err, data) => {
//         // res.end('Hello from Server Again');
//         switch(myUrl.pathname){
//             case '/':
//                 if(req.method === "GET") res.end('HomePage')
//             break
//             case '/about':
//                 const username = myUrl.query.myname
//                 res.end(`Hi, ${username}`)
//             break
//             case '/search':
//                 const search = myUrl.query.search_query
//                 res.end("Here are your result for " + search)
//                 case '/signup':
//                     if(req.method === 'GET') res.end('This is a signup Form')
//                     else if(req.method === 'POST'){
//                 //DB Query
//                 res.end("Success")
//             }
//             default: 
//                 res.end("404 Not Found")
//         }
//     })
// }

// const expressServer = http.createServer(app)

// expressServer.listen(8003, () => console.log('Server Started'));