var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');
var SpamConstants = require('../constants/spam_constants.js');
var SpamStore = new Store(AppDispatcher);

_spam = [];


SpamStore.all = function () {
  return _spam;
};

SpamStore.__onDispatch = function (payload) {
  if (payload.data.length === 1) payload.data = [payload.data];

  if (payload.actionType === SpamConstants.GET_SPAM) {
    payload.data.forEach(function(email) {

      if (email.spam_set === true) _spam.push(email);
    });

    SpamStore.__emitChange();
  }
};

module.exports = SpamStore;
