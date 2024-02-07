const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath;

    switch (req.url) {
        case '/':
            filePath = path.join(__dirname, 'index.html');
            break;
        case '/storeowner':
            filePath = path.join(__dirname, 'storeowner1.html');
            break;
        case '/chef':
            filePath = path.join(__dirname, 'chef1.html');
            break;
        default:
            filePath = path.join(__dirname, req.url);
            break;
    }

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('404 Not Found');
            } else {
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end('500 Internal Server Error');
            }
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content, 'utf-8');
        }
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

