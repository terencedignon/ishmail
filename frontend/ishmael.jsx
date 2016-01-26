var React = require('react');
var ReactDom = require('react-dom');

var Router = require('react-router').Router;
var ReactDOM = require('react-dom');
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var App = require('./components/app.jsx');
var EmailShow = require('./components/email_show.jsx');

var routes = (<Route path="/" component={App}>
                <IndexRoute component={EmailIndex} />
              </Route>
            );

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(
    <Router>{routes}</Router>,
      document.getElementById('root')
  );
});
