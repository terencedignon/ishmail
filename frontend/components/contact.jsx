var React = require('react');
var ContactStore = require('../stores/contact_store.js');
var ApiUtil = require('../util/api_util.js');
var ContactConstants = require('../constants/contact_constants.js');
var ContactSearch = require('./contact_search.jsx');
var EmailActions = require('../actions/email_actions.js');
var ContactActions = require('../actions/contact_actions.js');

var Contact = React.createClass({

  getInitialState: function () {
    return { contacts: ContactStore.all(), map: [], dropdown: true};
  },
  componentDidMount: function() {
    ApiUtil.getContacts();
    this.contactListener = ContactStore.addListener(this._onContactChange);
    ContactActions.search("");
  },
  componentWillUnmount: function() {
    this.contactListener.remove();
  },
  _onContactChange: function () {
    var contacts = (ContactStore.filteredContacts().length > 0 ?
      ContactStore.filteredContacts() : ContactStore.all());

    this.setState({ contacts: contacts });
  },
  onMouseOver: function (e) {
    if (this.state.dropDown === false) $(e.target).find('div').css("display", "block");
  },

  componentWillUpdate: function () {
    if (this.state.dropdown) {
      $('body').on("click", function() {
        $('.contact-drop-down').css("display", "none");
      });
    }
  },

  onMouseLeave: function (e) {
    $(e.currentTarget).find('div').css("display", "none");
  },
  composeEmail: function (e) {
    ApiUtil.createEmail({compose_set: true, sender: "ishmael", draft_set: true, recipient: e.currentTarget.id + "@ishmael.website", read_set: true, subject: ""});
    EmailActions.getComposeSet();
  },
  searchChange: function (e) {
    ContactActions.search(e.currentTarget.value);
    if (ContactStore.filteredContacts().length !== ContactStore.all().length) {
      $('.contact-drop-down').css("display", "block");
      this.setState({dropDown: true });
    } else {
      $('.contact-drop-down').css("display", "none");
      this.setState({ dropDown: false });
    }
  },

  render: function () {
    var contactList;
    var contactDropDownList;

    if (this.state.contacts.length > 0 ) {

      contactDropDownList = this.state.contacts.map(function(contact) {
        return <li id={contact.username} onClick={this.composeEmail} className="contact-holder-li" key={contact.id}>
          {contact.fname} {contact.lname}
          <div className="hidden-contact">
            <div className="hidden-contact-details">
              <h4>{contact.fname} {contact.lname} {"<" + contact.username + "@ishmael.website>"}</h4><p/>

            </div>
            <div className="hidden-contact-photo">
              &nbsp;
            </div>
        </div>
        </li>;
      }.bind(this));

      contactList = this.state.contacts.map(function(contact) {
        return <li id={contact.username} onClick={this.composeEmail} onMouseOver={this.onMouseOver} onMouseLeave={this.onMouseLeave} className="contact-holder-li" key={contact.id}>
          <div className="contact-square">&nbsp;</div>
          {contact.fname} {contact.lname}
          <div className="hidden-contact">
            <div className="hidden-contact-details">
              <h3>{contact.fname} {contact.lname}</h3><p/>
              <h4>{contact.username + "@ishmael.website"}</h4>
            </div>
            <div className="hidden-contact-photo">
              &nbsp;
            </div>
        </div>
        </li>;
      }.bind(this));
    } else {
      contactList = <li></li>;
    }
    return(
      <div className="contact-holder">
        <div className="contact-header">
          <input type="text" onChange={this.searchChange} preload="Search people..." />
            <div className="contact-drop-down">
              <div className="contact-drop-down-ul">
                {contactList}
              </div>
            </div>
        </div>
        <ul className="contact-holder-list">
          {contactDropDownList}
        </ul>
      </div>);
  }
});

module.exports = Contact;
