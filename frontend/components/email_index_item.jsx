var React = require('react');

var EmailIndexItem = React.createClass({

  render: function () {
    return (
      <li className="email-index-item">
        {this.props.email.subject}
      </li>
    );
  }
});

module.exports = EmailIndexItem;
