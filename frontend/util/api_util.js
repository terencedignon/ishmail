var EmailActions = require('../actions/email_actions.js');

var ApiUtils = {
	getAllEmail: function () {
		$.ajax(
			method: "GET",
			url: "api/emails",
			success: function(data) {
				EmailActions.receiveAllEmail(data);
			},
			error: function() {
				console.log("error in fetchEmails function")
			}
		);
	},
	getEmail: function (id) {
		$.ajax(
			method: "GET",
			url: "api/emails" + id,
			success: function(data) {
				EmailActions.receiveEmail(data);
			}
		);
	},

	createEmail: function () {
		$.ajax(
			method: "POST",
			url: "api/emails",
			success: function(data) {
				EmailActions.createEmail(data);
			},
			error: function () {
				console.log("error in createEmails function");
			}
		)
	},

	updateEmail: function(id) {
		$.ajax(
			method: "PATCH",
			url: "api/email/" + id,
			success: function(data) {
				EmailActions.updateEmail(data);
			},
			error: function () {
				console.log("error in updateEmail function");
			}
		)
	},

	destroyEmail: function(id) {
		$.ajax(
			method: "DELETE",
			url: "api/email" + id,
			success: function(data) {
				EmailActions.deleteEmail(data);
			},
			error: function () {
				console.log("error in destroyEmail function");
			}
		)
	}
}

module.exports = ApiUtils;
