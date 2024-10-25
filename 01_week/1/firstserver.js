'use strict';

const http = require('http');

const port = 3000;
const host = 'localhost'; //127.0.0.1

const server = http.createServer((request, response) => {
    console.log(`Server got request ${request.url}`);
    response.writeHead(200, {
        'Content-Type': 'text/html'
    });
    response.write('<h1>Hello</h1>');
    response.write('<p>asdfghjkl</p>');
    response.end();
});

server.listen(port, host,
    () => console.log(`Server ${host}:${port} is serving`)
);