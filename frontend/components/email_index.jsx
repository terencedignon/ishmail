var React = require('react');
var EmailStore = require('../stores/email_store.js');
var EmailIndexItem = require('./email_index_item.jsx');

var EmailIndex = React.createClass({
  getInitialState: function () {
    return { emails: EmailStore.all() };
  },
  componentDidMount: function () {
    this.eventListener = EmailStore.addListener(this._onChange);
    ApiUtil.getAllEmail();
  },
  componentWillUnmount: function () {
    this.eventListener.remove();
  },
  _onChange: function () {

    this.setState({ emails: EmailStore.all() });
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
