const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');

//set our views directory
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/css', express.static('assets/css'));
app.use('/javascript', express.static('assets/javascript'));
app.use('/images', express.static('assets/images'));

//Mongo access 
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI, {
    auth:{
        user: process.env.DB_USER,
        password: process.env.DB_PASS
    },
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(err => console.error(`Error: ${err}`));

//we need to deal with it before routes
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

//setup our session
const session = require('express-session');
app.use(session({
    secret: 'any salty secret here',
    //letting the app to save itself without creating any new session
    resave: true,
    saveUninitialized: false
}));

//setup flash notification
const flash = require('connect-flash');
app.use(flash());
app.use('/',(req,res,next) =>{
    //setting default locals
    res.locals.pageTitle  = 'untitled';
    res.locals.formData = req.session.formData || {};
    req.session.formData = {};
    //passing along flash messages
    res.locals.flash = req.flash();
    console.log(res.locals.flash);
    next();
})


//we do not want to publish it, anyone can access our cluster and create a havoc and then I will be responsible for it

//other routes
const routes = require('./routes.js');
app.use('/', routes);

//Start our server
const port = process.env.PORT || 3000;
app.listen(port, ()  => console.log(`Listening on port ${port}`));
