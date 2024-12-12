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
        res.render('userList',{
            titte: 'users',
            header: 'User List',
            users: Object.keys(users)
        });
        //res.render('errorPage',{username});
    }
});
/* app.post('/login', (req, res) => {
    res.render('result', {
        title: 'Your data',
        header: 'You sent this',
        data:{
            username: req.body.username,
            password: req.body.password
        }
    });
}); */

app.listen(port, host, () => {
    console.log(`Server is running at ${host}:${port}`);
});