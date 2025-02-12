'use strict';

const path = require('path');

const config= require('./configOrders.json');
const storageEnginePath = path.join(__dirname, config.engineFolder, config.storageEngine.folder);
const dataStoragePath = path.join(storageEnginePath, config.storageEngine.dataStorageFile);

const storagePath = path.join(__dirname, config.allStoragesFolder, config.storage.folder);

const Datastorage = require(dataStoragePath);
const storage = new Datastorage(storagePath, config.storage.storageConfigFile);

//storage.getAll().then(console.log);

async function getAddress(firstname,lastname){
    const allOrders = await storage.getAll();
    const foundAddr=[];
    for(const order of allOrders){
        if(order.customer.firstname===firstname &&
           order.customer.lastname===lastname){
            foundAddr.push(order.customer.address);
        }
    }
    return foundAddr;
}

function compareAddr(addrA,addrB){
    if (addrA.street !== addrB.street) return false;
    if (addrA.postcode !== addrB.postcode) return false;
    if (addrA.country !== addrB.country) return false;
    return true;
}

function addrNoPhone(addr){
    return {
        street:addr.street,
        postcode:addr.postcode,
        country:addr.country
    }
}


function removeDuplicates(addresses) {
    const noPhones = addresses.map(addr => addrNoPhone(addr));
    const foundAddr=[];
    const addrStringTemp=[];
    for (const address of noPhones){
        const addr = JSON.stringify(address);
        if(!addrStringTemp.includes(addr)){
            addrStringTemp.push(addr);
            foundAddr.push(address);
        }
    }
    return foundAddr;
}

getAddress('Matt','River')
    .then(result=>removeDuplicates(result))
    .then(console.log);
