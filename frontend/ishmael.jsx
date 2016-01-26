var React = require('react');
var ReactDom = require('react-dom');

var Router = require('react-router');
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var App = require('../components/app.jsx');
var EmailShow = require('../components/email_show.jsx');

var routes = (
  <Route path="/" component={App}>
      <Route path="inbox/emailID" component={EmailShow} />
    </Route>
);

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(
    <Router>{routes}</Router>,
      document.getElementById('root')
  );
});
