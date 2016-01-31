var React = require('react');
var EmailStore = require('../stores/email_store.js');
var ReactRouter = require('react-router');
var ApiUtil = require('../util/api_util.js');
var Sidebar = require('../components/sidebar.jsx');
var EmailConstants = require('../constants/email_constants.js');
var EmailStore = require('../stores/email_store.js');

var EmailShow = React.createClass({
  getInitialState: function () {
    return { draft: false, email: ""}
  },
  componentDidMount: function () {
    this.listener = EmailStore.addListener(this._onChange);
    ApiUtil.getEmail(this.props.params.id, this.ensureRead(this.props.params.id));
  },
  ensureRead: function (id) {
    ApiUtil.updateEmail(id, {read_set: true}, EmailConstants.UPDATE_EMAIL);
  },
  componentWillUnmount: function () {
    this.listener.remove();
  },
  _onChange: function () {
    this.setState({ email: EmailStore.getEmail() });
  },
  timeElapsed: function () {
    if (typeof this.state.email === "object") {
      var currentDate = new Date();

      var emailDate = new Date(this.state.email.created_at);
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
    			return (daysElapsed === 1 ? daysElapsed + " days ago" : daysElapsed + " days ago");
      else if (hoursElapsed >= 1 )
          return (hoursElapsed === 1 ? hoursElapsed + " hour ago" : hoursElapsed + " hours ago");
    	else if (minutesElapsed >= 1)
    			return (minutesElapsed === 1 ? minutesElapsed + " minute ago" : minutesElapsed + " minutes ago");
      else
          return (secondsElapsed + " seconds ago");
      }
  },
  formatDate: function () {
    if (typeof this.state.email === "object") {
      var currentDate = new Date();
      var lastDay = currentDate.getTime() - ((currentDate.getHours() * 60 * 60 * 1000) + currentDate.getMinutes() * 60 * 1000);
      console.log(lastDay);

    // var currentDate = new Date();
    // debugger
    // currentDate.getTime() - ((currentDate.getHours() * 60 * 60 * 1000) + currentDate.getMinutes() * 60 * 1000);
    var emailDate = new Date(this.state.email.created_at);
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

  render: function() {

    var createdAt = this.formatDate();
    var timeElapsed = this.timeElapsed();
    starredClass = this.state.email.starred_set ? "star-true" : "star-false";

    return (
      <div className="email-show">
        <div className="email-show-subject">
          <h2>{this.state.email.subject}</h2>
        </div>

      <div className="email-show-header group">
        <div className="email-show-icon">

        </div>
        <div className="email-show-sender-name">
          {this.state.email.sender}<br/>
        to: me
        </div>
        <div className="email-show-sender-email">
          {"<" + this.state.email.sender + ">"}
        </div>
        <div className="email-show-date">
          {createdAt} {"(" + timeElapsed + ")"}
        </div>
        <div className={"show-star " + starredClass}>

        </div>
        <div className="icons">
        <div className="email-show-reply">
          <i className="fa fa-reply"></i>
        </div>
        <div className="email-show-reply-options">
          <i className="fa fa-sort-desc"></i>
          </div>
        </div>
      </div>

      <div className="email-show-body">
        {this.state.email.body}
      </div>
    </div>
    );
  }
});


module.exports = EmailShow;
