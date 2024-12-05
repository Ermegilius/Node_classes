'use strict';

const {adapt} = require('./storageLayer/personAdapter');

const test = {
    "id": "1",
    "firstname": "Matt",
    "lastname": "River",
    "department": "ict",
    "salary": 4000
};

console.log(adapt(test));