var React = require('react');
var EmailShowContact = require('./email_show_contact.jsx');
var ApiUtil = require('../util/api_util.js');
var EmailConstants = require('../constants/email_constants.js');

var EmailShowItem = React.createClass({
  starClickHandler: function () {
    var starred_set = !(this.props.email.starred_set);
    ApiUtil.updateEmail(this.props.email.id, { starred_set: starred_set});

  },
  // _onEmailChange: function () {
  //   this.setState({ email: EmailStore.getEmail() });
  // },

  timeElapsed: function () {
    if (typeof this.props.email === "object") {
      var currentDate = new Date();

      var emailDate = new Date(this.props.email.created_at);
      var utc = currentDate.getTime() - emailDate.getTime();
      var dateString = "";
      var divisor = 1000; year = 365; month = 30; day = 24; week = 7; hour = 60; minute = 60;
      var formula;
      var date;
      var yearsElapsed = Math.floor(utc / (divisor * minute * hour * day * year));
      var monthsElapsed = Math.floor(utc / (divisor * minute * hour * day * month));
      var weeksElapsed = Math.floor((utc / (divisor * minute * hour * day)) / week);
      var daysElapsed = Math.floor(utc / (divisor * minute * hour * day));
      var hoursElapsed = Math.floor(utc / (divisor * minute * hour));
      var minutesElapsed = Math.floor(utc / (divisor * minute));
      var secondsElapsed = Math.floor(utc / (divisor));

      if (yearsElapsed >= 1)
          return (yearsElapsed === 1 ? yearsElapsed + " year ago" : yearsElapsed + " years ago");
      else if (monthsElapsed >= 1)
          return (monthsElapsed === 1 ? monthsElapsed + " month ago" : yearsElapsed + " months ago");
      else if (weeksElapsed >= 1)
          return (weeksElapsed === 1 ? weeksElapsed + " weeks ago" : weeksElapsed + " weeks ago");
      else if (daysElapsed >= 1)
          return (daysElapsed === 1 ? daysElapsed + " day ago" : daysElapsed + " days ago");
      else if (hoursElapsed >= 1 )
          return (hoursElapsed === 1 ? hoursElapsed + " hour ago" : hoursElapsed + " hours ago");
      else if (minutesElapsed >= 1)
          return (minutesElapsed === 1 ? minutesElapsed + " minute ago" : minutesElapsed + " minutes ago");
      else
          return (secondsElapsed + " seconds ago");
      }
  },
  formatDate: function () {
    if (typeof this.props.email === "object") {
      var currentDate = new Date();
      var lastDay = currentDate.getTime() - ((currentDate.getHours() * 60 * 60 * 1000) + currentDate.getMinutes() * 60 * 1000);


    // var currentDate = new Date();
    // debugger
    // currentDate.getTime() - ((currentDate.getHours() * 60 * 60 * 1000) + currentDate.getMinutes() * 60 * 1000);
    var emailDate = new Date(this.props.email.created_at);
    if (currentDate.getMonth() !== emailDate.getMonth() || currentDate.getYear() !== emailDate.getYear()) {

      var year = emailDate.toLocaleDateString().split("/")[2].slice(2);
      return emailDate.toLocaleDateString().split("/").slice(0, 2).concat(year).join("/");
    } else if (emailDate.getTime() > (currentDate.getTime() - ((currentDate.getHours() * 60 * 60 * 1000) + currentDate.getMinutes() * 60 * 1000))) {
      var time = emailDate.toLocaleTimeString().split(":").slice(0, 2).join(":");
      var amPM = emailDate.toLocaleTimeString().split(" ")[1];
      return time + " " + amPM;
    } else {
        return emailDate.toString().split(" ").slice(1, 3).join(" ");
    }
  }
},

  render: function () {
    var createdAt = this.formatDate();
    var timeElapsed = this.timeElapsed();
    var starredClass;
    if (this.props.child) {
      starredClass = "show-star";
    } else {
      starredClass = this.props.email.starred_set ? "show-star star-true" : "show-star star-false";
    }

    var display;
    //
    // if (this.props.max || (!this.props.email.read_set) || (this.props.email.read_set && (!this.props.child && !this.props.hasChildren) || this.props.index === this.props.length - 1)) {
      // display =
  // } else {
  //   display =
  //     <div onClick={this.props.clickHandler} id={this.props.email.id} className="email-show min">
  //
  //     <div className="email-show-header group">
  //     <div className="email-show-icon">
  //     </div>
  //     <div className="email-show-sender-name-stub">
  //     {this.props.email.sender}
  //     </div>
  //
  //     <div className="email-show-body-stub">
  //       {this.props.email.body.split(" ").slice(0, 10).join(" ")}
  //     </div>
  //     <div className="email-show-date">
  //     {createdAt} {"(" + timeElapsed + ")"}
  //     </div>
  //
  //
  //     <div onClick={this.starClickHandler} className={"show-star " + starredClass}>
  //     </div>
  //     </div>
  //     </div>;
  // }
debugger
    display =
    <div><div className="email-show-header">
      <div className="email-show-sender-name">
        <h3>{this.props.email.sender.split("@")[0]}</h3>
      </div>
      <div className="email-show-sender-email">
        {"<" + this.props.email.sender + "@ishmael.com>"}
      </div>
      <div className="email-show-date">
        {createdAt} {"(" + timeElapsed + ")"}
      </div>

      <div onClick={this.starClickHandler} className={starredClass}>

      </div>
    </div>
      <div className="body holder">

    <div className="email-show-body">
      {this.props.email.body}
    </div>
  </div></div>;



    return (<li onClick={this.props.clickHandler} id={this.props.email.id} className="email-show">
    {display}
</li>
  );
  }
});

module.exports = EmailShowItem;
