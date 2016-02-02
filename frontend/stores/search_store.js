var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var SearchConstants = require('../constants/search_constants');

var _searchResults = [];
var _meta = {};
var _type = "";

var SearchStore = new Store(AppDispatcher);

SearchStore.all = function () {
  return _searchResults;
  // .slice();
};

SearchStore.meta = function () {
  return _meta;
};

SearchStore.type = function () {
  return _type;
};

SearchStore.__onDispatch = function (payload) {
  // debugger
  switch (payload.actionType) {
    case SearchConstants.RECEIVE_SEARCH_RESULTS:
    _type = payload.type;
    _searchResults = payload.searchResults;

      // _searchResults = payload.searchResults;
      _meta = payload.meta;
      SearchStore.__emitChange();
      break;

  }
};


module.exports = SearchStore;
