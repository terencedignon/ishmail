var CurrentUserActions = require("./../actions/current_user_actions");
var SessionsApiUtil = {
  login: function (credentials, success) {
      debugger
    $.ajax({
      url: '/api/session',
      type: 'POST',
      dataType: 'json',
      data: credentials, // {email: "tommy...", password: "14.."}
      success: function (currentUser) {

        CurrentUserActions.receiveCurrentUser(currentUser);
        success && success();
      },
      error: function () {
        debugger
      }

    });
  },

  logout: function (success) {
    $.ajax({
      url: '/api/session',
      type: 'DELETE',
      dataType: 'json',
      success: function () {
        console.log("logged out!");
        success && success();
      }
    });
  },

  fetchCurrentUser: function (cb) {
    $.ajax({
      url: '/api/session',
      type: 'GET',
      dataType: 'json',
      success: function (currentUser) {
        console.log("fetched current user!");
        CurrentUserActions.receiveCurrentUser(currentUser);
        cb && cb(currentUser);
      }
    });
  }


};

module.exports = SessionsApiUtil;
