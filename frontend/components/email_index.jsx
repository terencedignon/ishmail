var React = require('react');
var EmailStore = require('../stores/email_store.js');
var EmailIndexItem = require('./email_index_item.jsx');

var EmailIndex = React.createClass({
  getInitialState: function () {
    return { emails: EmailStore.all(), view: "inbox"};
  },
  componentDidMount: function () {
    this.eventListener = EmailStore.addListener(this._onChange);
    ApiUtil.getAllEmail();
  },
  componentWillUnmount: function () {
    this.eventListener.remove();
  },
  _onChange: function () {
    var viewState = EmailStore.getViewState();

    var emails = EmailStore.all().filter(function(email) {
      if (viewState === "inbox") return email.compose_set === false;
      if (viewState === "starred") return email.starred_set === true;
      if (viewState === "important") return email.importance_set === true;
      if (viewState === "sent") return email.sent;
      if (viewState === "drafts") return email.sent_set === false;
    });
    this.setState({ emails: emails, view: viewState});
  },
  render: function() {
    var indexItems = this.state.emails.map(function(email) {
        return <EmailIndexItem key={email.id} id={email.id} email={email}/>;
      });
    var email = this.state.emails;
    return (
      <div className="main">
        <ul>
          {indexItems}
        </ul>
      </div>
      );
  }
});


module.exports = EmailIndex;
