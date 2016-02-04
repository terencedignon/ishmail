var Dispatcher = require('../dispatcher/dispatcher.js');
var ContactConstants = require('../constants/contact_constants.js');

var ContactActions = {
  search: function (data) {
    Dispatcher.dispatch({
      actionType: ContactConstants.SEARCH,
      data: data
    });
  },
  receiveContacts: function (data) {
    Dispatcher.dispatch({
      actionType: ContactConstants.RECEIVE_CONTACTS,
      data: data
    });
  }

};

module.exports = ContactActions;
