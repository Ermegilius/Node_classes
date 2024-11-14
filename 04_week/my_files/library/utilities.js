'use strict'

const fs = require('fs').promises;
const path = require('path');

const MIMETYPES = require('./mimetypes.json');

function read(filePath) {
    const extension = path.extname(filePath).toLowerCase();//returns an extension of the pathName
    //console.log(extension);
    const mime = MIMETYPES[extension] || { "type": "application/octet-stream", "encoding": "binary" };//octet-stream some binary, usually browsers suggest to download a file of this type
    return fs.readFile(filePath, mime.encoding)
        .then(fileData => ({ fileData, mime }))
        //.then(fileData=> ({fileData:fileData,mime:mime})) //longer version
        .catch(err => err);//just for debugging

    // {
    //     fileData:"",
    //     mime:{type:"", encoding:""}
    // }
} // end of read

function send(res, resource) {//resouece is an object {fileData, mime}
    res.writeHead(200, {
        'Content-Type': resource.mime.type,
        'Content-Length': Buffer.byteLength(resource.fileData, resource.mime.encoding)
    });
    res.end(resource.fileData, resource.mime.encoding)
}

function sendJson(res, jsonResource, statuscode = 200) {
    const jsonData = JSON.stringify(jsonResource);
    res.writeHead(statuscode, {
        'Content-Type': 'application/json'
    });
    res.end(jsonData);
}

function isIn(route, ...routes) {
    for (const start of routes) {
        if (route.startsWith(start)) return true;
    }
    return false;
}

module.exports = { read, send, sendJson, isIn };