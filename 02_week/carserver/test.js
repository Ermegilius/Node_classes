'use strict'

const cars = require('./cars.json');

const tmp = cars.map(car => car.model);

console.log(tmp);

const models = [... new Set(tmp)];
console.log(models);

