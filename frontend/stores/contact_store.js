var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');
var ContactStore = new Store(AppDispatcher);
var ContactConstants = require('../constants/contact_constants.js');

var _contacts = [];

ContactStore.all = function () {
  return _contacts;
};

ContactStore.__onDispatch = function (payload) {
  if (payload.actionType === ContactConstants.RECEIVE_CONTACTS) {
    _contacts = payload.data.contacts;
    console.log(payload);
    ContactStore.__emitChange();
  }
};


module.exports = ContactStore;
