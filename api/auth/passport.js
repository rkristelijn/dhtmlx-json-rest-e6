// load all the things we need
var LocalStrategy = require('passport-local').Strategy;

// load up the user model
//var User       = require('../app/models/user');

// load the auth variables
//var configAuth = require('./auth'); // use this one for testing

module.exports = function (passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        console.log('serializeUser', user);
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        //User.findById(id, function (err, user) {
        //    done(err, user);
        // });
        console.log('deserializeUser', id);
        done(err, user);
    });

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
        function (req, username, password, done) {
            console.log('local-login', username, password);
            if (username)
                username = username.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

            // asynchronous
            process.nextTick(function () {
                return (done(null, { id: '123', username: 'user', password: 'pass' }));
                // User.findOne({ 'local.email': email }, function (err, user) {
                //     // if there are any errors, return the error
                //     if (err)
                //         return done(err);

                //     // if no user is found, return the message
                //     if (!user)
                //         return done(null, false, req.flash('loginMessage', 'No user found.'));

                //     if (!user.validPassword(password))
                //         return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

                //     // all is well, return user
                //     else
                //         return done(null, user);
                // });
            });

        }));

};
