'use strict';

import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import { readFile } from 'fs/promises';

const config = JSON.parse(await readFile(new URL('./config.json', import.meta.url), 'utf8'));

import {
    read,
    send,
    sendJson,
    isIn,
    getEncodedPostData
} from './library/utilities.js';

import Datastorage from './storageLayer/dataStorageLayer.js';
const register = new Datastorage();

const resourceRoutes = [
    '/favicon',
    '/pages/',
    '/styles/',
    '/js/',
    '/images/'
];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const homePath = path.join(__dirname, 'menu.html');
const statusPagePath = path.join(__dirname, 'pages', 'status.html'); 

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
        } else if (isIn(route, ...resourceRoutes)) {
            const result = await read(path.join(__dirname, route));
            if (result.fileData) {
                send(res, result);
            } else {
                send(res, await read(homePath));
            }
        } else {
            sendJson(res,{message: 'Resourse not found', type:register.TYPES.ERROR}, 404);
        }
    } else if (method === 'POST') {
        if (route === '/search'){
            const body = await getEncodedPostData(req);          
            sendJson(res, await register.get(body.value, body.key));
        } else if (route === '/add'){
            async function sendStatus(res, result) {
                const page = await read(statusPagePath);
                let data = page.fileData.replace('###CLASS###', result.type);
                data = data.replace('###TYPE###', result.type.toUpperCase());
                page.fileData = data.replace('###MESSAGE###', result.message);
                send(res, page);
            }
            const body = await getEncodedPostData(req);
            register.insert(body)
                .then(result => sendStatus(res, result))
                .catch(error => sendStatus(res, error));

        } else if (route === '/remove'){
            const body = await getEncodedPostData(req);
            register.remove(body.value)
                .then(result => sendJson(res, result))
                .catch(error => sendJson(res, error));
        } else {
            sendJson(res,{message: 'Resourse not found', type:register.TYPES.ERROR}, 404);
        }
    } else {
        sendJson(res,{message: 'Method not in use', type:register.TYPES.ERROR}, 405);
    }
});//end of server

server.listen(config.port, config.host, () => {
    console.log(`Server is running at http://${config.host}:${config.port}`);
});