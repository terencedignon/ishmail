var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');
var SpamConstants = require('../constants/spam_constants.js');
var SpamStore = new Store(AppDispatcher);
var EmailConstants = require('../constants/email_constants.js');
_spam = [];


SpamStore.all = function () {
  return _spam;
};

SpamStore.__onDispatch = function (payload) {

  // if (payload.data && payload.data.length === 1) payload.data = [payload.data];
  var _newSpam = [];

  if (payload.actionType === EmailConstants.GET_ALL_EMAIL) {

    payload.data.forEach(function(email) {
      if (email.spam_set === true) _newSpam.push(email);
    });
    _spam = _newSpam;

    SpamStore.__emitChange();

  } else if (payload.actionType === SpamConstants.DESTROY_SPAM) {

    var mappedIndexes = _spam.map(function(email) { return email.id; });
    _spam.forEach(function(email) {
          
      if (payload.data.indexOf(email.id) == -1) {
        _newSpam.push(email);
      }
    });

    _spam = _newSpam;
    SpamStore.__emitChange();

  }
};

module.exports = SpamStore;
