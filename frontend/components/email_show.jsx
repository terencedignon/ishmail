var React = require('react');
var EmailStore = require('../stores/email_store.js');
var ReactRouter = require('react-router');
var ApiUtil = require('../util/api_util.js');
var Sidebar = require('../components/sidebar.jsx');


var EmailShow = React.createClass({
  getInitialState: function () {
    return { draft: false, email: ""}
  },
  componentDidMount: function () {
    this.listener = EmailStore.addListener(this._onChange);
    ApiUtil.getEmail(this.props.params.id);
  },
  componentWillUnmount: function () {
    this.listener.remove();
  },
  _onChange: function () {
    this.setState({ email: EmailStore.getEmail() });
  },
  render: function() {

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
        to: terry.p.dignon@gmail.com
        </div>
        <div className="email-show-sender-email">
          {"<" + this.state.email.sender + ">"}
        </div>
        <div className="email-show-date">
          {this.state.email.created_at}
        </div>
        <div className="email-show-reply">
          <i className="fa fa-reply"></i>
        </div>
      </div>
    </div>
    );
  }
});


module.exports = EmailShow;
