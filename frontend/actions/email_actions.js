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
	}
};

module.exports = EmailActions;
