"useStrict";

import path from "node:path";
import express from "express";

const app = express();

import fetch from "node-fetch";

//define __dirname and name as BASE
import { fileURLToPath } from "node:url";
const BASE = fileURLToPath(new URL(".", import.meta.url));
//console.log("__dirname", BASE);

import config from "./config.json" with {type: 'json'};
//console.log(config.port, config.host);

app.use(express.json());
app.use(express.static(path.join(BASE, "public")));

const baseUrl = `http://localhost:4000/api/computers`;

app.get('/',(req,res)=>res.sendFile(path.join(BASE, "public/pages/menu.html")));
app.get('/getAll', async (req, res)=> {
    const data = await fetch(baseUrl);
    const result = await data.json();
    res.json(result);
});

app.get('/getOne/:id', async (req,res)=>{
    const id = req.params.id;
    const data = await fetch (`${baseUrl}/${id}`);
    const result = await data.json();
    res.json(result);
});

app.post('/getOne', async (req,res)=>{
    const id = req.body.id;
    const data = await fetch (`${baseUrl}/${id}`);
    const result = await data.json();
    res.json(result);
});

app.post('/remove', async (req,res)=>{
    const key = req.body.id;
    const options = {method: "DELETE"};
    const data = await fetch (`${baseUrl}/${key}`, options);
    const result = await data.json();
    res.json(result);
});

app.post('/add', async (req,res)=>{
    const item = req.body;

    const options = {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
            "Content-Type": "application/json"
        }
    };
    
    const data = await fetch(baseUrl, options);
    const result = await data.json();
    res.json(result);
});

app.post('/add', async (req,res)=>{
    const item = req.body;

    const options = {
        method: "PUT",
        body: JSON.stringify(item),
        headers: {
            "Content-Type": "application/json"
        }
    };

    const data = await fetch(baseUrl, options);
    const result = await data.json();
    res.json(result);
});


app.listen(config.port, config.host, ()=>console.log(`Server is running at http://${config.host}:${config.port}`));












//different ways to get the json file
//define require
// import { createRequire } from "node:module";
// const require = createRequire(import.meta.url);
// const { port, host } = require(path.join(BASE, "config.json"));
// console.log(port, host);

// import fs from "node:fs";
// const config = JSON.parse(fs.readFileSync("./config.json"));
// console.log(config);