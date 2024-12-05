'use strict';

const Datastorage = require('./storageLayer/dataStorageLayer');

const register = new Datastorage();

/* console.log(register.CODES);
console.log(register.TYPES);
console.log(register.PRIMARY_KEY); */

//console.log(register.KEYS); //won't work without async
//register.KEYS.then(console.log);

//register.getAll().then(console.log);


//register.get(2).then(console.log);
//register.get(20).then(console.log);
//register.get('River', 'lastname').then(console.log)

const vera =
{
    "id": 4,
    "firstname": "Vera",
    "lastname": "jones",
    "department": "transportation",
    "salary": 4500
};

//register.insert(vera).then(console.log).catch(console.log);

//register.remove(4).then(console.log).catch(console.log);
