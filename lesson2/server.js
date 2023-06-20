// this file is not in use __ implemented in app.js
// start a simple server

// require http module
const http = require('http');
const fs = require('fs')
const _ = require('lodash')

const port =  4000

// storing the sever in a variable allows for further addition of web sockets
const server = http.createServer((req, res) => {
    // console.log(req.method);
    // console.log(req.url)

    // lodash
    const num = _.random(0, 200)
    console.log(num);

    let path = './views/'

    // set header content type

    // res.setHeader('Content-Type', 'text/plain')
    // res.write('Hello Ninjas')

    // return HTML pages to the browser


    // basic routing
    switch(req.url){
        case '/':
            path += 'index.html'
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html'
            res.statusCode = 200;
            break;
            // redirects
        case '/about-me':
            res.setHeader('Location', './about')
            res.statusCode = 301;
            break;
        default:
            res.statusCode = 404;
            path += '404.html'
            break;
    }

    res.setHeader('Content-Type', 'text/html')
    
    fs.readFile(path, (err, data)=>{
        if(err){
            console.log(err);
            res.end()
        }else{
            res.end(data);

        }

    })



})

server.listen(port, 'localhost', ()=>{
    console.log(`Server started on port: ${port}`)
})
