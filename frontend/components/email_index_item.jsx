var React = require('react');

var EmailIndexItem = React.createClass({

  classList: function (email) {
    var classString = "email-index-item group";
    if (email.importance_set) classString += " important";
    if (email.read_set) classString += " read";
    if (email.starred_set) classString += " starred";
    return classString;
  },

  render: function () {
    var classString = this.classList(this.props.email);
    var fontsClass = (classString.includes('starred') ? "fa fa-star" : "fa fa-star-o");

    return (
      <ul className={classString}>
        <li className="star">
       <i className={fontsClass}></i>
       </li>
       <li>
        {this.props.email.subject}
      </li>
      </ul>
    );
  }
});

module.exports = EmailIndexItem;
