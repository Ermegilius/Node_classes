'use strict'

const http = require('http');
const { host, port } = require('./config.json');

const {
    getAllCars,
    getAllModels,
    getCar } = require('./carstorage');


const server = http.createServer((req, res) => {
    const { pathname, searchParams } =
        new URL(`http://${req.headers.host}${req.url}`);

    const route = decodeURIComponent(pathname);

    let resultJSON = [];

    if (route === '/cars') {
        resultJSON = getAllCars();
    } else if (route === '/models') {
        resultJSON = getAllModels();
    } else if (route === '/search') {
        resultJSON = getCar(searchParams.get('key'), searchParams.get('value'));
    } else {
        resultJSON = { message: 'not found' }
    }

    res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });

    res.end(JSON.stringify(resultJSON));

});

server.listen(port, host, () => console.log(`${host}:${port} is running`));