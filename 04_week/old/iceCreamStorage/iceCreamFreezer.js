'use strict';

const path = require('path');

const { read } = require('../library/utilities'); //not nice (hardcoded path)

const jsonPath = path.join(__dirname, 'iceCreams.json');

async function getAllFlavors() {
    try {
        const data = await read(jsonPath);
        const iceCreams = await JSON.parse(data.fileData);
        return Object.keys(iceCreams);
    }
    catch (err) {
        return [];
    }
}// end of getAllFlavors

async function getIceCream(flavour) {
    try {
        const data = await read(jsonPath);
        const iceCreams = await JSON.parse(data.fileData);
        return iceCreams[flavour] || null;
    }
    catch (err) {
        return null;
    }
}// end of getIceCream

async function hasFlavor(flavor) {
    try {
        const data = await read(jsonPath);
        const iceCreams = await JSON.parse(data.fileData);
        return Object.keys(iceCreams).includes(flavor);
    }
    catch (err) {
        return false;
    }
}//end of hasFlavor

module.exports = { getAllFlavors, getIceCream, hasFlavor }