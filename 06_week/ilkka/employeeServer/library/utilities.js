'use strict';

const fs=require('fs').promises;
const path = require('path');

const MIMETYPES=require('./mimetypes.json');

function read(filePath){
    const extension=path.extname(filePath).toLowerCase();
    // console.log(extension);
    const mime = MIMETYPES[extension] || { 
                                            "type": "application/octet-stream", 
                                            "encoding": "binary" 
                                         };
    return fs.readFile(filePath, mime.encoding)
            .then(fileData=>({fileData,mime}))
            // .then(fileData => ({ fileData: fileData, mime: mime }))
            .catch(err=>err); //just for debugging

        // {
        //     fileData:"",
        //     mime:{type:"", encoding:""}
        // }
} //end of read

function send(res, resource) { //resource is an object {fileData,mime}
    res.writeHead(200,{
        'Content-Type':resource.mime.type,
        'Content-Length':Buffer.byteLength(resource.fileData,
                                            resource.mime.encoding)
    });
    res.end(resource.fileData, resource.mime.encoding);
}

function sendJson(res,jsonResource, statuscode=200){
    const jsonData=JSON.stringify(jsonResource);
    res.writeHead(statuscode,{'Content-Type':'application/json'});
    res.end(jsonData);
}

function isIn(route, ...routes){
    for(const start of routes){
        if(route.startsWith(start)) return true;
    }
    return false;
}

const allowedFormats = [
    'application/x-www-form-urlencoded',
    'application/json'
];

async function getEncodedPostData(request) {
    return new Promise((resolve, reject) => {
        const type = request.headers['content-type'];

        if (allowedFormats.includes(type)) {
            const databuffer = [];
            request.on('data', fragment => databuffer.push(fragment));
            request.on('end', () => {
                const data = Buffer.concat(databuffer).toString();
                if (type === 'application/json') {
                    return resolve(JSON.parse(data));
                }
                else {
                    const params = new URLSearchParams(data);
                    const jsonResult = {};
                    params.forEach((value, name) => jsonResult[name] = value);
                    return resolve(jsonResult);
                }
            });
            request.on('error', () => reject('Error during transmission'));
        }
        else {
            reject('Unsupported Content-Type');
        }
    })
}


module.exports = { read, send, sendJson, isIn, getEncodedPostData };

