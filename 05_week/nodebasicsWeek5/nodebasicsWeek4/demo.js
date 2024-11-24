'use strict';

const data=require('./iceCreamStorage/iceCreams.json');

console.log(data);


console.log(Object.keys(data));

console.log(Object.keys(data.vanilla));

console.log(Object.values(data.vanilla))

console.log(Object.entries(data.vanilla));

// [ //  key     value
//     ['name', 'Vanilla'], 
//     ['price', 2], 
//     ['image', 'vanilla.png']
// ]