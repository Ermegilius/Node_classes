'use strict';

const path = require('path');
const express = require('express');

const app=express();

const { port, host } = require('./config.json');

const Datastorage = require('./storageLayer/dataStorageLayer');
const register = new Datastorage();

const homePath = path.join(__dirname, 'menu.html');

app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));

app.get('/', (req,res)=>res.sendFile(homePath));

// app.get('/keys', (req,res)=>
//     register.KEYS.then(keys=>res.json(keys)));

app.get('/keys', async (req, res) =>
    res.json(await register.KEYS));

// app.get('/all', (req,res)=>
//     register.getAll().then(all=>res.json(all)));

app.get('/all', async(req, res) =>
    res.json(await register.getAll()));


// app.post('/search',(req, res) =>
//    register.get(req.body.value, req.body.key).then(result=>res.json(result)));

app.post('/search', async (req, res) => 
    res.json(await register.get(req.body.value, req.body.key)))

app.post('/add', (req,res)=>
    register.insert(req.body)
        .then(result => res.json(result))
        .catch(error => res.json(error))
);

app.post('/remove', (req,res)=>
    register.remove(req.body.value)
        .then(result => res.json(result))
        .catch(error => res.json(error))
);


app.listen(port,host,
    ()=>console.log(`Server ${host}:${port} serving...`));