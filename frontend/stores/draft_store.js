var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');
var DraftConstants = require('../constants/draft_constants.js');
var DraftStore = new Store(AppDispatcher);

_drafts = [];
_unreadCount = 0;
_openDrafts = [];

DraftStore.all = function () {
  return _drafts;
};

DraftStore.unreadCount = function () {
  return _unreadCount;
};

DraftStore.getOpenDrafts = function () {
  return _openDrafts;
};

DraftStore.__onDispatch = function (payload) {
  // openDraftParams = {minimize_set: false, save_set: false};

  if (payload.actionType === DraftConstants.NEW_DRAFT) {
    _drafts.push(payload.data);
    _openDrafts.push({draft: payload.data, minimize_set: false, save_set: false});
    DraftStore.__emitChange();
  } else if (payload.actionType === DraftConstants.CLOSE_DRAFT) {
    _openDrafts.splice(_openDrafts.indexOf(payload.data), 1);
    DraftStore.__emitChange();
  } else if (payload.actionType === DraftConstants.GET_DRAFTS) {
    var drafts = [];
    var openDrafts = [];
      payload.data.forEach(function(email) {

        if (email.draft_set) drafts.push(email);
        if (email.compose_set) openDrafts.push({draft: email, minimize_set: false, save_set: false});
      });
      _drafts = drafts;
      _openDrafts = openDrafts;
      DraftStore.__emitChange();
  } else if (payload.actionType === DraftConstants.TOGGLE_SHOW) {

    _openDrafts.forEach(function(obj) {
      if (obj.draft.id === payload.data) { obj.minimize_set = !obj.minimize_set; }
    });
    DraftStore.__emitChange();
  } else if (payload.actionType === DraftConstants.CLOSE) {
    DraftStore.__emitChange();
  } else if (payload.actionType === DraftConstants.UPDATE_ALL) {
    for (var i = 0; i < _emails.length; i++) {
      if (_drafts[i].id === payload.data.id) _emails[i] = payload.data;
    }
    DraftStore.__emitChange();
  }
};

module.exports = DraftStore;
