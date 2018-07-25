const express = require('express');
const Model = require('./stories-model');
const controller = require('./stories-controller')(Model);

let routes = () => {
  let router = express.Router();
  router.get('/', (req, res) => {
    controller.readAll((err, rows) => {
      if (err) {
        res.sendStatus(400).end(err);
      } else {
        res.json(rows);
      }
    });
  });
  router.put('/:id', (req, res) => {
    controller.updateOne(req.params.id, req.body, (err, row) => {
      if (err) {
        res.sendStatus(400).end(err);
      } else {
        res.json(row);
      }
    });
  });
  router.post('/', (req, res) => {
    controller.createOne(req.body, (err, row) => {
      if (err) {
        res.sendStatus(400).end(err);
      } else {
        res.json(row);
      }
    });
  });
  router.delete('/:id', (req, res) => {
    controller.deleteOne(req.params.id, (err) => {
      if (err) {
        res.sendStatus(400).end(err);
      } else {
        res.sendStatus(204).end(req.params.id + " removed");
      }
    });
  });

  return router;
}
module.exports = routes;
