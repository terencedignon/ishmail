var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');
var EmailConstants = require('../constants/email_constants.js');
var EmailStore = new Store(AppDispatcher);

var _emails = [];
var _singleEmail = [];

EmailStore.all = function () {
  return _emails;
};

EmailStore.getEmail = function () {
  return _singleEmail;
};



EmailStore.__onDispatch = function (payload) {
		if (payload.actionType === "CREATE_EMAIL") console.log("create email");
		if (payload.actionType === "DESTROY_EMAIL") console.log("destroy email");
		if (payload.actionType === "UPDATE_EMAIL") console.log("update email");
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
