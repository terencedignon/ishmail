var React = require('react');
var History = require('react-router').History;
var UsersStore = require('../../stores/users_store');
var UsersApiUtil = require('../../util/user_api_util');

var UserForm = React.createClass({
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
    params = $(e.currentTarget).serializeJSON();
    UsersApiUtil.createUser(params, function () {
      this.history.pushState(null, "/", {});
    }.bind(this));
  },

  render: function() {

        return (
          <div className="new-session">
          <center>  <img src="http://i.imgur.com/oIdFFWE.png"/>

          <form className="react-sign-in" onSubmit={ this.submit }>


            <div className="new-session-form">

              <div>
              <input type="text"  onFocus={this.onFocus} onBlur={this.onBlur} name="fname" placeholder="First Name" />
              <input type="text"  onFocus={this.onFocus} onBlur={this.onBlur} name="lname" placeholder="Last Name" />
            </div><div>
              <input type="text"  onFocus={this.onFocus} onBlur={this.onBlur} name="username" placeholder="Username" />
              <input type="password"  onFocus={this.onFocus} onBlur={this.onBlur} name="password" placeholder="Password"/>
              <input type="password"  onFocus={this.onFocus} onBlur={this.onBlur} name="password_confirmation" placeholder="Password Confirm"/>

          </div>
          <div>
            <p/>
              <button onMouseLeave={this.mouseLeave} onMouseOver={this.mouseOver}>Sign Up</button>
              </div><div>

              </div>
              </div>
          </form>

          <div className="session-sign-up">
            <a href="#/login"  onMouseLeave={this.mouseLeave} onMouseOver={this.mouseOver}>sign in</a>
          </div>

        </center>
        </div>
        );
      }

});

module.exports = UserForm;
