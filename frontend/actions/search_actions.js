var SearchConstants = require('../constants/search_constants');
var Dispatcher = require('./../dispatcher/dispatcher');

var SearchActions = {

  receiveResults: function (data, type) {

    Dispatcher.dispatch({
      actionType: SearchConstants.RECEIVE_SEARCH_RESULTS,
      searchType: type,
      searchResults: data.results,
      meta: {totalCount: data.total_count}
    });
  },
  clearSearch: function () {
    Dispatcher.dispatch({
    actionType: SearchConstants.CLEAR_SEARCH
  });
  }

};

module.exports = SearchActions;
