'use strict'

const http = require('http');
const { host, port } = require('./config.json');
const cars = require('./cars.json');

function getAllCars() {
    return cars;
}

function getAllCars() {
    return cars;
}

// function getAllModels() {
//     const model = [];
//     for (const car of cars) {
//         if (!models.includes(car.model)) {
//             model.push(car.model);
//         }
//     }
//     return models;
// }

function getAllModels() {
    return [...new Set(cars.map(car => car.model))];
}


function getCar(key, value) {
    const found = [];
    if (key && value) {
        for (const car of cars) {
            if (car[key] === value) {
                found.push(car);
            }
        }
    }
    return found;
}

module.exports = { getAllCars, getAllModels, getCar }