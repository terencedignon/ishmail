var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');
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
    _type = payload.searchType;
    console.log(_type);
    _searchResults = payload.searchResults;

      // _searchResults = payload.searchResults;
      _meta = payload.meta;
      SearchStore.__emitChange();
      break;
    case SearchConstants.CLEAR_SEARCH:

      _searchResults = [];
      _meta = {};
      SearchStore.__emitChange();
      break;
  }
};


module.exports = SearchStore;
