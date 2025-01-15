'use strict';

import path from 'path';
import { fileURLToPath } from 'url';
import { readStorage, writeStorage } from './readerWriter.js';
import adapt from './computerAdapter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storageFilePath=path.join(__dirname,'Beliakov_Vladimir_computers.json');

const PRIMARY_KEY='id';

async function getAllFromStorage(){
    return await readStorage(storageFilePath);
}

async function getFromStorage(value, key=PRIMARY_KEY){
    const dataArray = await readStorage(storageFilePath);
    return dataArray.filter(item => item[key]==value);
}

async function addToStorage(newObject){
    const storage = await readStorage(storageFilePath);
    storage.push(adapt(newObject));
    return await writeStorage(storageFilePath, storage);
}

async function removeFromStorage(value){ //value is for primary_key
    const storage = await readStorage(storageFilePath);
    const ind=storage.findIndex(item=>item[PRIMARY_KEY]==value);
    if(ind<0) return false;
    storage.splice(ind,1);
    return await writeStorage(storageFilePath, storage);
}

async function getKeys(){
    const storage = await readStorage(storageFilePath);
    const keys=new Set(storage.flatMap(item=>Object.keys(item)));
    return [...keys];
}

export { getAllFromStorage, 
    getFromStorage, 
    addToStorage,
    removeFromStorage,
    getKeys,
    PRIMARY_KEY as primary_key
};