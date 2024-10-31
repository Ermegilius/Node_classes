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

    let resultHtml = '';
    if (route === '/') {
        resultHtml = createMessageHtml('use cars, models or search');
    } else if (route === '/cars') {
        resultHtml = createCarsHtml(getAllCars());
    } else if (route === '/models') {
        resultHtml = createModelsHtml(getAllModels());
    } else if (route === '/search') {
        if (searchParams.has('key') && searchParams.has('value')) {
            const key = searchParams.get('key');
            const value = searchParams.get('value');
            resultHtml = createCarsHtml(getCar(key, value));
        } else {
            resultHtml = createMessageHtml('Key or/and value missing');
        }
    } else {
        resultHtml = createMessageHtml(`No route ${route}`);
    }
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.end(resultHtml);
});

function createCarsHtml(carsArray) {
    let htmlString = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Cars</title>
            <style>
            table{
                border-collapse:collapse;
            }
            table,td,th{
                border:solid 1px black;
            }
            </style>
        </head>
        <body>
            <h1>Search result</h1>`;
    if (carsArray.length === 0) {
        htmlString = '<h2>No cars found</h2>'
    } else {
        htmlString +=
            `<table>
                <thead>
                    <tr><th>Model</th><th>License</th></tr>
                </thead>
                <tbody>

                </tbody>`;
        for (const car of carsArray) {
            htmlString += `<tr>
                <td>${car.model}</td><td>${car.license}</td>
                </tr>`
        }
        htmlString += `</tbody>
            </table>
            `;
    }
    htmlString += `
        </body>
        </html>
        `;
    return htmlString;
}

function createModelsHtml(models) {
    let htmlString = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Car models</title>
        </head>
        <body>
            <h1>Car models</h1>
            <ul>
                <li>${models.join('</li><li>')}</li>
            </ul>
        </body>
        </html>
    `;
    return htmlString;
}

function createMessageHtml(message) {
    let htmlString = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Info</title>
        </head>
        <body>
            <h1>Messaget</h1>
            <p>${message}</p>
        </body>
        </html>
    `;
    return htmlString;
}

server.listen(port, host,
    () => console.log(`Server ${host}:${port} is running`)
)