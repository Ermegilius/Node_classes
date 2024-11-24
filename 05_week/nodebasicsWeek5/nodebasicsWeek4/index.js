'use strict';

const http = require('http');
const path = require('path');

const {port,host}=require('./config.json');

const { read, send, sendJson, isIn }=require('./library/utilities');
const { 
    getAllFlavors, 
    getIceCream, 
    hasFlavor } =require('./iceCreamStorage/iceCreamFreezer');

const homePath=path.join(__dirname,'home.html');

const resourceRoutes=['/styles/', '/js/', '/images/', '/favicon'];

const server = http.createServer(async (req,res)=>{
    const {pathname}=new URL(`http://${req.headers.host}${req.url}`);
    const route=decodeURIComponent(pathname);
    try{
        if(route==='/'){
            const result=await read(homePath);
            send(res,result);

            // send(res, await read(homePath));
        }
        else if(isIn(route, ...resourceRoutes)){
            const result=await read(path.join(__dirname,route));
            send(res,result);
            //send(res,await read(path.join(__dirname,route)));
        }
        else if(route==='/flavors'){
            const flavors=await getAllFlavors();
            sendJson(res, flavors);
        }
        else if(isIn(route, '/icecreams/')){ //route could be /icecreams/vanilla
            const pathParts=route.split('/');
            if(pathParts.length>2){
                const iceCreamFlavor=pathParts[2];
                if(await hasFlavor(iceCreamFlavor)){
                    const iceCream=await getIceCream(iceCreamFlavor);
                    sendJson(res,iceCream);
                }
                else{
                    sendJson(res,{message:'Icecream not found'},404);
                }
            }
            else{
                sendJson(res,{message:'flavor missing'},404);
            }
        }
        else{
            sendJson(res,{message:'Not found'},404);
        }
    }
    catch(err){
        sendJson(res,{message:err.message},500)
    }
});

server.listen(port,host,()=>console.log(`Server ${host}:${port} listening...`));
