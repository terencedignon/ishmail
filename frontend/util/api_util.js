var EmailActions = require('../actions/email_actions.js');
var EmailConstants = require('../constants/email_constants.js');
var DraftActions = require('../actions/draft_actions.js');
var DraftConstants = require('../constants/draft_constants.js');
var ContactActions = require('../actions/contact_actions.js');

var ApiUtils = {
	getAllEmail: function () {
		$.ajax({
			url: "api/emails",
			success: function(data) {

        EmailActions.receiveAllEmail(data);
        DraftActions.receiveAllDrafts(data);
			},
			error: function() {
				console.log("error in fetchEmails function");
			}
		});
	},
  autoUpdate: function () {
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
	getEmail: function (id, callback) {
		$.ajax({
			method: "GET",
			url: "api/emails/" + id,
			success: function(data) {

				EmailActions.receiveEmail(data);
				callback && callback();
			}
		});
	},

	createEmail: function (params, callback) {
		$.ajax({
			method: "POST",
			url: "api/emails",
			data: {email: params},
			success: function(data) {

				DraftActions.createDraft(data);

				// EmailActions.createEmail(data);
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

  destroyAll: function(emails, callback) {
    $.ajax({
      method: "DELETE",
      url: "api/emails/mass_destroy",
      data: {email: emails},
      success: function(data) {

        EmailActions.destroyAll(emails.length);
        callback && callback();
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

          EmailActions.updateAll(payload, typeOfUpdate);
					DraftActions.updateAll(payload, typeOfUpdate);
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
        } else if (typeOfUpdate === DraftConstants.CLOSE_DRAFT){
					DraftActions.closeDraft(data, typeOfUpdate);
				} else if (typeOfUpdate === EmailConstants.SEND_EMAIL) {

					DraftActions.closeDraft(data, typeOfUpdate);
					EmailActions.sendEmail(data);

				} else if (typeOfUpdate === DraftConstants.UPDATE_ALL) {
            DraftActions.updateDraft(data, typeOfUpdate);
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

  getContacts: function() {
    $.ajax({
      method: "GET",
      url: "api/users/1",
      success: function(data) {
          ContactActions.receiveContacts(data.contacts);

      },
      error: function () {
        console.log("error in getContacts function");
      },
    });
  },

	autoUpdate: function (start, finish) {
		$.ajax({
			method: "GET",
			url: "api/emails",
			success: function(data) {
				EmailActions.autoUpdate(data);
			},
			error: function() {
				console.log("error in function autoUpdate");
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
