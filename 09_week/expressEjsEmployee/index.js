'use strict';

const path = require('path');
const express = require('express');
const app = express();
const {port, host} = require('./config.json');

const Datastorage = require ('./storageLayer/dataStorageLayer');
const { title } = require('process');
const { stat } = require('fs');
const storage = new Datastorage();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'pages'));

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

const homePath = path.join(__dirname, 'home.html');

app.get('/', (req,res) => {
    res.sendFile(homePath);
});

app.get('/all', (req,res) => {
    storage.getAll()
        .then(data => res.render('allPersons', {result:data}));
});

app.get('/search', (req,res)=>{
    res.render('searchPerson',{
        title: 'Search',
        header: 'Search Person',
        action: '/search'
    });
});

app.post('/search',(req,res)=>{
    if (!req.body) return res.sendStatus(500);
    const id = req.body.id;
    storage.get(id).then(result => res.render('personPage',{
        title: 'Person',
        header: 'Person data',
        result: result,
    }));
});

app.get('/remove', (req,res)=>{
    res.render('searchPerson',{
        title: 'Remove',
        header: 'Search to remove',
        action: '/remove'
    });
});

app.post('/remove', (req, res) => {
    if (!req.body) return res.sendStatus(500);
    const id = req.body.id;
    storage.remove(id)
        .then(status => sendStatusPage(res, status))
        .catch(err => sendErrorPage(res, err));
}); 

app.get('/inputform', (req,res)=>res.render('form', {
        title: 'Add',
        header: 'Add person',
        action: '/input',
        id:{value:'', readonly:''},
        firstname:{value:'', readonly:''},
        lastname:{value:'', readonly:''},
        department:{value:'', readonly:''},
        salary:{value:'', readonly:''}
    })
);

app.post('/input', (req,res)=>{
    storage.insert(req.body)
        .then(status => sendStatusPage(res, status))
        .catch(err => sendErrorPage(res, err));
});

app.get('/inputform2', (req, res) => res.render('form2', {
    title: 'Add',
    header: 'Add person',
    action: '/input',
    fields:[
        {name:'id', value: '', readonly: '' , size:10},
       { name:'firstname', value: '', readonly: '', size:10 },
        {name:'lastname', value: '', readonly: '', size:10 },
       { name:'department', value: '', readonly: '', size:10 },
       { name:'salary', value: '', readonly: '', size:10 }
    ]
}));

app.listen(port,host,
    () => console.log(`Server is running on ${host}:${port}`));


function sendStatusPage(res, status, title='Status', header='Status'){
    return res.render('statusPage',{ title, header, status});
}

function sendErrorPage(res, err, title = 'Error', header = 'Error') {
    return res.render('statusPage', { title, header, status: err });
}