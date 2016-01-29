var React = require('react');
var EmailStore = require('../stores/email_store.js');
var EmailIndexItem = require('./email_index_item.jsx');
var EmailActions = require('../actions/email_actions.js');
var ApiUtils = require('../util/api_util.js');
var Sidebar = require('./sidebar.jsx');
var EmailFormIndex = require('./email_form_index.jsx');
var SelectStore = require('../stores/select_store.js');
var SelectActions = require('../actions/select_actions.js');

var EmailIndex = React.createClass({
  getInitialState: function () {
    return { emails: EmailStore.all(), view: "inbox", selectEmails: SelectStore.all() };
  },
  componentDidMount: function () {
    this.emailListener = EmailStore.addListener(this._onEmailChange);
    this.selectListener = SelectStore.addListener(this._onSelectChange);
    ApiUtil.getAllEmail();
  },
  componentWillUnmount: function () {
    this.eventListener.remove();
  },
  _onEmailChange: function () {
    if (EmailStore.getViewState() !== this.state.view) {
      this.setState({ emails: EmailStore.setFilterEmails(),
        view: EmailStore.getViewState()});
    } else {
      this.setState({ emails: EmailStore.setFilterEmails()});
    }
  },
  _onSelectChange: function () {

    this.setState({ selectEmails: SelectStore.all() });
  },
  render: function() {
    headerNav = <ul className="index-header">
      <li><i className="fa fa-inbox"></i> Primary</li>
      <li><i className="fa fa-users"></i> Social</li>
      <li><i className="fa fa-tags"></i> Promotions</li>
      <li><i className="fa fa-info-circle"></i>Updates</li>
      <li><i className="fa fa-comments"></i> Forums</li>
    </ul>;



    var indexItems = <div></div>;
    if (!(typeof this.state.emails === "undefined")) {
      var indexItems = this.state.emails.map(function(email) {
        if (this.state.selectEmails.indexOf(email.id) !== -1) {
          return <EmailIndexItem key={email.id} id={email.id} email={email} checked="true"/>;
        } else {
          return <EmailIndexItem key={email.id} id={email.id} email={email} checked="false"/>;
        }}.bind(this));
    }
    var email = this.state.emails;
    return (
      <div className="content-container group">
        <Sidebar />
        <EmailFormIndex />
        {this.props.children}
        <div className="main group">
          {headerNav}

          <ul>
            {indexItems}
          </ul>
        </div>
      </div>

      );
  }
});


module.exports = EmailIndex;
