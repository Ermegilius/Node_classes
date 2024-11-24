'use strict';

const { readStorage, writeStorage } = require('./storageLayer/readerWriter');

/* readStorage('./storageLayer/employees.json')
     .then(console.log)
     .catch(console.log); */

/* readStorage('./storageLayer/employees.json')
     .then(result=>console.log(result))
     .catch(console.log); */

/* writeStorage('./test.json',{c:3,d:4})
     .then(console.log)
     .catch(console.log); */

//returns false because folder aaa doesn't exist
/* writeStorage('./aaa/test.json',{a:2,b:1})
     .then(console.log)
     .catch(console.log); */

//this returns an empty array because the file doesn't exist
// readStorage('./storageLayer/employeesx.json')
//     .then(console.log)
//     .catch(console.log);