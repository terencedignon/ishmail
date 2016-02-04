var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');
var ContactStore = new Store(AppDispatcher);
var ContactConstants = require('../constants/contact_constants.js');

var _contacts = [];
var _contactMap = [];
var _filteredContacts = [];

ContactStore.filteredContacts = function () {
  return _filteredContacts;
};

ContactStore.contactMap = function () {
  return _contactMap;
};

ContactStore.all = function () {
  return _contacts;
};

ContactStore.mapContacts = function () {
  _contactMap = [];
  _contacts.forEach(function(contact, i) {
    _contactMap.push( (contact.fname + contact.lname + contact.username).toLowerCase()  );
  });
};

ContactStore.search = function (query) {
  _filteredContacts = [];
  _contactMap.forEach(function(contact, i) {
    if (contact.includes(query)) { _filteredContacts.push(_contacts[i]); }
  }.bind(this));
};

ContactStore.__onDispatch = function (payload) {
  if (payload.actionType === ContactConstants.RECEIVE_CONTACTS) {
    _contacts = payload.data;
    ContactStore.__emitChange();
  } else if (payload.actionType === ContactConstants.SEARCH) {
    this.mapContacts();
    this.search(payload.data.toLowerCase());
    ContactStore.__emitChange();
  }
};


module.exports = ContactStore;
