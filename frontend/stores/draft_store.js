var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');
var DraftConstants = require('../constants/draft_constants.js');
var DraftStore = new Store(AppDispatcher);


DraftStore.__onDispatch = function () {


};


module.exports = DraftStore;
