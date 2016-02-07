var React = require('react');
var History = require('react-router').History;
var SessionsApiUtil = require('./../../util/sessions_api_util');

var SessionForm = React.createClass({
mixins: [History],

submit: function (e) {
  e.preventDefault();

  var credentials = $(e.currentTarget).serializeJSON();
  SessionsApiUtil.login(credentials, function () {
    this.history.pushState({}, "/");
  }.bind(this));
},


render: function() {

  return (
    <div className="new-session">
    <center>  <img src="http://i.imgur.com/R1L0xwC.png"/>

    <form className="react-sign-in" onSubmit={ this.submit }>


      <div className="new-session-form">
        <div>
      <label>
        <input type="text" name="username" placeholder="Username" />
      </label>
      <br/>
      <label>

        <input type="password" name="password" placeholder="Password"/>
      </label>
    </div>
    <div>
      <p/>

        <button type="submit" form="demo-sign-in">Demo</button>
        </div>
        </div>
    </form>

    <form id="demo-sign-in" onSubmit={ this.submit } method="POST">
  <input type="hidden" name="username" value="ishmael"/>
  <input type="hidden" name="password" value="guest0"/>
    </form>
    <a href="#/signup">Create Account</a>
  </center>
  </div>
  );
},

});

module.exports = SessionForm;
