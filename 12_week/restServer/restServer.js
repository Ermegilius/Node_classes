'use strict';

const express=require('express');
const app=express();

const cors=require('cors');

const {port,host} = require('./config.json');

const Datastorage = require('./storageLayer/dataStorageLayer');
const storage = new Datastorage();

app.use(cors());
app.use(express.json());

app.get('/api',(req,res)=>res.json(storage.RESOURCE));

app.get(`/api/${storage.RESOURCE}`, (req,res)=>
    storage.getAll().then(result=>res.json(result))
);

app.get(`/api/${storage.RESOURCE}/:id`,(req,res)=>
    storage.get(req.params.id).then(result=>res.json(result))
);

app.post(`/api/${storage.RESOURCE}`,(req,res)=>
    storage.insert(req.body)
        .then(result=>res.json(result))
        .catch(err=>res.json(err))
);

app.put(`/api/${storage.RESOURCE}`, (req, res) =>
    storage.update(req.body)
        .then(result => res.json(result))
        .catch(err => res.json(err))
);

app.delete(`/api/${storage.RESOURCE}/:id`,(req,res)=>
    storage.remove(req.params.id)
        .then(result=>res.json(result))
        .catch(err=>res.json(err))
);

app.all('*', (req,res)=>res.json('not supported'));

app.listen(port,host, ()=>console.log(`Restserver ${host}:${port} serving`));