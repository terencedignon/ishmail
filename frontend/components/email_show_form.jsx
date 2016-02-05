var React = require('react');
var DraftConstants = require('../constants/draft_constants');
var EmailConstants = require('../constants/email_constants.js');
var EmailShowForm = React.createClass({

  getInitialState: function () {

    return { email: "", body: "" };
  },
  sendReply: function () {

    var params = {
      recipient: this.props.sender,
      sender: "terrypdignon",
      parent_email_id: this.props.email.id,
      title: this.props.email.title,
      subject: this.props.email.subject,
      body: this.state.body,
      compose_set: false,
      sent_set: true,
      draft_set: false,
      sending_now: true
    };
    ApiUtil.updateEmail(this.props.email.id, params, EmailConstants.SEND_EMAIL);
    ApiUtil.getAllEmail();
  },
  textHandler: function (e) {
    this.setState({ body: e.currentTarget.value });
    // // this.setState({body: e.currentTarget.value});
    // if (this.state.email instanceof Object) {
    //   ApiUtil.updateEmail(this.state.email.id, {body: this.state.body}, DraftConstants.UPDATE_ALL);
    //   this.setState({body: e.currentTarget.value});
    // } else {
    //
    //   ApiUtil.createEmail({
    //     parent_email_id: this.props.email.id,
    //     subject: this.props.email.subject,
    //     body: e.currentTarget.value,
    //     recipient: this.props.email.sender,
    //     compose_set: false
    //   });
    //   this.setState({body: e.currentTarget.value, email: DraftStore.all().slice(-1)[0]});
    //   console.log(this.state.email);
    // }

  },
  submitHandler: function () {

  },
  render: function () {

    return (
      <div className="show-form">
        <div className="show-form-recipient">

        </div>
        <div className="show-form-body">
          <textarea rows="10" cols="40" onKeyUp={this.textHandler}/>
        </div>
        <div className="show-form footer">
          <button onClick={this.sendReply}>Send</button>
        </div>
      </div>

      );
  }
});

module.exports = EmailShowForm;
