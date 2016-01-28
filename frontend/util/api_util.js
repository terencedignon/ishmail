var EmailActions = require('../actions/email_actions.js');

var ApiUtils = {
	getAllEmail: function () {
		$.ajax({
			url: "api/emails",
			success: function(data) {
				EmailActions.receiveAllEmail(data);
			},
			error: function() {
				console.log("error in fetchEmails function");
			}
		});
	},
	getEmail: function (id) {
		$.ajax({
			method: "GET",
			url: "api/emails/" + id,
			success: function(data) {

				EmailActions.receiveEmail(data);
			}
		});
	},

	createEmail: function (params) {
		$.ajax({
			method: "POST",
			url: "api/emails",
			data: {email: params},
			success: function(data) {
				EmailActions.createEmail(data);
			},
			error: function () {
				console.log("error in createEmails function");
			}
		});
	},

	// getComposeSet: function (params) { 
	// 	$.ajax({
	// 		method: "POST",
	// 		url: "api/emails",
	// 		data:
	//
	// 	});
	//
	// }.

	updateEmail: function(id, data) {

		$.ajax({
			method: "PUT",
			url: "api/emails/" + id,
			data: {email: data},
			success: function(data) {
				EmailActions.updateEmail(data);
			},
			error: function (e) {

				console.log("error in updateEmail function");
			}
		});
	},

	destroyEmail: function(id) {
		$.ajax({
			method: "DELETE",
			url: "api/emails" + id,
			success: function(data) {
				EmailActions.deleteEmail(data);
			},
			error: function () {
				console.log("error in destroyEmail function");
			}
		});
	},

	createDraft: function(id) {

	}

};

module.exports = ApiUtils;
