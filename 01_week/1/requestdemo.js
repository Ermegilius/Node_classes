'use strict';

const http = require('http');

const { port, host } = require('./config.json');

const server = http.createServer((req, res) => {
    // console.log(req.url);
    const myurl = new URL(`http://${req.headers.host}${req.url}`);
    const { pathname } = myurl;
    // console.log(Object.keys(req));
    // console.log(req.method);
    // console.log(req.httpVersion);
    // console.log(req.headers);
    // console.log(req.headers['user-agent']);
    console.log(myurl);
    let message;
    if (pathname === '/pageA') {
        message = 'pageA';
    } else {
        message = 'page not given';
        console.log(pathname);
    }
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.end(`<h1>${message}</h1>`);
});

server.listen(port, host,
    () => {
        console.log(`Server ${host}:${port} is running`);
    });