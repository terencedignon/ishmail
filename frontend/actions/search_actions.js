var SearchConstants = require('../constants/search_constants');
var AppDispatcher = require('./../dispatcher/dispatcher');

var SearchActions = {
  receiveResults: function (data, type) {
    AppDispatcher.dispatch({
      actionType: SearchConstants.RECEIVE_SEARCH_RESULTS,
      searchType: type,
      searchResults: data.results,
      meta: {totalCount: data.total_count}
    });
  },


};

module.exports = SearchActions;
