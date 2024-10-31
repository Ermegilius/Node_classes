'use strict'

const {
    getAllCars,
    getAllModels,
    getCar } = require('./carstorage');

console.log(getAllCars());

console.log(getAllModels());
console.log(getAllModels().sort());

console.log(getCar('license', 'ABC-10'));
console.log(getCar('license', 'ABC-666'));
console.log(getCar());
console.log(getCar('model', 'Fast'));
console.log(getCar('model', 'Slow'));