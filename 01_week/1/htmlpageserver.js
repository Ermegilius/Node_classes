'use strict';

const http = require('http');

const { port, host } = require('./config.json');

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.write('<!DOCTYPE html>');
    res.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>My home</title>
        </head>
        <body>
            <h1>Home</h1>
            <p>Hello! Welcome to my homepage</p>
        </body>
        </html>
    `);
    res.end();
});

server.listen(port, host,
    () => console.log(`HTML server ${host}:${port} is serving`)
);