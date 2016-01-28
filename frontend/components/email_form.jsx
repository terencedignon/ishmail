var React = require('react');
var EmailStore = require('../stores/email_store.js');
var ApiUtils = require('../util/api_util.js');


var EmailForm = React.createClass({
  getInitialState: function() {
    return { title: "New Message", recipients: "", subject: "", body: "", created: false, display: false, minimize: false };
  },
  componentDidMount: function() {
    this.eventListener = EmailStore.addListener(this._onChange);
  },
  componentWillUnmount: function() {
    this.eventListener.remove();
  },
  titleClickHandler: function () {

    var opp = !(this.state.minimize);
    this.setState({minimize: opp});
  },
  _onChange: function () {
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
  recipientsChangeHandler: function (e) {
    if (e.currentTarget.value === "") {
      this.setState({ recipients: "Recipients"});
    } else {
      this.setState({ recipients: e.currentTarget.value });
    }
  },
  closeClickHandler: function () {
    // var params = {
    //   compose_set = false;
    //   this.state.
    // }
    ApiUtil.updateEmail(params);
  },

  render: function () {
    var display;

    if (this.state.display === false) {
      display = <div></div>;
    } else if (this.state.minimize) {
      display = <div onClick={this.titleClickHandler} className="email-form minimize">
         <span>{this.state.title}</span> <i onClick={this.closeClickHandler} className="fa fa-times"></i>
      </div>;
    } else {
      display = <div className="email-form group">
        <div onClick={this.titleClickHandler} className="title">
          <span>{this.state.title}</span>
        </div>

        <div className="recipients">
          <input onChange={this.recipientsChangeHandler} type="text" value={this.state.recipients}/>
        </div>
        <div className="subject">
          <input type="text"/>
        </div>
        <div className="body">
        <textarea></textarea>
        </div>
        <div className="footer">
        Send
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
