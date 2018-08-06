const express = require('express');

let routes = (app, passport) => {
  let apiRouter = express.Router();

  const contactsRouter = require('./contacts/contacts-router')(app, passport);
  const projectsRouter = require('./projects/projects-router')(app, passport);
  const settingsRouter = require('./settings/settings-router')(app, passport);
  const eventsRouter = require('./events/events-router')(app, passport);
  const storiesRouter = require('./agile/stories/stories-router')(app, passport);
  const usersRouter = require('./users/users-router')(app, passport);
  const authRouter = require('./auth/auth-router')(app, passport);

  apiRouter.use('/contacts', contactsRouter);
  apiRouter.use('/projects', projectsRouter);
  apiRouter.use('/settings', settingsRouter);
  apiRouter.use('/events', eventsRouter);
  apiRouter.use('/stories', storiesRouter);
  apiRouter.use('/users', usersRouter);
  apiRouter.use('/auth', authRouter);

  apiRouter.get('/', (req, res) => {
    res.json({
      contacts: { links: `${req.protocol}://${req.headers.host}/api/contacts` },
      projects: { links: `${req.protocol}://${req.headers.host}/api/projects` },
      settings: { links: `${req.protocol}://${req.headers.host}/api/settings` },
      events: { links: `${req.protocol}://${req.headers.host}/api/events` },
      users: { links: `${req.protocol}://${req.headers.host}/api/users` },
      stories: { links: `${req.protocol}://${req.headers.host}/api/stories` },
      auth: { links: `${req.protocol}://${req.headers.host}/api/auth` }
    });


  });

  return apiRouter;
}

module.exports = routes;
