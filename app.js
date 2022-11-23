const express = require ('express');
const mysql = require ('mysql');
const dotenv = require ('dotenv');
const path = require ('path');
const cookieParser = require ('cookie-parser');

dotenv.config ({path: './.env'});

const app = express();

const db = mysql.createConnection ({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER, 
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE
    /*host: 'localhost',
    user: 'root', 
    port: 3307,
    password: '',
    database: 'nodejs-login'*/
})

const publicDirectory = path.join (__dirname, './public');
app.use (express.static (publicDirectory));

//parse url-encoded bodies (as sent by html forms)
app.use (express.urlencoded ({extended: false}));
//parse json bodies as sent by html forms
app.use (express.json());


app.use (cookieParser ());


app.set ('view engine', 'hbs');


db.connect( (error)=> {
    if (error) {
        console.log(error)
    }
    else {
        console.log ("Mysql connected");
    }
})

app.use ('/', require('./routes/pages'));
app.use ('/auth', require('./routes/auth'));

const port = process.env.PORT || 8000;

app.listen (port, ()=> {
    console.log ('server started on port 8000')
})

