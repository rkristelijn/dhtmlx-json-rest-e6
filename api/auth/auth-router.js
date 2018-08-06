const express = require('express');
//const passport = require('passport');
// authenticateMiddleware = require('./auth-middleware');
//const Model = require('./stories-model');
//const controller = require('./stories-controller')(Model);

let routes = (app, passport) => {
    let router = express.Router();
    //   router.get('/', (req, res) => {
    //     controller.readAll((err, rows) => {
    //       if (err) {
    //         res.sendStatus(400).end(err);
    //       } else {
    //         res.json(rows);
    //       }
    //     });
    //   });
    //   router.put('/:id', (req, res) => {
    //     controller.updateOne(req.params.id, req.body, (err, row) => {
    //       if (err) {
    //         res.sendStatus(400).end(err);
    //       } else {
    //         res.json(row);
    //       }
    //     });
    //   });
    router.get('/login', (req, res) => {
        console.log('auth-router.js', '/login', 'GET');
        res.send('login page');
    });
    // router.get('/loggedin', (req, res) => {
    //     console.log('auth-router.js', '/loggedin', req.user, req.isAuthenticated());
    //     res.send(req.user);
    // });
    // router.get('/profile', passport.authenticateMiddleware(), (req, res) => {
    //     res.send('hello world');
    // });
    router.post('/login', 
    passport.authenticate('local', { failureRedirect: '/login', }, 
    (req, res) => {
        console.log('post', '/login', req.user);
        res.redirect('/');
    }));
    // router.post('/login', (req,res)=> {
    //     console.log('auth-router.js', '/login', 'POST');
    // });
    router.get('/logout', (req, res) => {
        console.log('auth-router.js', '/logout', req.user, req.isAuthenticated())
        req.logout();
        res.redirect('/');
    });
    //   router.delete('/:id', (req, res) => {
    //     controller.deleteOne(req.params.id, (err) => {
    //       if (err) {
    //         res.sendStatus(400).end(err);
    //       } else {
    //         res.sendStatus(204).end(req.params.id + " removed");
    //       }
    //     });
    //   });

    return router;
}
module.exports = routes;
