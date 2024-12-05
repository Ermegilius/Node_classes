'use strict';

const Datastorage = require('./storageLayer/dataStorageLayer');

const register=new Datastorage();

// console.log(register.CODES);
// console.log(register.TYPES);
// console.log(register.PRIMARY_KEY);

// console.log(register.KEYS); //not working. KEYS is async
// register.KEYS.then(console.log);

// register.getAll().then(console.log);
// register.get(2).then(console.log);
// register.get(20).then(console.log);
// register.get('River','lastname').then(console.log);

const matt = {
    "id": 10,
    "firstname": "Matt",
    "lastname": "River",
    "department": "ict",
    "salary": 4000
};

// register.insert(matt).then(console.log).catch(console.log);

// register.remove(10).then(console.log).catch(console.log);
// register.remove().then(console.log).catch(console.log);