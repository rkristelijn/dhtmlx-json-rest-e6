const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('express-log');
//for login
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

// config
const port = 3000;

//set up for passport
app.use(cookieParser());
app.use(session({
  secret: 'envanjeajajippiejippiejee', // session secret
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login session


// set up middleware
app.use(logger());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// set up connection
mongoose.connect('mongodb://localhost:27017/cms', { useNewUrlParser: true });
mongoose.set('debug', true);
let db = mongoose.connection;

// database events
db.on('error', console.error.bind(console, 'Mongoose:'));
db.once('open', () => {
  console.log('Connected to mongoose');
});

// API connection
const apiRouter = require('./api/api-router')(app, passport);
app.use('/api/api', apiRouter); //todo: proxy doesn't work ok with only '/api'

// starting the app
app.listen(port, () => {
  console.log('listening on *:' + port);
});
