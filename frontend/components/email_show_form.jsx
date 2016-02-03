var React = require('react');
var DraftConstants = require('../constants/draft_constants');
var EmailShowForm = React.createClass({

  getInitialState: function () {
    return { email: "", body: "" };
  },
  createEmail: function () {
    var params = {
      recipient: this.state.recipient,
      title: this.state.title,
      subject: this.state.subject,
      body: this.state.body,
      compose_set: false,
      sent_set: true,
      draft_set: false,
      sending_now: true
    };
    ApiUtil.updateEmail(this.props.draft.id, params, EmailConstants.SEND_EMAIL);
  },
  textHandler: function (e) {

    this.setState({body: e.currentTarget.value});
    if (this.state.email instanceof Object) {
      ApiUtil.updateEmail(this.state.email.id, {body: this.state.body}, DraftConstants.UPDATE_EMAIL);
      this.setState({body: e.currentTarget.value});
    } else {
      ApiUtil.createEmail({
        parent_email_id: this.props.email.id,
        subject: this.props.email.subject,
        body: e.currentTarget.value,
        recipient: this.props.email.sender,
        compose_set: false
      });
      this.setState({body: e.currentTarget.value, email: DraftStore.all().slice(-1)});
      console.log(this.state.email);
    }

  },
  submitHandler: function () {

  },
  render: function () {
    console.log(this.state.email);
    return (
      <div className="show-form">
        <div className="show-form-recipient">

        </div>
        <div className="show-form-body">
          <textarea rows="10" cols="40" onInput={this.textHandler}/>
        </div>
        <div className="show-form footer">
          <button onClick={this.sendReply}>Send</button>
        </div>
      </div>

      );
  }
});

module.exports = EmailShowForm;
