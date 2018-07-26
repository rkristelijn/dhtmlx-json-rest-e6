const express = require('express');
const contactsRouter = require('./contacts/contacts-router')();
const projectsRouter = require('./projects/projects-router')();
const settingsRouter = require('./settings/settings-router')();
const eventsRouter = require('./events/events-router')();
const storiesRouter = require('./agile/stories/stories-router')();
const usersRouter = require('./users/users-router')();

let routes = (app, passport) => {
  let apiRouter = express.Router();

  apiRouter.use('/contacts', contactsRouter);
  apiRouter.use('/projects', projectsRouter);
  apiRouter.use('/settings', settingsRouter);
  apiRouter.use('/events', eventsRouter);
  apiRouter.use('/stories', storiesRouter);
  apiRouter.use('/users', usersRouter);

  apiRouter.get('/', (req, res) => {
    res.json({
      contacts: { links: `${req.protocol}://${req.headers.host}/api/contacts` },
      projects: { links: `${req.protocol}://${req.headers.host}/api/projects` },
      settings: { links: `${req.protocol}://${req.headers.host}/api/settings` },
      events: { links: `${req.protocol}://${req.headers.host}/api/events` },
      users: { links: `${req.protocol}://${req.headers.host}/api/users` },
      storiesRouter: { links: `${req.protocol}://${req.headers.host}/api/stories` }
    });
  });

  return apiRouter;
}

module.exports = routes;
