var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');
var EmailConstants = require('../constants/email_constants.js');
var EmailStore = new Store(AppDispatcher);

var _emails = [];
var _singleEmail = [];
var _viewState = "inbox";
var _unread = 0;
var _unreadDrafts = 0;
var _compose = false;
var _composeSet = [];
var _filterEmails = [];
var _selectedEmails = [];

EmailStore.all = function () {
  return _emails;
};

EmailStore.unread = function () {
  return _unread;
},

EmailStore.getEmail = function () {
  return _singleEmail;
};

// getEmails (filter) {
//  if (filter == 'starred') {
//
// }
// }

EmailStore.getComposeSet = function () {
  _composeSet = _emails.filter(function(email) {
    return email.compose_set === true;
  });
  return _composeSet;
};

EmailStore.unreadDrafts = function () {
  return _unreadDrafts;
};

EmailStore.setFilterEmails = function () {
  _filterEmails = EmailStore.all().filter(function(email) {
    if (_viewState === "inbox") return email.compose_set === false && email.sent_set === true;
    if (_viewState === "starred") return email.starred_set === true;
    if (_viewState === "important") return email.importance_set === true;
    if (_viewState === "sent") return email.sent;
    if (_viewState === "drafts") return email.sent_set === false ;
  });
  _unread = _filterEmails.length;
  _unreadDrafts = _emails.length - _unread.length;
  return _filterEmails;
};

EmailStore.getViewState = function () {
  return _viewState;
};

EmailStore.getDisplay = function () {
  return _compose;
};

EmailStore.__onDispatch = function (payload) {
  	// if (payload.actionType === "CREATE_EMAIL") console.log("create email");
		// if (payload.actionType === "DESTROY_EMAIL") console.log("destroy email");

    if (payload.actionType === "CREATE_EMAIL") {
      _emails.unshift(payload.data);
      EmailStore.__emitChange();
    }

    if (payload.actionType === "CREATE_VIEW") {
      _viewState = payload.data;
      EmailStore.__emitChange();
    } else if (payload.actionType === "COMPOSE_EMAIL") {
      _compose = true;
      EmailStore.__emitChange();
    } else if (payload.actionType === "UPDATE_EMAIL") {
      for (var i = 0; i < _emails.length; i++) {
        if (_emails[i].id === payload.data.id) _emails[i] = payload.data;
      }
      EmailStore.__emitChange();
    } else if (payload.actionType === "GET_EMAIL") {
      _singleEmail = payload.data;
      EmailStore.__emitChange();
    } else if (payload.actionType === "GET_ALL_EMAIL") {
        _emails = payload.data;
        EmailStore.__emitChange();
    } else if (payload.actionType === "GET_COMPOSE_SET") {
      // EmailStore.__emitChange();
      EmailStore.__emitChange();
    } else if (payload.actionType === "TYPE_SELECT") {

      var present = _selectedEmails.filter(function(email) {
        return email.id === payload.data.id;
      });
      if (present.length === 0) {
        _selectedEmails.push(payload.data);
      } else {
        _selectedEmails.splice(_selectedEmails.indexOf(payload.data), 1);
      }
      console.log(_selectedEmails);
    }
  };

module.exports = EmailStore;
