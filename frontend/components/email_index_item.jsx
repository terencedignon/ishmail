var React = require('react');
var ApiUtil = require('../util/api_util.js');
var EmailStore = require('../stores/email_store.js');


var EmailIndexItem = React.createClass({
  getInitialState: function () {
    return { email: this.props.email };
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
    return classString;
  },
  importanceClickHandler: function () {
    var importance_set = !(this.props.email.importance_set);
    ApiUtil.updateEmail(this.props.id, { importance_set: importance_set});
    ApiUtil.getAllEmail();
  },
  starClickHandler: function () {
    var starred_set = !(this.props.email.starred_set);
    ApiUtil.updateEmail(this.props.id, { starred_set: starred_set});

  },
  _onChange: function () {
    this.setState({ email: this.props.email });
  },
  render: function () {
    var classString = this.classList(this.props.email);
    var starClass = (classString.includes('starred') ? "fa fa-star" : "fa fa-star-o");
    var importantClass = (classString.includes('important') ? "fa fa-square" : "fa fa-square-o" );
    return (
      <ul className={classString}>
        <li className="star">
       <i onClick={this.starClickHandler} className={starClass}></i>
       </li>
       <li className="importance">
       <i onClick={this.importanceClickHandler} className={importantClass}></i>
       </li>
       <li>
        {this.props.email.subject}
      </li>
      </ul>
    );
  }
});

module.exports = EmailIndexItem;
