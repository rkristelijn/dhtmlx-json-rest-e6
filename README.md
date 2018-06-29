This is a demo project to see how DHTMLX performs using [DHTMLX Optimus Framework](https://docs.dhtmlx.com/optimus__index.html) (DHTMLX in es6) connected to a REST API on Node using JSON and fetch.

# Related projects

1. [Your First App tutorial](https://docs.dhtmlx.com/tutorials__first_app__index.html) showing you the basis or DHX
  1.1 [My version of Your First App](https://github.com/rkristelijn/dhtmlx-grid-rest-api) - where I connect it to a REST API using [dhtmlxDataProcessor](https://docs.dhtmlx.com/dataprocessor__index.html)
2. [CRM System - demo app](https://dhtmlx.com/docs/products/demoApps/dhtmlxCRMSystem/index.html)
  2.1 [My version of CRM System - demo app](https://github.com/rkristelijn/dhtmlx-json-node) - same as above but with working back-end build on Node and REST API
3. [DHTMLX/optimus-starter](https://github.com/DHTMLX/optimus-start) - [DHTMLX Optimus Framework](https://docs.dhtmlx.com/optimus__index.html) - by Stanislaw Wolski
  3.1 [My version of the optimus-starter](https://github.com/rkristelijn/optimus-start) (this project is a fork of that)

# Plan of approach

- [X] Restructure files [feature-oriented instead of type-oriented](https://softwareengineering.stackexchange.com/questions/338597/folder-by-type-or-folder-by-feature)
- [X] Implement the views per es6
- [x] Add missing GUI's to create,update,delete data (sales, events, settings)
- [ ] Restructure data to save dateTypes in real dates, numberTypes in real numbers, implement bounded picklists
- [ ] Add the REST API from [My version of CRM System - demo app](https://github.com/rkristelijn/dhtmlx-json-node)

# Solved challenges
- [x] Structure code in a way that is reusable, easy to read and maintain
- [x] Implement routes to be able to navigate to views and specific records
- [x] Solved url #/contacts/id, alerting when the id is not found in the loaded records, filtering alphanumeric, showing a modal dialogue, highlighting the first record
- [x] fixed the navigation bar, being able to collapse (default) and show using 'hamburger menu'
- [x] Solved back/forward history keeping selected row or item in history
- [x] All views fixed
- [x] Handled events across form and grid, changing fields in grid and form if changed on one
- [x] Fixed validation on grid
- [x] Fixed types: combo, date

# Back log

- [ ] Connect Node REST API: I'm not doing this because I want to create a demo with static content
- [ ] I've learned that all events need to be handled manually across components showing the same data. It would be better if there's a shared model, where components can subscribe on.
- [ ] Bug: when a validation fires, only enter/escape can close the modal dialogue, pressing 'ok' seems to work differently

## Date format

Now that everything is working as in views being readonly, but navigation-able using hyperlinks, pressing F5 etc, let's concern ourselves with putting dates in date-format. Now it is string and that doesn't check that dates are right dates and doesn't sort well.

We have two options:
- ~~[ ] ES6 `Date().getTime()` e.g. `1530015171788`~~
- [x] `Date.toSJON()` e.g. `2012-04-23T18:25:43.511Z` (*my preference*)

### ES6

@see [this](https://stackoverflow.com/questions/38701847/how-can-i-convert-a-date-into-an-integer) by [Alex Bass](https://stackoverflow.com/users/2749986/alex-bass)

```javascript
new Date().getTime() 
// 1530015171788
new Date(1530015171788).toString() 
// "Tue Jun 26 2018 14:12:51 GMT+0200 (CEST)"
```

### Date.toJSON()

@see [here](https://stackoverflow.com/questions/10286204/the-right-json-date-format) by [funroll](https://stackoverflow.com/users/878969/funroll)

"[JSON](http://json.org/) itself **does not** specify how dates should be represented, but JavaScript does.

You *should* use the format emitted by [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)'s [toJSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toJSON) method:

  `2012-04-23T18:25:43.511Z`

Here's why:

1. It's human readable but also succinct
1. It sorts correctly
1. It includes fractional seconds, which can help re-establish chronology
1. It conforms to [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601)
1. ISO 8601 has been well-established internationally for more than a decade
1. ISO 8601 is endorsed by [W3C](http://www.w3.org/TR/NOTE-datetime), [RFC3339](http://tools.ietf.org/html/rfc3339), and [XKCD](http://xkcd.com/1179/)

**That being said**, every date library ever written can understand "milliseconds since 1970". So for easy portability, ThiefMaster is right."

However, I want to use the default dhx format, and is seems to be related to the system format, idk, will find that out later. The backend should provide the right format for the view, because the REST API is in service of the view. This format now seems 'dd/mm/yyyy' -> as my local date format. If it is the same throughout the entire app, it will be ok if no multi lingual stuff is happening. For now let's not fix issues that are not there yet.

## Read Only

This one's easy, just update a css to remove the border and flag the control as read-only using `attributes: ["readonly"], readonly: true, className: 'input-read-only' `

## Single Value Pick List



## Number
## Currency
## Multi Value Pick List
## E-mail
## Phone
## State Machine
## Color Picker
## Multiline and simple format
## Checkbox
## Slider
## Hyperlinks
## Images
## Sales
## Tree-like column
## Grid-like column
## Radio
