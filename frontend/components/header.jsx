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
    return { indexToolbar: true, selectAll: SelectConstants.SELECT_ALL, checked: false };
  },
  componentDidMount: function() {
    this.listener = SelectStore.addListener(this._selectOnChange);
  },
  componentWillUnmount: function () {
    this.listener.remove();
  },
  _selectOnChange: function () {
    if (SelectStore.all().length > 0) {
      this.setState({ indexToolbar: false }); }
    else {
      this.setState({ indexToolbar: true });
    }
  },
  updateAll: function(type) {
    var value;
    if (type === SelectConstants.SELECT_ALL) {
      value = EmailStore.all();
      this.setState({ selectAll: SelectConstants.SELECT_NONE, checked: true });
    } else {
      value = [];
      this.setState({ selectAll: SelectConstants.SELECT_ALL, checked: false });
    }
    // ApiUtil.updateAll(EmailStore.all(), params, type, function() {
  //   return ApiUtil.getAllEmail();
  // }.bind(this));
    SelectActions.toggleSelect(value, type);
  },
  toggleDropDown: function (e) {
    // if (e.currentTarget)
    if (e.target.tagName === "LI") $(".drop-down").toggle();
  },
  callback: function(){
    ApiUtil.getAllEmail();
  },
  toggleRead: function(name) {

    var action = SelectConstants.SELECT_ALL_READ;
    if (name !== action) action = SelectConstants.SELECT_ALL_UNREAD;
    var params = (action === SelectConstants.SELECT_ALL_READ ? { read_set: true } : { read_set: false });
    ApiUtil.updateAll(SelectStore.all(), params, action, this.callback);
    // ApiUtil.updateAll(SelectStore.all(), { read_set: });
  },
  destroyEmail: function() {
    ApiUtil.destroyAll(SelectStore.all(), this.callback);
  },
  render: function () {
    var toolbar;
    var checkClass = (this.state.checked ? "checked-square" : "");
    var checkClassName = "a fa-square-o ";

    if (this.state.indexToolbar) {
      toolbar = <div className="nav-holder">
      <li onClick={this.toggleDropDown}>
      <i onClick={this.updateAll.bind(this, this.state.selectAll)} className={checkClassName + checkClass}></i>
      <div className="drop-down">
        <ul className="drop-down-ul group">
          <li><a onClick={this.updateAll.bind(this, SelectConstants.SELECT_ALL)} href="#">All</a></li>
          <li><a onClick={this.updateAll.bind(this, SelectConstants.SELECT_NONE)} href="#">None</a></li>
          <li><a onClick={this.toggleRead.bind(this, SelectConstants.SELECT_ALL_READ)}  href="#">Read</a></li>
          <li><a onClick={this.toggleRead.bind(this, SelectConstants.SELECT_ALL_UNREAD)} href="#">Unread</a></li>
          <li><a href="#">Starred</a></li>
          <li><a href="#">Unstarred</a></li>
        </ul>
      </div>

      </li>
        <li onClick={ApiUtil.getAllEmail}>
        <i className="fa fa-refresh refresh"></i>
        </li>
        <li>
        <a onClick={this.destroyEmail} href="#">Delete</a>
        </li>

        </div>;
    }

    return (

      <header>
        <div className="header group">
        <div className="top-left">
          <h1><a href="/#">Ishmael</a></h1>
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
