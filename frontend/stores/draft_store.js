var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');
var DraftConstants = require('../constants/draft_constants.js');
var DraftStore = new Store(AppDispatcher);
var EmailConstants = require('../constants/email_constants.js');

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
      if (payload.data.compose_set) _openDrafts.push({draft: payload.data, minimize_set: false, save_set: false});
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

  } else if (payload.actionType === DraftConstants.UPDATE_ALL || DraftConstants.AUTO_UPDATE) {
    for (var i = 0; i < _drafts.length; i++) {

      if (payload.data.length === 1) payload.data = payload.data[0];

      if (_drafts[i].id === payload.data.id) _drafts[i] = payload.data;
      if (typeof _openDrafts[i] !== "undefined" && _openDrafts[i].draft.id === payload.data.id) _openDrafts[i].data = payload.data;
    }
      console.log(_openDrafts);


    if (payload.actionType === DraftConstants.UPDATE_ALL) DraftStore.__emitChange();
  } else if (payload.actionType === EmailConstants.SEND_EMAIL) {
    var tempDraft = [];
    var tempOpenDraft = [];

    _drafts.forEach(function(draft) {
      if (draft.id !== payload.data.id) tempDraft.push(draft);
    });
    _openDrafts.forEach(function(draft) {
      if (draft.draft.id !== payload.data.id) tempOpenDraft.push(draft);
    });

    _drafts = tempDraft;
    _openDrafts = tempOpenDraft;
    DraftStore.__emitChange();
  }
};

module.exports = DraftStore;
