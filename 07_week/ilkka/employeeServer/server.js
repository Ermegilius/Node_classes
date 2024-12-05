'use strict';

const http=require('http');
const path=require('path');

const {port,host} = require('./config.json');

const { 
    read,
    send,
    sendJson,
    isIn, 
    getEncodedPostData 
}=require('./library/utilities');

const Datastorage=require('./storageLayer/dataStorageLayer');
const register=new Datastorage();

const resourceRoutes=[
    '/favicon',
    '/pages/',
    '/styles/',
    '/js/',
    '/images/'
];

const homePath=path.join(__dirname,'menu.html');
const statusPagePath=path.join(__dirname,'pages','status.html');

const server=http.createServer(async (req,res)=>{
    const {pathname} =new URL(`http://${req.headers.host}${req.url}`);
    const route = decodeURIComponent(pathname);

    const method=req.method.toUpperCase();

    if(method==='GET'){
        if(route==='/'){
            const result=await read(homePath);
            send(res,result); 
        }
        else if(route==='/keys'){
            sendJson(res, await register.KEYS);
        }
        else if(route==='/all'){
            sendJson(res,await register.getAll());
        }
        else if(isIn(route, ...resourceRoutes)){
            const result=await read(path.join(__dirname,route));
            if(result.fileData){
                send(res,result);
            }
            else{
                send(res,await read(homePath));
            }
        }
        else{
            sendJson(res, { message: 'Resource not found', type: register.TYPES.ERROR},404);
        }
    }
    else if(method==='POST'){
        if(route==='/search'){
            const body = await getEncodedPostData(req);
            sendJson(res, await register.get(body.value, body.key));
        }
        else if(route==='/add'){
            const body = await getEncodedPostData(req);
            register.insert(body)
                .then(result=>sendJson(res,result))
                .catch(error=>sendJson(res,error));
        }
        else if(route==='/add2'){
            async function sendStatus(res, result){
                const page=await read(statusPagePath);
                let data=page.fileData.replace('###CLASS###', result.type);
                data=data.replace('###TYPE###',result.type.toUpperCase());
                page.fileData=data.replace('###MESSAGE###', result.message);
                send(res,page);
            }

            const body = await getEncodedPostData(req);
            register.insert(body)
                .then(result => sendStatus(res, result))
                .catch(error => sendStatus(res, error));
        }
        else if(route==='/remove'){
            const body = await getEncodedPostData(req);
            register.remove(body.value)
                .then(result => sendJson(res, result))
                .catch(error => sendJson(res, error));
        }
        else{
            sendJson(res,{message:'Resource not found', type:register.TYPES.ERROR},404);
        }
    }
    else{
        sendJson(res, { message: 'method not in use', type: register.TYPES.ERROR }, 405); 
    }
});//end of server

server.listen(port,host,
    ()=>console.log(`Server ${host}:${port} serving`));