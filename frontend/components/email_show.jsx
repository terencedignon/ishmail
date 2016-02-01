var React = require('react');
var EmailStore = require('../stores/email_store.js');
var ReactRouter = require('react-router');
var ApiUtil = require('../util/api_util.js');
var Sidebar = require('../components/sidebar.jsx');
var EmailConstants = require('../constants/email_constants.js');
var EmailStore = require('../stores/email_store.js');
var EmailShowContact = require('../components/email_show_contact.jsx');
var EmailShowItem = require('../components/email_show_item.jsx');

var EmailShow = React.createClass({
  getInitialState: function () {
    return { draft: false, email: ""}
  },
  componentDidMount: function () {
    this.emailListener = EmailStore.addListener(this._onEmailChange);
    ApiUtil.getEmail(this.props.params.id, this.ensureRead(this.props.params.id));
  },
  componentWillUnmount: function () {
    this.emailListener.remove();
  },
  _onEmailChange: function () {
    this.setState({ email: EmailStore.getEmail() });
  },
  ensureRead: function (id) {
    ApiUtil.updateEmail(id, {read_set: true}, EmailConstants.UPDATE_EMAIL);
  },
  render: function() {
    var renderedShow = [];
    var topEmail;
    if (typeof this.state.email === "object" && !(this.state.email instanceof Array)) {
      topEmail = <EmailShowItem email={this.state.email} child={false}/>;
      renderedShow = this.state.email.emails.map(function(childEmail) {
        return <EmailShowItem email={childEmail} child={true}/>;
      });
    } else {
      topEmail = <div></div>;
      renderedShow = <div></div>;
    }

    return (
      <div class="email-show-holder">
      <ul class="email-show-ul">
      {topEmail}
      {renderedShow}
      </ul>
      </div>
    );
  }
});


module.exports = EmailShow;
