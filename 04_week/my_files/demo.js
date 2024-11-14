'use strict'

const data = require('./iceCreamStorage/iceCreams.json');

console.log(data);

console.log(Object.keys(data));

console.log(Object.keys(data.vanilla));//keys on an object

console.log(Object.values(data.vanilla));//values on an object

console.log(Object.entries(data.vanilla));//entries on an object