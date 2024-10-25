'use strict';

const http = require('http');
const fs = require('fs').promises;

const path = require('path');

const { port, host } = require('./config.json');

const homePath = path.join(__dirname, 'home.html');
const hobbiesPath = path.join(__dirname, 'hobbies.html');

const server = http.createServer((req, res) => {
    // sendFile(res, homePath);
    const { pathname } = new URL(`http://${req.headers.host}${req.url}`);
    const route = decodeURIComponent(pathname);
    // console.log(pathname, route);
    if (route === '/') {
        sendFile(res, homePath);
    } else if (route === '/hobbies') {
        sendFile(res, hobbiesPath);
    } else {
        console.log('else');
        res.end();
    }
});

server.listen(port, host,
    () => console.log(`Server ${host}:${port} is running`)
);

async function sendFile(res, filePath) {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        res.writeHead(200, {
            'Content-Type': 'text/html',
            'Content-Length': Buffer.byteLength(data, 'utf8')
        });
        res.end(data);
    }
    catch (err) {
        res.statusCode = 404;
        res.end(`Error: ${err.message}`);
    }
}