'use strict';

const http = require('http');
const path = require('path');

const { port, host } = require('./config.json');

const { read, send, sendJson, isIn } = require('./library/utilities');
const { getAllFlavors, getIceCream, hasFlavor } = require('./iceCreamStorage/iceCreamFreezer');

const homePath = path.join(__dirname, 'home.html');

const resourceRoutes = ['/stules/', '/js/', '/images/', '/favicon'];

const server = http.createServer(async (req, res) => {
    const { pathName } = new URL(`http://${req.headers.host}${req.url}`);
    const route = decodeURIComponent(pathName);
    try {
        if (route === '/') {
            const result = await read(homePath);
            send(res, result);

            //send(res, await read(homePath));//or like this
        } else if (isIn(route, ...resourceRoutes)) {
            const result = await read(path.join(__dirname, route));
            send(res, result);
            //send(res,await read(path.join(__dirname, route))); the saim in 1 line
        } else if (route === '/flavors') {
            const flavors = await getAllFlavors();
            sendJson(res, flavors);
        } else if (isIn(route, '/iceCreams/')) {//route could be /iceCreams/vanilla
            const pathParts = route.split('/');
            if (pathParts.length > 2) {
                const iceCreamFlavor = pathParts[2];
                if (await hasFlavor(iceCreamFlavor)) {
                    const iceCream = await getIceCream(iceCreamFlavor);
                    sendJson(res, iceCream);
                } else {
                    sendJson(res, { message: 'Icecream not found' }, 404);
                }
            } else {
                sendJson(res, { message: 'Flavor is missing' }, 404);
            }
        } else {
            sendJson(res, { message: 'Not found' }, 404);
        }
    }
    catch (err) {
        sendJson(res, { message: err.message }, 400)
    }
});

server.listen(port, host, () => console.log(`Server ${host}:${port} is running`));