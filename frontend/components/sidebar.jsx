var React = require('react');
var EmailActions = require('../actions/email_actions.js');


var Sidebar = React.createClass({
  composeClickHandler: function() {
    EmailActions.composeEmail();
  },
  hrefClickHandler: function(name) {
    EmailActions.createView(name);
  },
  render: function() {
    return(

      <div className="sidebar">
        <button onClick={this.composeClickHandler}>Compose</button>
        <ul className="group">
        <li><a onClick={this.hrefClickHandler.bind(this, "inbox")} href="#">Inbox</a></li>
        <li><a onClick={this.hrefClickHandler.bind(this, "starred")} href="#">Starred</a></li>
        <li><a onClick={this.hrefClickHandler.bind(this, "important")} href="#">Important</a></li>
        <li><a onClick={this.hrefClickHandler.bind(this, "sent")} href="#">Sent Mail</a></li>
        <li><a onClick={this.hrefClickHandler.bind(this, "drafts")} href="#">Drafts</a></li>
        <li><a onClick={this.hrefClickHandler.bind(this, "links")} href="#">Links</a></li>
        </ul>
      </div>

      );
}

});

module.exports = Sidebar;
