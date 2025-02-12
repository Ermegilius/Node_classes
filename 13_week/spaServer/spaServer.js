import path from 'node:path';

import express from 'express';
const app=express();

import fetch from 'node-fetch';

// define __dirname and name that as BASE
import { fileURLToPath } from 'node:url';
const BASE = fileURLToPath(new URL('.',import.meta.url));
// console.log(BASE);

import config from './config.json' with {type:'json'};
// console.log(config);

app.use(express.json());
app.use(express.static(path.join(BASE,'public')));

// const baseUlr ='http://localhost:4000/api/computers'
// const MENUFILE = 'menu.html';

const baseUlr = config.baseUlr
const MENUFILE = config.menufile;

app.get('/',(req,res)=>res.sendFile(path.join(BASE, MENUFILE)));

app.get('/getAll', async (req,res)=>{
    // const data = await fetch('http://localhost:4000/api/computers');
    const data = await fetch(baseUlr);
    const result = await data.json();
    res.json(result);
});

app.get('/getOne/:id',async(req,res)=>{
    const id=req.params.id;
    // const data=await fetch(`http://localhost:4000/api/computers/${id}`);
    const data = await fetch(`${baseUlr}/${id}`);
    const result = await data.json();
    res.json(result);
});

app.post('/getOne',async (req,res)=>{
    const id=req.body.id;
    const data = await fetch(`${baseUlr}/${id}`);
    const result = await data.json();
    res.json(result);
});

app.post('/remove', async (req,res)=>{
    const id=req.body.id;
    const options={
        method:'DELETE'
    };
    const data = await fetch(`${baseUlr}/${id}`,options);
    const result = await data.json();
    res.json(result);
});

app.post('/add', async (req,res)=>{
    const item = req.body;

    const options = {
        method:'POST',
        body:JSON.stringify(item),
        headers:{
            'Content-Type':'application/json'
        }
    };
    const data = await fetch(baseUlr, options);
    const result = await data.json();
    res.json(result);
});

app.post('/update', async (req, res) => {
    const item = req.body;

    const options = {
        method: 'PUT',
        body: JSON.stringify(item),
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const data = await fetch(baseUlr, options);
    const result = await data.json();
    res.json(result);
});


app.listen(config.port,config.host, 
    ()=>console.log(`Server ${config.host}:${config.port} serving...`));



//different ways to get the json file

// //define require
// import { createRequire } from 'node:module';
// const require = createRequire(import.meta.url);

// const config = require('./config.json');
// console.log(config);

// import fs from 'node:fs';
// const config =JSON.parse(fs.readFileSync('./config.json'));
// console.log(config);