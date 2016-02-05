var EmailActions = require('../actions/email_actions.js');
var EmailConstants = require('../constants/email_constants.js');
var DraftActions = require('../actions/draft_actions.js');
var DraftConstants = require('../constants/draft_constants.js');
var ContactActions = require('../actions/contact_actions.js');
var SpamActions = require('../actions/spam_actions.js');
var SpamConstants = require('../constants/spam_constants.js');
var SelectActions = require('../actions/select_actions.js');

var ApiUtils = {

	getAllEmail: function () {
		$.ajax({
			url: "api/emails",
			success: function(data) {
        EmailActions.receiveAllEmail(data);
        DraftActions.receiveAllDrafts(data);
				SpamActions.receiveAllSpam(data);
			},
			error: function() {
			}
		});
	},

  autoDraft: function (id, params) {
    $.ajax({
      method: "PUT",
      url: "api/emails/" + id,
      data: {email: params},
      success: function(data) {

        DraftActions.autoDraft(data);
      },
      error: function() {
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

  destroyAll: function(emails, callback) {
    $.ajax({
      method: "DELETE",
      url: "api/emails/mass_destroy",
      data: {email: emails},
      success: function(data) {
        EmailActions.destroyAll(emails);
        SpamActions.destroyAll(emails);
        SelectActions.unselectAll();
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
        success: function(data) {
          SelectActions.unselectAll();
          if (typeOfUpdate === "GET SPAM") {
            SpamActions.receiveAllSpam(data);
            callback && callback(data);
          }
            else if (typeOfUpdate === "DESTROY_EMAIL") {
            callback && callback(data.map(function(email) { return email.id; }));
          } else {
            EmailActions.updateAll(data, typeOfUpdate);
            DraftActions.updateAll(data, typeOfUpdate);
            callback && callback();
          }

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
        // if (typeOfUpdate === EmailConstants.TYPE_SELECT) {
        //   EmailActions.updateSelect(data);
        // } else
				if (typeOfUpdate === DraftConstants.CLOSE_DRAFT){
					DraftActions.closeDraft(data, typeOfUpdate);
				} else if (typeOfUpdate === EmailConstants.SEND_EMAIL) {
					DraftActions.closeDraft(data, typeOfUpdate);
					EmailActions.sendEmail(data);
				} else if (typeOfUpdate === SpamConstants.GET_SPAM) {
					SpamActions.receiveAllSpam(data);

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
