'use strict';

const Datastorage = require('./storageLayer/dataStorageLayer');
const storage=new Datastorage();

// storage.getAll().then(console.log);
storage.get(1).then(console.log);