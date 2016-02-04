var Dispatcher = require('../dispatcher/dispatcher.js');
var EmailConstants = require('../constants/email_constants.js');

var EmailActions = {
	receiveAllEmail: function (data) {
		Dispatcher.dispatch({
			actionType: EmailConstants.GET_ALL_EMAIL,
			data: data

		});
	},
	receiveEmail: function(data) {
		Dispatcher.dispatch({
			actionType: EmailConstants.GET_EMAIL,
			data: data
		});
	},
	destroyEmail: function(data) {
		Dispatcher.dispatch({
			actionType: EmailConstants.DESTROY_EMAIL,
			data: data
		});
	},
	createEmail: function(data) {
		Dispatcher.dispatch({
			actionType: EmailConstants.CREATE_EMAIL,
			data: data
		});
	},
	updateEmail: function(data) {
		Dispatcher.dispatch({
			actionType: EmailConstants.UPDATE_EMAIL,
			data: data
		});
	},
	sendEmail: function(data) {
		Dispatcher.dispatch({
			actionType: EmailConstants.SEND_EMAIL,
			data: data
		});
	},
	createView: function(data) {
		Dispatcher.dispatch({
			actionType: EmailConstants.CREATE_VIEW,
			data: data
		});
	},
	sendUnreadEmail: function(data) {
		Dispatcher.dispatch({
			actionType: EmailConstants.UNREAD_EMAIL,
			data: data
		});
	},

	getComposeSet: function() {
		Dispatcher.dispatch({
			actionType: EmailConstants.GET_COMPOSE_SET,
		});
	},

  // updateSelectAll: function(data) {
  //   Dispatcher.dispatch({
  //     actionType: EmailConstants.SELECT_ALL,
  //     data: data
  //   });
  // },

  destroyAll: function(data) {
    
    Dispatcher.dispatch({
      actionType: EmailConstants.DESTROY_EMAIL,
      data: data
    });
  },

  updateAll: function(data) {
    Dispatcher.dispatch({
      actionType: EmailConstants.UPDATE_EMAIL,
      data: data
    });
  },
  // updateSelect: function(data) {
  //   Dispatcher.dispatch({
  //     actionType: EmailConstants.TYPE_SELECT,
  //     data: data
  //   });
  // },

	autoUpdate: function (data) {

		Dispatcher.dispatch({
			actionType: EmailConstants.GET_ALL_EMAIL,
			data: data
		});
	},
  sendID: function (id) {
    Dispatcher.dispatch({
      actionType: EmailConstants.SEND_ID,
      data: id
    });
  },
	composeEmail: function() {
		Dispatcher.dispatch({
			actionType: EmailConstants.COMPOSE_EMAIL,
		});

	}

};

module.exports = EmailActions;
