const http = require('http')
const fs = require('fs')


const myServer = http.createServer((req, res) => {
    const log = `${Date.now()}: ${req.url} New Req Received\n`
    fs.appendFile('file.txt', log, (err, data) => {
        switch(req.url){
            case '/': res.end("Hello Node Page")
            break;
            case '/contact-us': res.end("This is my contact: +9211111111")
            break;
            case '/about': res.end("I am Ammar Khan")
            break
        }
    })
})
myServer.listen(8001, () => console.log("Server Started"))