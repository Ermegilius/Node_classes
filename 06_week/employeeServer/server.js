'use strict';

const http = require('http');
const path = require('path');

const {host, port} = require('./config.json');

const {
    read,
    send,
    sendJson,
    isIn,
    getEncodedPostData
} = require('./library/utilities.js');

const DataStorage = require('./storageLayer/dataStorageLayer.js');
const register = new DataStorage();

const resourceRoutes = [
    '/favicon',
    '/pages/',
    '/styles/',
    '/js/',
    '/images/'
];

const homePath = path.join(__dirname, 'menu.html');

const server = http.createServer(async (req, res) => {
    const {pathname} = new URL(`http://${req.headers.host}${req.url}`);
    const route = decodeURIComponent(pathname);

    const method = req.method.toUpperCase();

    if (method === 'GET') {
        if (route === '/') {
            const result = await read(homePath);
            send(res, result);
        } else if (route === '/keys') {
            sendJson(res, await register.KEYS);
        } else if (route === '/all') {
            sendJson(res, await register.getAll());
        } else if (isIn(route), resourceRoutes) {
            const result = await read(path.join(__dirname, route));
            if (result.fileData) {
                send(res, result);
            } else {
                send(res, await read(homePath));
            }
        } else {
            sendJson(res,{message: 'Resourse not found'}, 404);
        }
    } else if (method === 'POST') {

    } else {
        sendJson(res,{message: 'Method not in use'}, 405);
    }
});//end of server

server.listen(port, host, () => {
    console.log(`Server is running at http://${host}:${port}`);
});