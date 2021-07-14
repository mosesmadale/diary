const http = require('http');
const path = require('path');
const fs = require('fs');

//create server

const server = http.createServer((req, res) => {
    let filepath = path.join(__dirname, '../', req.url === '/' ? 'index.html' : req.url)
        //extension of the file
    let extname = path.extname(filepath);
    //initial content type
    let contentType = 'text/html';
    //check ext and set content type
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.svg':
            contentType = 'image/svg+xml';
            break;
    }

    //Read file 
    fs.readFile(filepath, (err, content) => {
        if (err) {
            if (err.code == 'ENOENT') {
                //Page not found
                fs.readFile(path.join(__dirname, 'public', 'enonet.html'), (err, content) => {
                    res.writeHead(200, { 'Content-type': 'text/html' })
                    res.end(content, 'utf8');
                })
            } else {
                //server error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`)
            }
        } else {
            //success
            res.writeHead(200, { 'Content-type': contentType })
            res.end(content, 'utf8');
        }
    })


});

const PORT = process.env.PORT || 5005;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))