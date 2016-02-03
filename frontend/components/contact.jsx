var React = require('react');
var ContactStore = require('../stores/contact_store.js');
var ApiUtil = require('../util/api_util.js');
var ContactConstants = require('../constants/contact_constants.js');
var ContactSearch = require('./contact_search.jsx');


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
  render: function () {

    var contactList;
    if (this.state.contacts.length > 0 ) {
      contactList = this.state.contacts.map(function(contact) {

        return <li className="contact-li" key={Math.random()}>{contact.fname} {contact.lname}</li>;
      }.bind(this));
    } else {
      contactList = <li>Add contacts</li>;
    }
    return(
      <div className="contact-holder">
        <div className="contact-header">

      

            <ContactSearch />
        </div>
        <ul>
          {contactList}
        </ul>
      </div>);
  }
});

module.exports = Contact;
