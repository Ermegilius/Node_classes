'use strict';

const path = require('path');
const express = require('express');
const app = express();

const port = 3000;
const host = 'localhost';

app.set('view engine', 'ejs');//default engine is ejs
app.set('views', path.join(__dirname, 'pagetemplates'));

app.use(express.urlencoded({ extended: true }));

const homePath = path.join(__dirname, 'home.html');

app.get('/', (req, res) => res.sendFile(homePath));

const users={
    matt: 'secret',
    mary: '1234',
    jessy: 'xyz'
};

app.post('/login', (req, res) => {
    const {username,password }= req.body;
    if(Object.keys(users).includes(username) &&
        users[username] === password){
        res.render('result', {
            title: 'Your data',
            header: 'You sent this',
            data:{
                username: req.body.username,
                password: req.body.password
            }
        });
    } else {
        res.render('errorpage',{username});
    }
});

app.get('/userlist', (req, res) => {
 res.render('userList',{
    title: 'users',
    header: 'Users',
    users: Object.keys(users)
 });
});

app.get('/cars', (req, res) => {
    const cars = [
        {model: 'Fast', license: '1234'},
        {model: 'Slow', license: '2234'},
        {model: 'Med', license: '3234'},
        {model: 'F??', license: '4234'},
    ];
    res.render('cartable',{cars});
});

app.get('/carsif', (req, res) => {
    const cars = [
        {model: 'Fast', license: '1234'},
        {model: 'Slow', license: '2234'},
        {model: 'Med', license: '3234'},
    ];
    res.render('cartableif',{cars});
});

app.listen(port, host, () => {
    console.log(`Server is running at ${host}:${port}`);
});