var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');
var EmailConstants = require('../constants/email_constants.js');
var SelectStore = new Store(AppDispatcher);
var SelectConstants = require('../constants/select_constants.js');

_selectedEmails = [];

Array.prototype.uniq = function () {
  var uniqArray = [];
  this.forEach(function(val) {
    if (uniqArray.indexOf(val) === -1) uniqArray.push(val);
  });
  return uniqArray;
};

SelectStore.all = function () {
  return _selectedEmails;
};

SelectStore.__onDispatch = function (payload) {

  if (payload.actionType === SelectConstants.TOGGLE_SELECT) {
    if (_selectedEmails.indexOf(payload.data) === -1) {
    _selectedEmails.push(payload.data);
  } else {
    _selectedEmails.splice(_selectedEmails.indexOf(payload.data), 1);
  }
    SelectStore.__emitChange();
  } else if (payload.actionType === SelectConstants.SELECT_ALL) {
      var selectedIDs = payload.data.map(function(email) {
        return email.id;
      });
      _selectedEmails = _selectedEmails.concat(selectedIDs).uniq();
      SelectStore.__emitChange();
  } else if (payload.actionType === SelectConstants.SELECT_NONE) {
    _selectedEmails = [];
    SelectStore.__emitChange();
  }
};

module.exports = SelectStore;
