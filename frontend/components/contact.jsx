var React = require('react');
var ContactStore = require('../stores/contact_store.js');
var ApiUtil = require('../util/api_util.js');
var ContactConstants = require('../constants/contact_constants.js');
var ContactSearch = require('./contact_search.jsx');
var EmailActions = require('../actions/email_actions.js');

var Contact = React.createClass({

  getInitialState: function () {
    return { contacts: ContactStore.all() };
  },
  componentDidMount: function() {
    this.contactListener = ContactStore.addListener(this._onContactChange);
    ApiUtil.getContacts();
  },
  componentWillUnmount: function() {
    this.contactListener.remove();
  },
  _onContactChange: function () {
    this.setState({ contacts: ContactStore.all() });
  },
  onMouseOver: function (e) {
    // debugger
    $(e.currentTarget).find('div').css("display", "block");

  },

  onMouseLeave: function (e) {
    $(e.currentTarget).find('div').css("display", "none");
  },
  composeEmail: function (e) {

    ApiUtil.createEmail({compose_set: true, sender: "terrypdignon", draft_set: true, recipient: e.currentTarget.outerText, read_set: true, subject: "(no subject)"});
    EmailActions.getComposeSet();
  },
  render: function () {

    var contactList;
    if (this.state.contacts.length > 0 ) {
      contactList = this.state.contacts.map(function(contact) {

        return <li onClick={this.composeEmail} onMouseOver={this.onMouseOver} onMouseLeave={this.onMouseLeave} className="contact-holder-li" key={contact.id}>
          {contact.fname} {contact.lname}
          <div className="hidden-contact">
            <div className="hidden-contact-details">
              <h3>{contact.fname} {contact.lname}</h3><p/>
              <h4>{contact.username + "@ishmael.com"}</h4>
            </div>
            <div className="hidden-contact-photo">
              &nbsp;
            </div>
        </div>
        </li>;
      }.bind(this));
    } else {
      contactList = <li>Add contacts</li>;
    }
    return(
      <div className="contact-holder">
        <div className="contact-header">



            <ContactSearch />
        </div>
        <ul className="contact-holder-list">
          {contactList}
        </ul>
      </div>);
  }
});

module.exports = Contact;
