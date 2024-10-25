'use strict';

const http = require('http');

const port = 3000;
const host = 'localhost'; //127.0.0.1

const person = {
    firstname: "Matt",
    lastname: "River",
}

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'application/json'
        // 'Content-Type': 'text/plain'
    });
    res.write(JSON.stringify(person));
    res.end();
});

server.listen(port, host,
    () => console.log(`Json server at ${host}:${port}`)
);