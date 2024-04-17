// const http = require('http')

// const myServer = http.createServer((req, res)=>{
//     // console.log('New Req Rec.');
//     console.log(req);
//     res.end('Hello from Server Again');
// })
// myServer.listen(8000, () => console.log('Server Started'));



const http = require('http')
const fs = require('fs')

const myServer = http.createServer((req, res)=>{
    const log = `${Date.now()}: ${req.url} New Req Received\n`
    fs.appendFile('log.txt', log, (err, data) => {
        // res.end('Hello from Server Again');
        switch(req.url){
            case '/':res.end("Home Page")
            break
            case '/about': res.end("I am Ammar Khan")
            break
            default: res.end("404 Not Found")
        }
    })
})
myServer.listen(8000, () => console.log('Server Started'));