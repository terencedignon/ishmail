var React = require('react');
var EmailStore = require('../stores/email_store.js');
var ReactRouter = require('react-router');
var ApiUtil = require('../util/api_util.js');
var Sidebar = require('../components/sidebar.jsx');
var EmailConstants = require('../constants/email_constants.js');
var EmailStore = require('../stores/email_store.js');
var EmailShowContact = require('../components/email_show_contact.jsx');
var EmailShowItem = require('../components/email_show_item.jsx');
var EmailShowForm = require('../components/email_show_form.jsx');
var EmailForm = require('../components/email_form.jsx');

var EmailShow = React.createClass({
  getInitialState: function () {
    return { draft: false, email: "", maxList: [], maxAll: false};
  },
  componentDidMount: function () {
    this.emailListener = EmailStore.addListener(this._onEmailChange);
    ApiUtil.getEmail(this.props.params.id, this.ensureRead(this.props.params.id));
  },
  componentWillUnmount: function () {
    this.emailListener.remove();
  },
  clickHandler: function (e) {
    var list = this.state.maxList;
    list.push(e.currentTarget.id);
    this.setState({ maxList: list});
    // debugger
    // this.setState({maxAll: true});
    // this.setState({ })
  },
  _onEmailChange: function () {
    this.setState({ email: EmailStore.getEmail() });
  },
  ensureRead: function (id) {
    ApiUtil.updateEmail(id, {read_set: true}, EmailConstants.UPDATE_EMAIL);
  },
  render: function() {

    if (this.state.email) console.log("all read is" + this.state.email.all_read);
    var renderedShow = [];
    var topEmail;

    if (typeof this.state.email === "object" && !(this.state.email instanceof Array)) {

      topEmail = <EmailShowItem clickHandler={this.clickHandler} max={this.state.maxAll || this.state.maxList.indexOf(this.state.email.id.toString()) !== -1} email={this.state.email} hasChildren={this.state.email.emails.length > 0} child={false}/>;
      renderedShow = this.state.email.emails.map(function(childEmail, i) {
        return <EmailShowItem key={childEmail.id} ensureRead={this.ensureRead} clickHandler={this.clickHandler} max={this.state.maxAll || this.state.maxList.indexOf(childEmail.id.toString()) !== -1} email={childEmail} ensureRead={this.ensureRead} length={this.state.email.emails.length} index={i} child={true}/>;
      }.bind(this));
    } else {
      topEmail = <div></div>;
      renderedShow = <div></div>;
    }

    return (
      <div class="email-show-holder">
      <ul class="email-show-ul">


      {topEmail}
      {renderedShow}
      <EmailShowForm sender={this.state.email.sender} />
      <EmailShowContact email={this.state.email} />
      </ul>
      </div>
    );
  }
});


module.exports = EmailShow;
