const express = require('express');
const Contacts = require('./contacts-model');
const contactsController = require('./contacts-controller')(Contacts);
//const authenticationMiddleware = require('../auth/auth-middleware');

let routes = () => {
  let contactsRouter = express.Router();

  function authenticationMiddleware(req, res, next) {
    console.log('isAuthenticated:', req.isAuthenticated());
    if (req.isAuthenticated()) {
      return next()
    }
    //res.send('not logged in')
    res.redirect('/#auth/login')
  }


  contactsRouter.get('/', authenticationMiddleware, (req, res) => {
    contactsController.readAll((err, contacts) => {
      if (err) {
        res.sendStatus(400).end(err);
      } else {
        res.json(contacts);
      }
    });
  });

  contactsRouter.put('/:id', authenticationMiddleware, (req, res) => {
    contactsController.updateOne(req.params.id, req.body, (err, contact) => {
      if (err) {
        res.sendStatus(400).end(err);
      } else {
        res.json(contact);
      }
    });
  });

  contactsRouter.post('/', authenticationMiddleware, (req, res) => {
    contactsController.createOne(req.body, (err, contact) => {
      if (err) {
        res.sendStatus(400).end(err);
      } else {
        res.json(contact);
      }
    });
  });

  contactsRouter.delete('/:id', authenticationMiddleware, (req, res) => {
    contactsController.deleteOne(req.params.id, (err) => {
      if (err) {
        res.sendStatus(400).end(err);
      } else {
        res.sendStatus(204).end(req.params.id + " removed");
      }
    });
  });

  return contactsRouter;
}

module.exports = routes;
