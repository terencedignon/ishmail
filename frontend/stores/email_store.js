var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');
var EmailConstants = require('../constants/email_constants.js');
var EmailStore = new Store(AppDispatcher);

var _emails = [];

EmailStore.all = function () {
  return _emails;
};
