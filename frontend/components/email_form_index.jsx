var React = require('react');
var EmailStore = require('../stores/email_store.js');
var EmailActions = require('../actions/email_actions.js');
var EmailForm = require('./email_form.jsx');
var ApiUtil = require('../util/api_util.js');
var DraftStore = require('../stores/draft_store.js');


var EmailFormIndex = React.createClass({
  getInitialState: function() {
    return { openDrafts: DraftStore.getOpenDrafts()};
  },
  componentDidMount: function () {

    this.draftListener = DraftStore.addListener(this._onDraftChange);
    DraftStore.getOpenDrafts();
  },
  componentWillUnmount: function () {

    this.draftListener.remove();
  },
  _onDraftChange: function () {

    this.setState({ openDrafts: DraftStore.getOpenDrafts() });
  },
  render: function() {
    
    var formItems = this.state.openDrafts.map(function(data) {
      return <li key={Math.random()}><EmailForm minimize={data.minimize_set} save_set={data.save_set} draft={data.draft} /></li>;
    });
    return (
      <ul className="form-holder">{formItems}</ul>
    );
  }


});

module.exports = EmailFormIndex;
