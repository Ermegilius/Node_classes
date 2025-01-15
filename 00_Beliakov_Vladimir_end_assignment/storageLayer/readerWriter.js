'use strict';

import { promises as fs } from 'fs';

async function readStorage(storageFilePath){
    try{
        const data = await fs.readFile(storageFilePath,'utf8');
        return JSON.parse(data);
    }
    catch(err){
        console.error(err.message); //for debugging
        return [];
    }
}

async function writeStorage(storageFilePath,data){
    try{
        await fs.writeFile(storageFilePath, JSON.stringify(data, null, 4), { encoding:'utf8', flag:'w' });
        return true;
    }
    catch(err){
        console.error(err.message); //for debugging
        return false;
    }
}

export { readStorage, writeStorage };