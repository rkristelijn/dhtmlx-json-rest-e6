This is a demo project to see how DHTMLX performs using [DHTMLX Optimus Framework](https://docs.dhtmlx.com/optimus__index.html) (DHTMLX in es6) connected to a REST API on Node using JSON and fetch.

# Related projects

First I created [Your First App tutorial](https://docs.dhtmlx.com/tutorials__first_app__index.html) showing you the basis or DHX [My version of Your First App](https://github.com/rkristelijn/dhtmlx-grid-rest-api) - where I connect it to a REST API using [dhtmlxDataProcessor](https://docs.dhtmlx.com/dataprocessor__index.html). After that I was interested to see how this would interact with multiple views like [CRM System - demo app](https://dhtmlx.com/docs/products/demoApps/dhtmlxCRMSystem/index.html) So I ceated [My version of CRM System - demo app](https://github.com/rkristelijn/dhtmlx-json-node) which is kind of the same as above but with working back-end build on Node and REST API. Also it comes with different improvements. The front-end was still a mess so I started working with [DHTMLX/optimus-starter](https://github.com/DHTMLX/optimus-start) - [DHTMLX Optimus Framework](https://docs.dhtmlx.com/optimus__index.html) - by Stanislaw Wolski. Because the codebase was outdated I created [My version of the optimus-starter](https://github.com/rkristelijn/optimus-start). After that I [rebuild the sample solution using es6-style DHX](https://github.com/rkristelijn/dhtmlx-es6) (see [demo](http://gius.nl/dhtmlx-es6/)) and this projects reconnects the back-end, creating a full featured app.

- [Your First App tutorial](https://docs.dhtmlx.com/tutorials__first_app__index.html) - by DHX
  - [My version of Your First App](https://github.com/rkristelijn/dhtmlx-grid-rest-api)
- [CRM System - demo app](https://dhtmlx.com/docs/products/demoApps/dhtmlxCRMSystem/index.html) - by DHX
  - [My version of CRM System - demo app](https://github.com/rkristelijn/dhtmlx-json-node)
- [DHTMLX optimus-starter](https://github.com/DHTMLX/optimus-start) - by Stanislaw Wolski. 
  - [My version of the optimus-starter](https://github.com/rkristelijn/optimus-start)
    - [rebuild the sample solution using es6-style DHX](https://github.com/rkristelijn/dhtmlx-es6)
      - reintegrated the API (this project)

# Setting up
- `git clone https://github.com/rkristelijn/dhtmlx-json-rest-e6`
- `cd dhtmlx-json-rest-e6`
- `npm i` - to install dependancies
- `npm run seed` - for test data
- `npm start` - for REST API on port :3000 and for starting webpack on :8080 using proxy /api -> localhost:3000/api
- 
# Plan

- [ ] Connect Node REST API
  - [ ] contacts
    - [x] GET (read)
    - [x] PUT (updated)
    - [x] POST (create)
    - [x] DELETE (delete)
    - [x] Bug: when a date is being picked by the grid, the form temporarily will display 'Invalid Date'. it does not seem related to the events, this is because `onRowSelect` is fired upon edit; fixed on contacts
    - [x] Bug: when a validation fires, only enter/escape can close the modal dialogue, pressing 'ok' seems to work differently - kind-of fixed on contacts; edit cell doesn't fire again
    - [x] Feature: the views scream for a controller
    - [x] I've learned that all events need to be handled manually across components showing the same data. It would be better if there's a shared model, where components can subscribe on.
    - [x] fetch for initial GET too
  - [ ] agile-board
    - [ ] create grid and form view
    - [ ] create task/epic view
    - [ ] create progress view - burn-down chart

# Solved challenges
- [x] Feature: Not having to `npm start` and `npm run server` in dev mode
- [x] Bug: why favicon.ico after each call?

# Back log


- [ ] Bug: `npm run build` works partly, I still need to remove `/codebase` from all sources and minification doesn't happen
- [ ] Feature: missing loader indicator when SPA is waiting on data
- [ ] Bug: proxy script adds another api/ so temporariliy fixed this using adjusted route that answers on /api/api
- [ ] Feature: Show errors on REST API error (fetch errors)
- [ ] Clean up unused files
- [ ] Feature: ability to upload avatar picture
- [ ] Feature: oAuth
