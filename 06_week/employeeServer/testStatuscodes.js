'use strict';

const {CODES, TYPES, MESSAGES} = require('./storageLayer/statuscodes.js');

// console.log(CODES);
// console.log(TYPES);
// console.log(MESSAGES);

//console.log(MESSAGES.PROGRAM_ERROR());

const result = MESSAGES.NOT_FOUND('id','3');
//console.log(result);

if (result.code === CODES.NOT_FOUND){
    console.log('##############');
    console.log('Status:', result.message);
    console.log('Code:', result.code);
} else {
    console.log('????');
}