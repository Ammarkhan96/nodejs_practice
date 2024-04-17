const http = require('http')
const fs = require('fs')
const url = require('url')


const myServer = http.createServer((req, res)=>{
    if(req.url === '/favicon.ico') return res.end();
    const httpServer = `${Date.now()}: ${req.method} ${req.url} New Req Received\n`
    const myUrl = url.parse(req.url, true)
    
    fs.appendFile('httpServer.txt', httpServer, (err, data) => {
        // res.end('Hello from Server Again');
        switch(myUrl.pathname){
            case '/':
                if(req.method === "GET") res.end('HomePage')
            break
            case '/about':
                const username = myUrl.query.myname
                res.end(`Hi, ${username}`)
            break
            case '/search':
                const search = myUrl.query.search_query
                res.end("Here are your result for " + search)
                case '/signup':
                    if(req.method === 'GET') res.end('This is a signup Form')
                    else if(req.method === 'POST'){
                //DB Query
                res.end("Success")
            }
            default: 
                res.end("404 Not Found")
        }
    })
})
myServer.listen(8002, () => console.log('Server Started'));