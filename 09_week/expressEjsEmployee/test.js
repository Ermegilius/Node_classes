'use strict';

const Datastorage = require ('./storageLayer/dataStorageLayer');
const storage = new Datastorage();

storage.getAll().then(console.log);
