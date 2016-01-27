var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');
var EmailConstants = require('../constants/email_constants.js');
var EmailStore = new Store(AppDispatcher);

var _emails = [];

EmailStore.all = function () {
  return _emails;
};

EmailStore.__onDispatch = function (payload) {
		if (payload.actionType === "CREATE_EMAIL") console.log("create email");
		if (payload.actionType === "DESTROY_EMAIL") console.log("destroy email");
		if (payload.actionType === "UPDATE_EMAIL") console.log("update email");
		if (payload.actionType === "GET_EMAIL") console.log("get email");
		if (payload.actionType === "GET_ALL_EMAIL") console.log("get all email");
	};
