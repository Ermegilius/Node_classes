"use strict";

const Datastorage = require("./storageLayer/dataStorageLayer");
const storage = new Datastorage();

//storage.getAll().then(console.log);
//storage.getAll().then(console.log);

const temp = {
    id: 66,
    firstname: "zzz",
    lastname: "xxx",
    department: "xxx",
    salary: 666,
};

storage.update(temp).then(console.log).catch(console.log);
