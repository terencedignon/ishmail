var Dispatcher = require('../dispatcher/dispatcher.js');
// var EmailConstants = require('../constants/email_constants.js');
var SpamConstants = require('../constants/spam_constants.js');

var SpamActions = {
  receiveAllSpam: function (data) {
    Dispatcher.dispatch({
      actionType: SpamConstants.GET_SPAM,
      data: data
    });
},
destroyAll: function (data) {
  Dispatcher.dispatch({
    actionType: SpamConstants.DESTROY_SPAM,
    data: data
  });
}

};

module.exports = SpamActions;
