'use strict';

const http = require('http');

const { port, host } = require('./config.json');

const person = require('./person.json');

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.end(createHtml(person));
});

server.listen(port, host,
    () => console.log(`HTML server ${host}:${port} is serving`)
);

function createHtml(personData) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Person</title>
    </head>
    <body>
        <h1>Person's data</h1>
        <h2>${personData.firstname} ${personData.lastname}</h2>
    </body>
    </html>
    `;
}