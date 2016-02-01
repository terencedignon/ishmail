var DraftConstants = require('../constants/draft_constants');
var Dispatcher = require('../dispatcher/dispatcher.js');

var DraftActions = {
  receiveAllDrafts: function(data) {
    Dispatcher.dispatch({
      actionType: DraftConstants.GET_DRAFTS,
      data: data
    });
  },
  updateAll: function (array, constant) {
    Dispatcher.dispatch({
      actionType: constant,
      data: array
    });
  },
  createDraft: function (data) {
    Dispatcher.dispatch({
      actionType: DraftConstants.NEW_DRAFT,
      data: data
    });
  },
  closeDraft: function(data, constant) {
    Dispatcher.dispatch({
      actionType: constant,
      data: data
    });
  },
  toggleShow: function (id) {
    Dispatcher.dispatch({
      actionType: DraftConstants.TOGGLE_SHOW,
      data: id
    });
  }

};

module.exports = DraftActions;
