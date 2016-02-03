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
};

EmailStore.selectedEmails = function () {
  return _selectedEmails;
};

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

EmailStore.getFilterEmails = function () {
  return _filterEmails;
};

EmailStore.unreadDrafts = function () {
  return _unreadDrafts;
};

EmailStore.setFilterEmails = function () {
  _filterEmails = EmailStore.all().filter(function(email) {
    if (_viewState === "inbox") return email.compose_set === false && email.draft_set === false &&
      email.sent_set === false;
    if (_viewState === "starred") return email.starred_set === true;
    if (_viewState === "important") return email.importance_set === true;
    if (_viewState === "sent") return email.sent_set;
    if (_viewState === "drafts") return email.sent_set === false ;
  });
  this.setUnread();

  _unreadDrafts = _emails.length - _unread.length;
  return _filterEmails;
};

EmailStore.getViewState = function () {
  return _viewState;
};

EmailStore.setUnread = function () {
  _unread = _emails.filter(function(email) {

    return email.read_set === false;
  }).length;
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

        if (!(payload.data instanceof Array)) {
          for (var i = 0; i < _emails.length; i++) {
            if (_emails[i].id === payload.data.id) _emails[i] = payload.data;
          }
          if (_singleEmail.id === payload.data.id)
            _singleEmail = payload.data;
        } else {
        for (var j = 0; j < payload.data.length; j++) {
          for (var k = 0; k < _emails.length; k++) {
            if (_emails[k].id === payload.data[j].id) _emails[k] = payload.data[j];
          }
        }

      }
      this.setUnread();
      EmailStore.__emitChange();
    } else if (payload.actionType === "GET_EMAIL") {
      _singleEmail = payload.data;
      EmailStore.__emitChange();
    } else if (payload.actionType === "GET_ALL_EMAIL") {
      var emails = [];
        payload.data.forEach(function(email) {

          if (email.draft_set === false) {

            emails.push(email);
          }
        });
        _emails = emails;
        EmailStore.__emitChange();
    } else if (payload.actionType === "GET_COMPOSE_SET") {
      // EmailStore.__emitChange();
      EmailStore.__emitChange();
    } else if (payload.actionType === "DESTROY_EMAIL") {
      EmailStore.__emitChange();
    } else if (payload.actionType === "TYPE_SELECT") {
        EmailStore.__emitChange();
    } else if (payload.actionType === "SEND_EMAIL") {
        _emails.unshift(payload.data);
        EmailStore.__emitChange();
    } else if (payload.actionType === EmailConstants.AUTO_UPDATE) {
        _emails.unshift(payload.data);
      EmailStore.__emitChange();
    }

  };

module.exports = EmailStore;
