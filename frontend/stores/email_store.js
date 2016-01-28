var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');
var EmailConstants = require('../constants/email_constants.js');
var EmailStore = new Store(AppDispatcher);

var _emails = [];
var _singleEmail = [];
var _viewState = "inbox";
var _unread = 0;
var _compose = false;
var _filterEmails = [];

EmailStore.all = function () {
  return _emails;
};

EmailStore.unread = function () {
  return _unread;
},

EmailStore.getEmail = function () {
  return _singleEmail;
};

EmailStore.setFilterEmails = function () {
  _filterEmails = EmailStore.all().filter(function(email) {
    if (_viewState === "inbox") return email.compose_set === false;
    if (_viewState === "starred") return email.starred_set === true;
    if (_viewState === "important") return email.importance_set === true;
    if (_viewState === "sent") return email.sent;
    if (_viewState === "drafts") return email.sent_set === false;
  });

  _unread = _filterEmails.length;
  console.log(_unread);


};

EmailStore.getViewState = function () {
  return _viewState;
}

EmailStore.getDisplay = function () {
  return _compose;
};

EmailStore.__onDispatch = function (payload) {
		if (payload.actionType === "CREATE_EMAIL") console.log("create email");
		if (payload.actionType === "DESTROY_EMAIL") console.log("destroy email");
    if (payload.actionType === "CREATE_VIEW") {
      _viewState = payload.data;
      EmailStore.__emitChange();
    }

    // if (payload.actionType === "UNREAD_EMAIL") {
    //   _unread = payload.data;
    //
    //   EmailStore.__emitChange();
    // }

    if (payload.actionType === "COMPOSE_EMAIL") {
      _compose = true;
      EmailStore.__emitChange();
    }

		if (payload.actionType === "UPDATE_EMAIL") {
      for (var i = 0; i < _emails.length; i++) {
        if (_emails[i].id === payload.data.id) _emails[i] = payload.data;
      }
      EmailStore.__emitChange();
    }
    if (payload.actionType === "GET_EMAIL") {

      _singleEmail = payload.data;
      EmailStore.__emitChange();
    }
		if (payload.actionType === "GET_ALL_EMAIL") {
        _emails = payload.data;
        EmailStore.__emitChange();
      }
	};

module.exports = EmailStore;
