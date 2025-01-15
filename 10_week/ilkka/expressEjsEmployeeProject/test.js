'use strict';

const Datastorage = require('./storageLayer/dataStorageLayer');
const storage=new Datastorage();

// storage.getAll().then(console.log);
// storage.getAll().then(console.log);


const tmp = {
    "id": 1,
    "firstname": "Matt",
    "lastname": "River",
    "department": "ict",
    "salary": 4000
};

storage.update().then(console.log).catch(console.log);