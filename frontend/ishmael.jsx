var React = require('react');
var ReactDom = require('react-dom');

var Router = require('react-router').Router;
var ReactDOM = require('react-dom');
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var EmailIndex = require('./components/email_index.jsx');
var Sidebar = require('./components/sidebar.jsx');
var Header = require('./components/header.jsx');
var EmailForm = require('./components/email_form.jsx');
ApiUtil = require('./util/api_util.js');
EmailStore = require('./stores/email_store.js');

var App = React.createClass({
  render: function() {
    // ApiUtil.getComposeSet();
    return (
      <div>
      <Header />
      <div className="content-container group">
      <Sidebar />
      <EmailForm />
      {this.props.children}
      </div>
    </div>
    );
  }
});


var routes = (<Route path="/" component={App}>
                <IndexRoute component={EmailIndex}>
                  </IndexRoute>
              </Route>
            );

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(
    <Router>{routes}</Router>,
      document.getElementById('root')
  );
});
