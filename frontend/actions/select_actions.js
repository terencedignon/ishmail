var Dispatcher = require('../dispatcher/dispatcher.js');
var EmailConstants = require('../constants/email_constants.js');
var SelectConstants = require('../constants/select_constants.js');

var SelectActions = {

  unselectAll: function() {
    Dispatcher.dispatch({
      actionType: SelectConstants.SELECT_NONE
    });
  },

  toggleSelect: function(value, type) {

    Dispatcher.dispatch({
      actionType: type,
      data: value
    });
  }
};

module.exports = SelectActions;
