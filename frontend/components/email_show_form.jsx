var React = require('react');

var EmailShowForm = React.createClass({
  getInitialState: function () {
    return { test: "test"};
  },

  render: function () {

    return (
        <div className="show-form">
          <div className="show-form-recipient">
            {this.props.sender}
          </div>
          <div className="show-form-body">
            <textarea rows="10" cols="50"/>
          
          </div>
        </div>
      );
  }
});

module.exports = EmailShowForm;
