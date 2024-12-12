'use strict';

const path=require('path');

const express=require('express');
const app=express();

const port=3000;
const host='localhost';

const homePath=path.join(__dirname,'home.html');
const pageBpath=path.join(__dirname,'pageB.html');

app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res)=>res.sendFile(homePath));
app.get('/pageb',(req,res)=>res.sendFile(pageBpath));
app.post('/data',express.urlencoded({extended:true}),(req,res)=>{
    // console.log('body',req.body);
    res.send(`<h1>${req.body.firstname} ${req.body.lastname}</h1>`)
});
app.post('/datajson',express.json(),(req,res)=>{
    const messageFromBrowser=req.body.message;
    console.log(messageFromBrowser)
    res.json({ message: `Thank you for message ${messageFromBrowser}`});
});

app.listen(port,host, 
    ()=>console.log(`Server ${host}:${port} running`)
);

