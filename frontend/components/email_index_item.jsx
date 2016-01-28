var React = require('react');
var ApiUtil = require('../util/api_util.js');
var EmailStore = require('../stores/email_store.js');


var EmailIndexItem = React.createClass({
  getInitialState: function () {
    return { email: this.props.email, checked: false };
  },
  componentDidMount: function () {
    this.eventListener = EmailStore.addListener(this._onChange);
  },
  componentWillUnmount: function () {
    this.eventListener.remove();
  },
  classList: function (email) {
    var classString = "email-index-item group";
    if (email.importance_set) classString += " important";
    if (email.read_set) classString += " read";
    if (email.starred_set) classString += " starred";
    if (this.state.checked) classString += " checked";
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

    var truthy = !(this.state.checked);
    this.setState({ checked: truthy });
  },
  _onChange: function () {
    this.setState({ email: this.props.email });
  },
  render: function () {

    var dateTime = new Date(this.props.email.created_at);
    var date = dateTime.toString().split(" ").slice(1, 3).join(" ");
    var classString = this.classList(this.props.email);
    var starClass = (classString.includes('starred') ? "fa fa-star" : "fa fa-star-o");
    var importantClass = (classString.includes('important') ? "fa fa-square" : "fa fa-square-o" );
    var checked = (this.state.checked ? "fa fa-check-square-o" : "fa fa-square-o");

    return (
      <ul className={classString}>
      <li className="ellipse">
        <i className="fa fa-ellipsis-v"></i><i className="fa fa-ellipsis-v"></i>
      </li>
      <li className="checkbox">
        <i onClick={this.checkClickHandler} className={checked}></i>
        </li>
        <li className="star">
       <i onClick={this.starClickHandler} className={starClass}></i>
       </li>
       <li className="importance">
       <i onClick={this.importanceClickHandler} className={importantClass}></i>
       </li>
       <li>
        {this.props.email.subject}
      </li>
      <li className="date">
        {date}
      </li>
      </ul>
    );
  }
});

module.exports = EmailIndexItem;
