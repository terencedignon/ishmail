var React = require('react');
var History = require('react-router').History;
var SessionsApiUtil = require('./../../util/sessions_api_util');

var SessionForm = React.createClass({
mixins: [History],

mouseOver: function (e) {
  $(e.currentTarget).css("border", "1px solid #eee").css("opacity", "1");
},
mouseLeave: function (e) {
  $(e.currentTarget).css("border", "1px solid transparent").css("opacity", "0.75");
},

onFocus: function (e) {
  $(e.currentTarget).css("box-shadow", " 0px 0px 2px 2px #ccc");
},

onBlur: function(e) {
  $(e.currentTarget).css("box-shadow", "2px 2px 0px 0px #f7f7f7");
},

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
    <center>  <img src="http://i.imgur.com/oIdFFWE.png"/>

    <form className="react-sign-in" onSubmit={ this.submit }>


      <div className="new-session-form">

        <div>
      <label>
        <input type="text" onFocus={this.onFocus} onBlur={this.onBlur} name="username" placeholder="Username" />
      </label>

      <label>
        <input type="password"  onFocus={this.onFocus} onBlur={this.onBlur} name="password" placeholder="Password"/>
      </label>
    </div>
    <div>
      <p/>
        <button onMouseLeave={this.mouseLeave} onMouseOver={this.mouseOver}>Sign In</button>
        </div><div>
        <button type="submit" onMouseLeave={this.mouseLeave} onMouseOver={this.mouseOver} form="demo-sign-in">Demo</button>
        </div>
        </div>
    </form>

    <form id="demo-sign-in" onSubmit={ this.submit } method="POST">
  <input type="hidden" name="username" value="ishmael"/>
  <input type="hidden" name="password" value="guest0"/>
    </form>
    <div className="session-sign-up">
      <a href="#/signup" onMouseLeave={this.mouseLeave} onMouseOver={this.mouseOver}>sign up</a>
    </div>

  </center>
  </div>
  );
}

});

module.exports = SessionForm;
