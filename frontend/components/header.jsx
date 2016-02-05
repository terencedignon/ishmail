var React = require('react');
var EmailStore = require('../stores/email_store.js');
var EmailActions = require('../actions/email_actions.js');
var ApiUtil = require('../util/api_util.js');
var EmailConstants = require('../constants/email_constants');
var SelectActions = require('../actions/select_actions.js');
var SelectConstants = require('../constants/select_constants.js');
var SelectStore = require('../stores/select_store.js');
var Search = require('./search.jsx');
var History = require('react-router').History;
var EmailStore = require('../stores/email_store.js');
var SpamConstants = require('../constants/spam_constants.js');

var Header = React.createClass({
  mixins: [History],
  getInitialState: function() {
    return { show: false, indexToolbar: true, selectAll: SelectConstants.SELECT_ALL, checked: false };
  },
  componentDidMount: function() {
    this.selectListener = SelectStore.addListener(this._onSelectChange);
    this.emailListener = EmailStore.addListener(this._onEmailChange);
  },
  componentWillUnmount: function () {
    this.selectListener.remove();
    this.emailListener.remove();
  },
  _onEmailChange: function() {

    var view = EmailStore.getViewState();
    if (view === "show") {
      this.setState({ show: true, view: view, indexToolbar: false});
    } else if (SelectStore.all().length > 0) {
      this.setState({ show: false, view: view, indexToolbar: false});
    } else {
      this.setState({ show: false, view: view, indexToolbar: true});
    }

  },
  _onSelectChange: function () {
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
      } else if (view === "spam") {
        value = SpamStore.all();
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
  pushBack: function () {
    window.history.back();

  },

  archiveHandler: function () {
    callback = function (data) {
      EmailActions.destroyAll(data);
    }.bind(this);

    if (!this.state.show) {
      ApiUtil.updateAll( SelectStore.all(), {archive_set: true} );
    } else {
    ApiUtil.updateAll( [ EmailStore.getCurrentID() ], {archive_set: true}, EmailConstants.DESTROY_EMAIL, callback );
    this.history.pushState( null, "/", {} );
    }
  },

  spamHandler: function (name) {
    var spamOn = { spam_set: true };
    callback = function (data) {
      EmailActions.destroyAll(data);
    }.bind(this);

    if (!this.state.show) {
      ApiUtil.updateAll( SelectStore.all(), spamOn, SpamConstants.GET_SPAM, callback );
    } else {
    ApiUtil.updateAll([ EmailStore.getCurrentID() ], spamOn, EmailConstants.DESTROY_EMAIL, callback );
    this.history.pushState( null, "/", {} );
  }
  },

  trashHandler: function () {
      if (!this.state.show) {

        ApiUtil.destroyAll( SelectStore.all() );
      } else {
      ApiUtil.destroyAll( [ EmailStore.getCurrentID() ] );
      this.history.pushState( null, "/", {} );
    }
      // if (this.state.show) {
      //
      //   ApiUtil.destroyAll([EmailStore.getCurrentID()]);
      //   this.history.pushState(null, "/", {});
      // } else {
      //   ApiUtil.destroyAll(SelectStore.all());
      // }
  },
  toggleRead: function(name) {

    var action = SelectConstants.SELECT_ALL_READ;
    if (name !== action) action = SelectConstants.SELECT_ALL_UNREAD;
    var params = (action === SelectConstants.SELECT_ALL_READ ? { read_set: true } : { read_set: false });
    ApiUtil.updateAll(SelectStore.all(), params, action, this.callback);
    // ApiUtil.updateAll(SelectStore.all(), { read_set: });
  },
  // destroyEmail: function() {
  //   if (this.state.show) {
  //     var id = this.props.params.id;
  //   }
  //
  //   ApiUtil.destroyAll(SelectStore.all(), this.callback);
  // },
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
            <ul className="drop-down-ul">
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

    var spamButton = <li onClick={this.spamHandler} className="nav-spam"><i className="fa fa-exclamation-triangle"></i></li>;

    if (EmailStore.getViewState() === "spam") {
      spamButton = <li onClick={this.unSpamHandler} className="nav-spam">Not Spam</li>;
    }

      if (this.state.show) {
        selector = <li onClick={this.pushBack}>
          <div className="nav-back">
            <i className="fa fa-arrow-left"></i>
          </div>
        </li>;
      }


    if (this.state.indexToolbar) {
      toolbar =
      <div className="nav-holder">
        {selector}
      </div>;
    } else {
      toolbar = <div className="nav-holder">
        {selector}
        <li className="nav-archive" onClick={this.archiveHandler  }><i className="fa fa-archive"></i></li>
        {spamButton}
        <li onClick={this.trashHandler} className="nav-delete"><i className="fa fa-trash"></i></li>
        <li className="more">More</li>

      </div>;
    }

    return (
      <header>
        <Search useCase="email" />
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
