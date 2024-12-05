'use strict';

const {
    getAllFromStorage, 
    getFromStorage, 
    addToStorage,
    removeFromStorage, 
    getKeys,
    primary_key
} = require('./storageLayer/storageLayer');

// getAllFromStorage().then(console.log).catch(console.log);
// getFromStorage(1).then(console.log).catch(console.log); //id==1
// getFromStorage(1,'id').then(console.log).catch(console.log); //id==1
// getFromStorage('1').then(console.log).catch(console.log); //id==1
//             value,    key
// getFromStorage('River','lastname').then(console.log).catch(console.log);
// getFromStorage('Mary', 'firstname').then(console.log).catch(console.log);
// getFromStorage('ict', 'department').then(console.log).catch(console.log);
// getFromStorage(4500, 'salary').then(console.log).catch(console.log);
// getFromStorage().then(console.log).catch(console.log);
// getFromStorage(1234).then(console.log).catch(console.log);
// getFromStorage('x','lastname').then(console.log).catch(console.log);
// getFromStorage('Vera', 'x').then(console.log).catch(console.log);


const newPerson = {
    "id": 4,
    "firstname": "Vera",
    "lastname": "jones",
    "department": "transportation",
    "salary": 4500
}

// addToStorage(newPerson).then(console.log).catch(console.log);

const anotherPerson = {
    "id": "5",
    "firstname": "Peter",
    "lastname": "Bond",
    "department": "transportation",
    "salary": "4500"
}

// addToStorage(anotherPerson).then(console.log).catch(console.log);

// removeFromStorage(5).then(console.log).catch(console.log);

// getKeys().then(console.log).catch(console.log);

console.log(primary_key);