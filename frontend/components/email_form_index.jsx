var React = require('react');
var EmailStore = require('../stores/email_store.js');
var EmailActions = require('../actions/email_actions.js');
var EmailForm = require('./email_form.jsx');
var ApiUtil = require('../util/api_util.js');
var DraftStore = require('../stores/draft_store.js');


var EmailFormIndex = React.createClass({
  getInitialState: function() {
    return { formIndexItems: [] };
  },
  componentDidMount: function () {
    this.listener = DraftStore.addListener(this._onChange);
    // ApiUtil.getAllEmail();
    EmailActions.getComposeSet();
  },
  componentWillUnmount: function () {
    this.listener.remove();
  },
  _onChange: function () {
    this.setState({ formIndexItems: EmailStore.getComposeSet() });
  },
  render: function() {
    var formItems = this.state.formIndexItems.map(function(draft) {
      return <li key={Math.random()}><EmailForm email={draft} /></li>;
    });

    return (
      <ul className="form-holder">{formItems}</ul>
    );
  }


});

module.exports = EmailFormIndex;
