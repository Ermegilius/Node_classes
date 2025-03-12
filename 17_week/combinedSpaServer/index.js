'use strict';

const express=require('express');
const path= require('path');

const app=express();

const Reporter = require('./libraries/reportWithAddress');
const config =require('./config.json');

const {compUrl, orderUrl} = config;

const reporter = new Reporter(orderUrl, compUrl);

app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());

const homePath=path.join(__dirname,'menu.html');


app.get('/', (req,res)=>res.sendFile(homePath));

app.get('/report/:orderId', async (req,res)=>{
    const result = await reporter.createReportWithAddress(req.params.orderId);
    res.send(result);
});

// const {port, host}=config;
// app.listen(port, host,
//     () => console.log(`${host}:${port} serving...`));

app.listen(config.port, config.host, 
    ()=>console.log(`${config.host}:${config.port} serving...`));

