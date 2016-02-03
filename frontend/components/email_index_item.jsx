var React = require('react');
var ApiUtil = require('../util/api_util.js');
var EmailStore = require('../stores/email_store.js');
var EmailConstants = require('../constants/email_constants.js');
var SelectActions = require('../actions/select_actions.js');
var SelectConstants = require('../constants/select_constants.js');


var EmailIndexItem = React.createClass({
  getInitialState: function () {
    return { email: this.props.email };
  },
  componentDidMount: function () {
    this.emailListener = EmailStore.addListener(this._onEmailChange);
  },
  componentWillUnmount: function () {
    this.emailListener.remove();
  },
  classList: function (email) {
    var classString = "email-index-item group";
    if (email.importance_set) classString += " important";
    if (email.read_set) classString += " read";
    if (email.starred_set) classString += " starred";
    if (this.props.checked === "true") classString += " highlight";
    return classString;
  },
  importanceClickHandler: function () {
    var importance_set = !(this.props.email.importance_set);
    ApiUtil.updateEmail(this.props.id, { importance_set: importance_set});

  },
  starClickHandler: function () {

    var starred_set = !(this.props.email.starred_set);
    ApiUtil.updateEmail(this.props.id, { starred_set: starred_set});

  },
  checkClickHandler: function () {

    // ApiUtil.updateEmail(
    //   this.state.email.id, {select_set: !(this.state.email.select_set)}, EmailConstants.TYPE_SELECT
    // );

    SelectActions.toggleSelect(this.props.id, SelectConstants.TOGGLE_SELECT);

    // var truthy = !(this.state.checked);
    // this.setState({ checked: truthy });
  },
  _onEmailChange: function () {
    this.forceUpdate();
  },
  formatDate: function () {
    var currentDate = new Date();

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
  },
  render: function () {
    var date = this.formatDate();
    var classString = this.classList(this.props.email);
    var starClass = (classString.includes('starred') ? "fa fa-star" : "fa fa-star-o");
    var importantClass = (classString.includes('important') ? "fa fa-square" : "fa fa-square-o" );
    var checked = (this.props.checked === "true" ? "checkbox checked" : "checkbox");
    var sender = this.props.email.sender.match(/[a-zA-Z.-]+/)[0];
    var threadCount = "";
    if (this.state.email.emails && this.state.email.emails.length > 0) {
      threadCount = "(" + this.state.email.emails.length + ")";
    }

    var senderRender;

    if (this.props.view !== "drafts") {
      senderRender = <li className="sender">
        {sender[0].toUpperCase() + sender.slice(1)} {threadCount}
      </li>;
    } else {

      senderRender = <li className="sender draft">
        Draft
      </li>;
    }


    return (
      <ul className={classString}>
      <li className="ellipse">
        <i className="fa fa-ellipsis-v"></i><i className="fa fa-ellipsis-v"></i>
      </li>
      <li className={checked}>
        <i onClick={this.checkClickHandler} className="fa fa-square-o"></i>
        </li>
        <li className="star">
       <i onClick={this.starClickHandler} className={starClass}></i>
       </li>
       <li className="importance">
       <i onClick={this.importanceClickHandler} className={importantClass}></i>
       </li>
        {senderRender}
       <li className="subject">
          <a href={"#/inbox/" + this.props.id}>{this.props.email.subject}</a>
      </li>
      <li className="date">
        {date}
      </li>
      </ul>
    );
  }
});

module.exports = EmailIndexItem;
