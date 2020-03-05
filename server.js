//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const session = require('express-session')


//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
require('dotenv').config()
const app = express ();
const db = mongoose.connection;
const PORT = process.env.PORT || 3000;


//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// const MONGODB_URI = 'mongodb://localhost/ohmycrud';

// Connect to Mongo
mongoose.connect(MONGODB_URI ,  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
    }, () => {
    console.log('the connection with mongo is established at', MONGODB_URI);
});

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

// open the connection to mongo
db.on('open' , ()=>{});

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}))

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form

//Controllers
const storiesController = require('./controllers/stories_controller.js')
app.use('/stories', storiesController)
const sessionsController = require('./controllers/sessions_controller.js')
app.use('/sessions', sessionsController)
const userController = require('./controllers/users_controller.js')
app.use('/users', userController)


//___________________
// Routes
//___________________
//localhost:3000
app.get('/' , (req, res) => {
  res.redirect('/stories');
});

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));
