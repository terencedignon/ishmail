var React = require('react');
var EmailStore = require('../stores/email_store.js');
var EmailActions = require('../actions/email_actions.js');
var ApiUtil = require('../util/api_util.js');
var EmailConstants = require('../constants/email_constants');
var SelectActions = require('../actions/select_actions.js');
var SelectConstants = require('../constants/select_constants.js');
var SelectStore = require('../stores/select_store.js');

var Header = React.createClass({
  getInitialState: function() {
    return { indexToolbar: true };
  },
  updateAll: function(type) {
    var value;
    if (type === SelectConstants.SELECT_ALL) value = EmailStore.all();
    if (type === SelectConstants.SELECT_NONE) value = [];
    // ApiUtil.updateAll(EmailStore.all(), params, type, function() {
  //   return ApiUtil.getAllEmail();
  // }.bind(this));
    SelectActions.toggleSelect(value, type);
  },
  destroyEmail: function() {
    ApiUtil.destroyAll(SelectStore.all());
  },
  render: function () {
    var toolbar;
    if (this.state.indexToolbar) {
      toolbar = <div>
        <li>
        <a onClick={this.updateAll.bind(this, SelectConstants.SELECT_ALL)} href="#">Select All</a>
        </li>
        <li>
        <a onClick={this.updateAll.bind(this, SelectConstants.SELECT_NONE)} href="#">Select None</a>
        </li>
        <li>
        <a onClick={this.destroyEmail} href="#">Delete</a>
        </li>
        <li>
        <i className="fa fa-refresh"></i>
        </li>
        <li>
        hello
        </li></div>;
    }

    return (
      <header>
        <div className="header group">
        <div className="top-left">
          <h1>Ishmael</h1>
        </div>
        <div className="top-right">
          <input type="text"/>
          <button><i className ="fa fa-search"></i></button>

        </div>
        <div className="bottom-left">
          &nbsp;
        </div>
        <div className="bottom-right">
          <ul className="header-nav group">
            {toolbar}
          </ul>
        </div>
      </div>

      </header>
    );

  }

});

module.exports = Header;
