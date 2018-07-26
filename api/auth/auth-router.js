const express = require('express');
const passport = require('passport');

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
    router.post('/login', passport.authenticate('local-login', {
        successRedirect: '/about', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
    }));
    router.get('/logout', (req,res) => {
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
