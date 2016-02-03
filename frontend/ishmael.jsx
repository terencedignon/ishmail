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
var Search = require('./components/search.jsx');
EmailStore = require('./stores/email_store.js');
SelectStore = require('./stores/select_store.js');
var EmailShow = require('./components/email_show.jsx');
DraftStore = require('./stores/draft_store.js');
SearchStore = require('./stores/search_store.js');
EmailFormIndex = require('./components/email_form_index.jsx');
ContactStore = require('./stores/contact_store.js');

var App = React.createClass({
  render: function() {
    // ApiUtil.getComposeSet();
    return (
      <div>
      <Header />
      <Sidebar />
      <EmailFormIndex />
      {this.props.children}
    </div>
    );
  }
});

// <Route path="inbox/:emailID" component={EmailShow

var routes = (<Route path="/" component={App}>
                <IndexRoute component={EmailIndex}/>
                <Route path="search" component={Search}/>
                <Route path="inbox/:id" component={EmailShow}/>
              </Route>
            );

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(
    <Router>{routes}</Router>,
      document.getElementById('root')
  );
});
