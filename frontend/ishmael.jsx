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
SpamStore = require('./stores/spam_store.js');
var SessionForm = require('./components/sessions/new');
var UserForm = require('./components/users/user_form');
CurrentUserStore = require('./stores/current_user_store');
SessionsApiUtil = require('./util/sessions_api_util');
// CurrentUserStore = require("./../stores/current_user_store");

var App = React.createClass({
  componentDidMount: function () {
     CurrentUserStore.addListener(this.forceUpdate.bind(this));
      SessionsApiUtil.fetchCurrentUser();
  },
  render: function() {
    if (!CurrentUserStore.userHasBeenFetched()) {
     return <p>Loading</p>;
   }
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


function _ensureLoggedIn(nextState, replace, callback) {


  if (CurrentUserStore.userHasBeenFetched()) {
    _redirectIfNotLoggedIn(); // this function below
  } else {

    SessionsApiUtil.fetchCurrentUser(_redirectIfNotLoggedIn);
  }

  function _redirectIfNotLoggedIn() {
    if (!CurrentUserStore.isLoggedIn()) {
      replace({}, "/login");
    }
    callback();
  }
};

var routes = (
              <Router>
                <Route path="login" component={ SessionForm }/>
                <Route path="signup" component={ UserForm }/>
                <Route path="/" component={App}  onEnter={_ensureLoggedIn}  >
                <IndexRoute component={EmailIndex} />
                <Route path="search" component={Search}/>
                <Route path="inbox/:id" component={EmailShow}/>
                </Route>
              </Router>
            );

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(
    routes,
      document.getElementById('root')
  );
});
