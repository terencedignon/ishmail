var React = require('react');
var EmailStore = require('../stores/email_store.js');
var ApiUtils = require('../util/api_util.js');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var DraftStore = require('../stores/draft_store.js');
var DraftActions = require('../actions/draft_actions.js');
var DraftConstants = require('../constants/draft_constants.js');
var EmailConstants = require('../constants/email_constants.js');


var EmailForm = React.createClass({
  mixins: [LinkedStateMixin],
  getInitialState: function() {
    return {
      title: "New Message", recipient: "", subject: "", body: "",
      created: false, display: false, minimize: false, save_set: false};
  },
  componentDidMount: function() {

    // this.emailListener = EmailStore.addListener(this._onEmailChange);
    this.draftListener = DraftStore.addListener(this._onDraftChange);
  },
  componentWillUnmount: function() {

    // this.emailListener.remove();
    this.draftListener.remove();
  },
  toggleShow: function () {

    DraftActions.toggleShow(this.props.draft.id)
  },
  _onDraftChange: function () {

  },
  _onEmailChange: function () {
    var subject = this.state.subject;
    if (subject === "") subject = "New Message";
    this.setState({ display: EmailStore.getDisplay() });
    var params = {
      subject: subject,
      body: this.state.body,
      compose_set: true
    };
    if (this.state.display && this.state.created === false) {
      ApiUtil.createEmail(params);

      this.setState({created: true});
    }
  },
  // recipientsChangeHandler: function (e) {
  //   if (e.currentTarget.value === "") {
  //     this.setState({ recipients: "Recipients"});
  //   } else {
  //     this.setState({ recipients: e.currentTarget.value });
  //   }
  // },
  closeClickHandler: function () {
    // var params = {
    //   compose_set = false;
    //   this.state.
    // }
    // ApiUtil.updateEmail(params);
    ApiUtil.updateEmail(this.props.draft.id, {compose_set: false}, DraftConstants.CLOSE_DRAFT);


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
    ApiUtil.getContacts();
    //
    // findContact = ContactsStore.all().find(function(recipient) {
    //   return recipient.username === recipient_username;
    // });
    //
    // if (typeof findContact === "undefined") {
    //
    // }

  },
  render: function () {
    var display;


    if (this.props.minimize) {
      display =
      <div onClick={this.toggleShow} className="email-form-minimize">
        <div className="email-form-minimize-title">
         {this.state.title}
       </div>
       <div className="email-form-minimize-max">
          <i className="fa fa-minus"></i>
        </div>
       <div className="email-form-minimize-close">
         <i onClick={this.closeClickHandler} className="fa fa-times"></i>
        </div>
    </div>;
    } else {
      display = <div className="email-form group">
        <div className="email-form-title-container">
          <div onClick={this.toggleShow} className="email-form-title">
            {this.state.title}
          </div>
          <div>
            <i onClick={this.closeClickHandler} className="fa fa-times"></i>
          </div>
      </div>
        <div className="recipients">
          <input type="text" valueLink={this.linkState('recipient')}/>
        </div>
        <div className="subject">
          <input type="text" valueLink={this.linkState('subject')}/>
        </div>
        <div className="body">
        <textarea valueLink={this.linkState('body')}/>
        </div>
        <div className="footer">
          <button onClick={this.createEmail}>Send</button>

        </div>
      </div>;

    }

    return (<div>
        {display}
      </div>
    );

  }

});

module.exports = EmailForm;
