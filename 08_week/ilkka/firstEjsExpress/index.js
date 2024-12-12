'use strict';


const path = require('path');
const express=require('express');
const app=express();

const port=3000;
const host='localhost';

app.set('view engine','ejs');
app.set('views', path.join(__dirname,'pagetemplates'));

app.use(express.urlencoded({extended:true}));

const homePath=path.join(__dirname,'home.html');

app.get('/', (req,res)=>res.sendFile(homePath));

const users={
    matt:'secret',
    mary:'1234',
    jesse:'xyz'
};

// app.post('/login',(req,res)=>{
//     res.render('result',{
//         title:'Your data',
//         header:'You sent these',
//         data:{
//             username:req.body.username,
//             password:req.body.password
//         }
//     }); 
// });

app.post('/login', (req, res) => {
    const {username,password}=req.body;
    if(Object.keys(users).includes(username)&&
        users[username]===password){
        res.render('result', {
            title: 'Your data',
            header: 'You sent these',
            data: {
                username: req.body.username,
                password: req.body.password
            }
        });
    }
    else{
    //    res.render('errorpage',{username}) ;
    res.render('userlist',{
        title:'users',
        header:'users',
        users:Object.keys(users)
    })
    }
});


app.listen(port,host, 
    ()=>console.log(`Server ${host}:${port} serving`));