
var SearchActions = require('../actions/search_actions');
var SearchApiUtil = {

  search: function (query, page, type) {
    $.ajax({
      url: '/api/search',
      type: 'GET',
      dataType: 'json',
      data: {query: query, page: page, type: type},
      success: function (data) {
        console.log(type);
        SearchActions.receiveResults(data, type);
      }
    });
  },

};


module.exports = SearchApiUtil;
