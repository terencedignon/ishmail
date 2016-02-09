var Dispatcher = require('../dispatcher/dispatcher.js');
var FlashConstants = require('../constants/flash_constants.js');

var FlashActions = {
  deliverFlash: function (data) {
    Dispatcher.dispatch({
      actionType: FlashConstants.DELIVER_FLASH,
      data: data
    });
  },
  removeFlash: function () {
    Dispatcher.dispatch({
      actionType: FlashConstants.REMOVE_FLASH
      
    });
  }

};

module.exports = FlashActions;
