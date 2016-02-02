var React = require('react');

var EmailShowForm = React.createClass({
  getInitialState: function () {
    return { show: false };
  },
  clickHandler: function () {
    var toggleShow = !this.state.show;
    this.setState({ show: toggleShow });
  },
  render: function () {
    var display;

    if (this.state.show) {
      display =
        <div className="email-show-reply-form">

          <div className="email-show-reply-form-recipient">
            {this.props.sender}
          </div>
          <div className="email-show-reply-form-body">
            <textarea rows="10" cols="50">hello</textarea>
          </div>
        </div>;
    } else {
      display = <li><input onClick={this.clickHandler} type="text" className="email-show-form" value="Click here to Reply, Reply To All, or Forward"/></li>;
    }

    return (
      <div>
      {display}
      </div>
    );
  }
});

module.exports = EmailShowForm;
