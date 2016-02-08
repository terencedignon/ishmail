var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');
var FlashConstants = require('../constants/flash_constants.js');
var FlashStore = new Store(AppDispatcher);

_flash = "";

FlashStore.message = function () {
  return _flash;
};

FlashStore.__onDispatch = function(payload) {
  if (payload.actionType === FlashConstants.DELIVER_FLASH) {
    _flash = payload.data;

    FlashStore.__emitChange();
  } else if (payload.actionType === FlashConstants.REMOVE_FLASH) {
    _flash = "";

  }


};

module.exports = FlashStore;
