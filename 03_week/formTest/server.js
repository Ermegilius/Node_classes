'use strict'
const http = require('http');
const path = require('path');
const { host, port } = require('./config.json');

const { sendFile, getEncodedPostData } = require('./functionlibrary');

const formPath = path.join(__dirname, 'form.html');

const server = http.createServer(async (req, res) => {
    const method = req.method.toUpperCase();
    if (method === 'GET') {
        sendFile(res, formPath);
    } else if (method === 'POST') {
        const formData = await getEncodedPostData(req);
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify(formData));
    } else {
        res.end();
    }
});

server.listen(port, host, () => console.log(`${host}:${port} is running`));