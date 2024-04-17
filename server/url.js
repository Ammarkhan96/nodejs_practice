const http = require('http')
const fs = require('fs')
const url = require('url')

const myServer = http.createServer((req, res)=>{
    if(req.url === '/favicon.ico') return res.end();
    const urls = `${Date.now()}: ${req.url} New Req Received\n`
    const myUrl = url.parse(req.url, true)
    console.log(myUrl);
    fs.appendFile('urls.txt', urls, (err, data) => {
        // res.end('Hello from Server Again');
        switch(myUrl.pathname){
            case '/':
                res.end("Home Page")
            break
            case '/about':
                const username = myUrl.query.myname
                res.end(`Hi, ${username}`)
            break
            case '/search':
                const search = myUrl.query.search_query
                res.end("Here are your result for " + search)
            default: 
                res.end("404 Not Found")
        }
    })
})
myServer.listen(8002, () => console.log('Server Started'));