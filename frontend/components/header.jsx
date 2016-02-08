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
var SessionsApiUtil = require('../util/sessions_api_util.js');
var FlashStore = require('../stores/flash_store.js');
var FlashActions = require('../actions/flash_actions.js');

var Header = React.createClass({
  mixins: [History],
  getInitialState: function() {
    return { flash: "", show: false, indexToolbar: true, selectAll: SelectConstants.SELECT_ALL, checked: false };
  },
  componentDidMount: function() {
    this.selectListener = SelectStore.addListener(this._onSelectChange);
    this.emailListener = EmailStore.addListener(this._onEmailChange);
    this.flashListener = FlashStore.addListener(this._onFlashChange);
  },
  componentWillUnmount: function () {
    this.selectListener.remove();
    this.emailListener.remove();
    this.flashListener.remove();
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
  _onFlashChange: function () {
    if (this.flashInterval) clearInterval(this.flashInterval);
    this.setState({ flash: FlashStore.message()});
    this.flashInterval = setInterval(function() {
      this.setState({ flash: "" });
    }.bind(this), 5000);

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

  logOut: function () {

    SessionsApiUtil.logout(function() {
        this.history.pushState(null, "/login", {});
    }.bind(this));

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

  hover: function (name, e) {
    $(e.currentTarget).find('i').append("<div class='arrow-up'></div>");
    $(e.currentTarget).find('i').append("<div class='mouseover'>" + name + "</div>");
  },

  archiveHandler: function () {
    callback = function (data) {
      EmailActions.destroyAll(data);
    }.bind(this);

    if (!this.state.show) {
      ApiUtil.updateAll( SelectStore.all(), {archive_set: true} );
      if (SelectStore.all().length === 1) {
        FlashActions.deliverFlash("The conversation has been archived.");
      } else {
        FlashActions.deliverFlash(SelectStore.all().length + " conversations have been archived.");
      }
    } else {
    ApiUtil.updateAll( [ EmailStore.getCurrentID() ], {archive_set: true}, EmailConstants.DESTROY_EMAIL, callback );
    this.history.pushState( null, "/", {} );
      FlashActions.deliverFlash("The conversation has been archived.");
    }
  },

  mouseLeave: function (e) {
    $(e.currentTarget).find('i').html('');
  },

  spamHandler: function (name) {
    var spamSet;
    if (name === "spam") {
      spamSet = { spam_set: true };

      callback = function (data) {
        EmailActions.destroyAll(data);
      }.bind(this);

      if (!this.state.show) {
        ApiUtil.updateAll( SelectStore.all(), spamSet, SpamConstants.GET_SPAM, callback );
        ///flash message
        if (SelectStore.all().length === 1) {
          FlashActions.deliverFlash("The conversation has been marked as spam.");
        } else {
          FlashActions.deliverFlash(SelectStore.all().length + " conversations have been marked as spam.");
        }
      } else {
        ApiUtil.updateAll([ EmailStore.getCurrentID() ], spamSet, EmailConstants.DESTROY_EMAIL, callback);
        this.history.pushState( null, "/", {} );
          FlashActions.deliverFlash("The conversation has been marked as spam.");
    }
  } else {
    spamSet = { spam_set: false };
    if (!this.state.show) {
        ApiUtil.updateAll( SelectStore.all(), spamSet, SpamConstants.DESTROY_SPAM);
        if (SelectStore.all().length === 1) {
          FlashActions.deliverFlash("The conversation has been unmarked as spam and moved to the inbox.");
        } else {
          FlashActions.deliverFlash(SelectStore.all().length + " conversations have been unmarked as spam and moved to the inbox.");
        }
    } else {
      ApiUtil.updateAll([ EmailStore.getCurrentID() ], spamSet, SpamConstants.DESTROY_SPAM);
      this.history.pushState( null, "/", {} );
        FlashActions.deliverFlash("The conversation has been unmarked as spam and moved to the inbox.");
    }
  }
  //
  //   var spamSet = (name === "spam" ? { spam_set: true } : { spam_set: false } )
  //   callback = function (data) {
  //     EmailActions.destroyAll(data);
  //   }.bind(this);
  //
  //   if name
  //
  //   if (!this.state.show) {
  //     ApiUtil.updateAll( SelectStore.all(), spamSet, SpamConstants.GET_SPAM, callback );
  //   } else {
  //   ApiUtil.updateAll([ EmailStore.getCurrentID() ], spamSet, EmailConstants.DESTROY_EMAIL, callback);
  //   this.history.pushState( null, "/", {} );
  // }
  },

  trashHandler: function () {
      if (!this.state.show) {
        ApiUtil.destroyAll( SelectStore.all() );
        if (SelectStore.all().length === 1) {
          FlashActions.deliverFlash("The conversation has been moved to the Trash.");
        } else {
          FlashActions.deliverFlash(SelectStore.all().length + " conversations have been moved to the trash.");
        }
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




    var toolbar;
    var checkClass = (this.state.checked ? "select-all" : "");
    var checkClassName = "a fa-square-o ";
    var selector = <li onClick={this.toggleDropDown}>
      <div className={"square " + checkClass} onClick={this.updateAll.bind(this, this.state.selectAll)}>
      <i className="dropdown-minus fa fa-chevron-down"></i>
      </div>
        <div className="drop-down">
            <ul className="drop-down-ul">
              <li><a onClick={this.updateAll.bind(this, SelectConstants.SELECT_ALL)} href="#">All</a></li>
              <li><a onClick={this.updateAll.bind(this, SelectConstants.SELECT_NONE)} href="#">None</a></li>
              <li><a onClick={this.toggleRead.bind(this, SelectConstants.SELECT_ALL_READ)}  href="#">Read</a></li>
              <li><a onClick={this.toggleRead.bind(this, SelectConstants.SELECT_ALL_UNREAD)} href="#">Unread</a></li>
            </ul>
        </div>
      </li>
      ;

    var spamButton = <li onClick={this.pushBack} onMouseLeave={this.mouseLeave} onMouseOver={this.hover.bind(this, "Spam")} onClick={this.spamHandler.bind(this, "spam")} className="nav-spam"><i className="fa fa-exclamation-triangle"></i></li>;

    var flashMessage = <div></div>;
    if (this.state.flash.length > 0) flashMessage = <div className="flash-message">{this.state.flash}</div>;


    if (EmailStore.getViewState() === "spam") {
      spamButton = <li  onMouseOver={this.hover.bind(this, "Not Spam")} onMouseLeave={this.mouseLeave} onClick={this.spamHandler.bind(this, "not-spam")} className="nav-spam">Not Spam</li>;
    }

      if (this.state.show) {
        selector = <li onClick={this.pushBack} onMouseOver={this.hover.bind(this, "Back")} onMouseLeave={this.mouseLeave}>
          <div className="nav-back">
            <i className="fa fa-arrow-left"></i>
          </div>
        </li>;
      }


    if (this.state.indexToolbar) {
      toolbar =
      <div className="nav-holder">
        {selector}
          <li  onClick={this.pushBack} onMouseOver={this.hover.bind(this, "Sign Out")} onClick={this.logOut} className="nav-holder-sign-out"><i className="fa fa-cog"></i></li>
      </div>;
    } else {
      toolbar = <div className="nav-holder">
        {selector}
        <li className="nav-archive" onMouseOver={this.hover.bind(this, "Archive")} onMouseLeave={this.mouseLeave} onClick={this.archiveHandler  }><i className="fa fa-archive"></i></li>
        {spamButton}
        <li onClick={this.trashHandler} onMouseOver={this.hover.bind(this, "Trash")} onMouseLeave={this.mouseLeave} className="nav-delete"><i className="fa fa-trash"></i></li>
        <li className="more">More</li>
        <li onClick={this.logOut} onMouseOver={this.hover.bind(this, "Sign Out")} onMouseLeave={this.mouseLeave}className="nav-holder-sign-out"><i onClick={this.logOut} className="fa fa-cog"></i></li>
      </div>;
    }

    return (
      <header>
        <Search useCase="email" logOut={this.logOut}/>
        <div className="header-bottom group">
          <div className="bottom-left">
          </div>
          <div className="bottom-right">
            <ul className="header-nav">
              {toolbar}
              {flashMessage}

            </ul>


          </div>
      </div>
    </header>
    );

  }

});

module.exports = Header;
