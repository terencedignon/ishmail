var React = require('react');
var EmailStore = require('../stores/email_store.js');
var ReactRouter = require('react-router');
var ApiUtil = require('../util/api_util.js');
var Sidebar = require('../components/sidebar.jsx');
var EmailConstants = require('../constants/email_constants.js');
var EmailStore = require('../stores/email_store.js');
var EmailShowContact = require('../components/email_show_contact.jsx');
var EmailShowItem = require('../components/email_show_item.jsx');
var EmailShowForm = require('../components/email_show_form.jsx');

var EmailShow = React.createClass({
  getInitialState: function () {
    return { draft: false, email: "", maxList: [], maxAll: false};
  },
  componentDidMount: function () {
    this.emailListener = EmailStore.addListener(this._onEmailChange);
    ApiUtil.getEmail(this.props.params.id, this.ensureRead(this.props.params.id));
  },
  componentWillUnmount: function () {
    this.emailListener.remove();
  },
  importanceClickHandler: function () {
    var importance_set = !(this.state.email.importance_set);
    ApiUtil.updateEmail(this.state.email.id, { importance_set: importance_set});

  },
  clickHandler: function (e) {
    var list = this.state.maxList;
    list.push(e.currentTarget.id);
    this.setState({ maxList: list});
    // debugger
    // this.setState({maxAll: true});
    // this.setState({ })
  },
  _onEmailChange: function () {
    this.setState({ email: EmailStore.getEmail() });
  },
  ensureRead: function (id) {
    ApiUtil.updateEmail(id, {read_set: true}, EmailConstants.UPDATE_EMAIL);
  },
  render: function() {

    var renderedShow = [];
    var display;
    var topEmail;
    if (typeof this.state.email === "object" && !(this.state.email instanceof Array)) {
      topEmail = <EmailShowItem key={this.state.email.id} child={false} email={this.state.email}/>;
      renderedShow = this.state.email.emails.map(function(childEmail, i) {
        return <EmailShowItem key={childEmail.id} email={childEmail} child={true}/>;
          }.bind(this));
      renderedShow.unshift(topEmail);
    } else {
        topEmail = <div/>;
        renderedShow = <div/>;
      }

      //     return <EmailShowItem key={childEmail.id} ensureRead={this.ensureRead} clickHandler={this.clickHandler} max={this.state.maxAll || this.state.maxList.indexOf(childEmail.id.toString()) !== -1} email={childEmail} ensureRead={this.ensureRead} length={this.state.email.emails.length} index={i} child={true}/>;
      //   }.bind(this));


    if (this.state.email instanceof Object && renderedShow.length == this.state.email.emails.length + 1) {
      var importanceDisplay = (this.state.email.importance_set ? "fa fa-square important" : "");
      display =
        <div className="main-show-holder">
        <div className="email-show-holder">
          <h2>{this.state.email.subject} <i onClick={this.importanceClickHandler} className={importanceDisplay}></i> </h2>
            <ul className="email-show-ul">

              {renderedShow}
          </ul>
          </div>
        <div className="show-reply-holder">
          <h2>Reply</h2>
          <EmailShowForm/>
        </div>
      </div>
  ;
  } else {
    display = <div></div>;
  }

    //
    //   topEmail = <EmailShowItem clickHandler={this.clickHandler} max={this.state.maxAll || this.state.maxList.indexOf(this.state.email.id.toString()) !== -1} email={this.state.email} hasChildren={this.state.email.emails.length > 0} child={false}/>;
    //   renderedShow = this.state.email.emails.map(function(childEmail, i) {
    //     return <EmailShowItem key={childEmail.id} ensureRead={this.ensureRead} clickHandler={this.clickHandler} max={this.state.maxAll || this.state.maxList.indexOf(childEmail.id.toString()) !== -1} email={childEmail} ensureRead={this.ensureRead} length={this.state.email.emails.length} index={i} child={true}/>;
    //   }.bind(this));
    // } else {
    //   topEmail = <div></div>;
    //   renderedShow = <div></div>;
    // }

    // <EmailShowForm sender={this.state.email.sender} />

    return (
       <div className="main group">
         {display}
       </div>
    );
  }
});


module.exports = EmailShow;
