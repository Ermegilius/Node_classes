'use strict'

const { getAllFlavors, getIceCream, hasFlavor } = require('./iceCreamStorage/iceCreamFreezer');


//getAllFlavors().then(console.log).catch(console.log);
// getIceCream('vanilla').then(console.log).catch(console.log);
// getIceCream('raspberry').then(console.log).catch(console.log);
// getIceCream('x').then(console.log).catch(console.log);

// getIceCream('vanilla')
//     .then(data => console.log(data.price))
//     .catch(console.log);

hasFlavor('vanilla').then(console.log).catch(console.log);
hasFlavor('x').then(console.log).catch(console.log);
hasFlavor().then(console.log).catch(console.log);