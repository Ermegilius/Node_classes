'use strict'

const http = require('http');
const path = require('path');

const { host, port } = require('./config.json');

const { sendFile, getEncodedPostData } = require('./functionlibrary');

const menuPath = path.join(__dirname, 'menu.html');
const formPath = path.join(__dirname, 'form.html');
const jsonFormPath = path.join(__dirname, 'jsonForm.html');

const server = http.createServer(async (req, res) => {
    const { pathname } = new URL(`http://${req.headers.host}${req.url}`);

    const route = decodeURIComponent(pathname);
    const method = req.method.toUpperCase();

    if (method === 'GET') {
        if (route === '/') {
            sendFile(res, menuPath);
        } else if (route === '/jsonForm') {
            sendFile(res, jsonFormPath);
        } else if (route === '/form') {
            sendFile(res, formPath);
        } else if (route.startsWith('/styles/')) {
            sendFile(res, path.join(__dirname, route), 'text/css');
        } else if (route.startsWith('/JS/')) {
            sendFile(res, path.join(__dirname, route), 'text/javascript');
        }

    } else if (method === 'POST') {
        try {
            const data = await getEncodedPostData(req);
            if (route === '/formData') {
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                res.end(JSON.stringify(data));
            } else if (route === '/jsonData') {
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                res.end(JSON.stringify(data));
            }
        } catch (err) {
            //send error page
        }
    }
});

server.listen(port, host, () => console.log(`${host}:${port} is running`));