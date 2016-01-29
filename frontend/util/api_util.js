var EmailActions = require('../actions/email_actions.js');
var EmailConstants = require('../constants/email_constants.js');

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

	createEmail: function (params, callback) {
		$.ajax({
			method: "POST",
			url: "api/emails",
			data: {email: params},
			success: function(data) {
				EmailActions.createEmail(data);
        callback && callback();
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

  destroyAll: function(emails) {
    $.ajax({
      method: "DELETE",
      url: "api/emails/mass_destroy",
      data: {email: emails},
      success: function(data) {

        EmailActions.destroyAll(emails.length);
        // callback && callback();
      },
      error: function() {
        console.log("error in the destroyAll function");
      }
    });
  },

  updateAll: function(emails, data, typeOfUpdate, callback) {
      $.ajax({
        method: "POST",
        url: "api/emails/mass_update",
        data: {email: emails, data: data},
        success: function(payload) {
          EmailActions.updateAll(emails, typeOfUpdate);
          callback && callback();
        },
        error: function (e) {
          console.log("error in updateAllfunction");
        }
      });
  },
	updateEmail: function(id, data, typeOfUpdate) {
		$.ajax({
			method: "PUT",
			url: "api/emails/" + id,
			data: {email: data},
			success: function(data) {
        if (typeOfUpdate === EmailConstants.TYPE_SELECT) {

          EmailActions.updateSelect(data);
        } else {
  				EmailActions.updateEmail(data);
        }
      },
			error: function (e) {
				console.log("error in updateEmail function");
			}
		});
	},

	//
	// getComposeSet: function() {
	// 	$.ajax({
	// 		method: "GET",
	// 		url: "api/emails",
	// 		success: function(data) {
	// 			EmailActions.getComposeSet(data);
	// 		},
	// 		error: function () {
	// 			console.log("error in getComposeSet");
	// 		}
	// 	});
	//
	// },

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
