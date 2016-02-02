var React = require('react');
var EmailStore = require('../stores/email_store.js');
var EmailActions = require('../actions/email_actions.js');
var ApiUtil = require('../util/api_util.js');
var EmailConstants = require('../constants/email_constants');
var SelectActions = require('../actions/select_actions.js');
var SelectConstants = require('../constants/select_constants.js');
var SelectStore = require('../stores/select_store.js');
var Search = require('./search.jsx');

var Header = React.createClass({
  getInitialState: function() {
    return { indexToolbar: true, selectAll: SelectConstants.SELECT_ALL, checked: false };
  },
  componentDidMount: function() {
    this.selectListener = SelectStore.addListener(this._selectOnChange);
  },
  componentWillUnmount: function () {
    this.selectListener.remove();
  },
  _selectOnChange: function () {
    if (SelectStore.all().length > 0) {
      this.setState({ indexToolbar: false }); }
    else {
      this.setState({ indexToolbar: true });
    }
  },
  updateAll: function(type) {
    var view = EmailStore.getViewState();
    var value;
    if (type === SelectConstants.SELECT_ALL) {
      if (view === "inbox") {
        value = EmailStore.all();
      } else if (view === "drafts") {
        value = DraftStore.all();
      } else {
        value = EmailStore.getFilterEmails();
      }
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
    // ApiUtil.getAllEmail();


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

    // <li onClick={ApiUtil.getAllEmail}>
    //   <i className="fa fa-refresh refresh"></i>
    // </li>
  //
  // <li className="header-nav-settings"> <i className="fa fa-cog"></i> </li>


    var toolbar;
    var checkClass = (this.state.checked ? "select-all" : "");
    var checkClassName = "a fa-square-o ";
    var selector = <li onClick={this.toggleDropDown}>
      <div className={"square " + checkClass} onClick={this.updateAll.bind(this, this.state.selectAll)} />

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
      ;

    if (this.state.indexToolbar) {
      toolbar =
      <div className="nav-holder">
        {selector}

      </div>;
    } else {
      toolbar = <div className="nav-holder">
        {selector}
      </div>;
    }

    return (
      <header>
        <Search />
        <div className="header-bottom group">
          <div className="bottom-left">

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
