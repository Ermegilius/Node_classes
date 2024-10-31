'use strict';

const http = require('http');
const path = require('path');
const { sendFile } = require('./functionlibrary');

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
    } else if (route.startsWith('/styles/')) {
        sendFile(res, path.join(__dirname, route), 'text/css');//applying styles from the folder
    } else {
        console.log('else');
        res.end();
    }
});

server.listen(port, host,
    () => console.log(`Server ${host}:${port} is running`)
);