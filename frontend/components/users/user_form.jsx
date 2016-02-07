var React = require('react');
var History = require('react-router').History;
var UsersStore = require('../../stores/users_store');
var UsersApiUtil = require('../../util/user_api_util');

var UserForm = React.createClass({
  mixins: [History],

  submit: function (e) {
    e.preventDefault();
  },

  render: function() {

    return (
      <form onSubmit={ this.submit }>

        <h1>Sign Up!</h1>

        <label>
          Email
          <input type="text" name="email" />
        </label>

        <label>
          Password
          <input type="password" name="password" />
        </label>

        <button>Join!</button>
      </form>
    );
  },

});

module.exports = UserForm;
