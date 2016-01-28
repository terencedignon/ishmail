var React = require('react');
var EmailStore = require('../stores/email_store.js');
var ApiUtils = require('../util/api_util.js');


var EmailForm = React.createClass({
  getInitialState: function() {
    return { title: "", subject: "New Message", body: "Body", display: false, minimize: false };
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
    this.setState({ display: EmailStore.getDisplay() });
    var params = {
      subject: this.state.subject,
      body: this.state.body,
      compose_set: true
    };
    ApiUtil.createEmail(params);
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
         {this.state.title} <i onClick={this.closeClickHandler} className="fa fa-times"></i>
      </div>;
    } else {
      display = <div className="email-form">
        <div onClick={this.titleClickHandler} className="title">
          New Message
        </div>

        <div className="recipients">
          <input type="text"/>
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
