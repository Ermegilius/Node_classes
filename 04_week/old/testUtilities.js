'use strict'

const { read } = require('./library/utilities');

const filePath = './testUtilities.js';

//read(filePath).then(console.log).catch(console.log);

//read('./iceCreamStorage/iceCreams.json').then(console.log).catch(console.log);

// read('./iceCreamStorage/iceCreams.json')
//     .then(data => console.log(data.mime.type, data.fileData))
//     .catch(console.log);

read('./test.png').then(console.log).catch(console.log);