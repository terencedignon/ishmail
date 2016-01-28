var React = require('react');
var EmailActions = require('../actions/email_actions.js');
var EmailStore = require('../stores/email_store.js');

var Sidebar = React.createClass({
  getInitialState: function() {
    return { unread: EmailStore.unread(), viewState: "inbox", unreadDrafts: EmailStore.unreadDrafts()};
  },
  componentDidMount: function() {
    ApiUtil.getAllEmail();
    this.listener = EmailStore.addListener(this._onChange);
  },
  componentWillUnmount: function() {
    this.listener.remove();
  },
  composeClickHandler: function() {
    ApiUtil.createEmail({compose_set: true, subject: "New Message"});
    EmailActions.getComposeSet();
  },
  _onChange: function() {
    this.setState({
      viewState: EmailStore.getViewState(),
      unread: EmailStore.unread(),
      unreadDrafts: EmailStore.unreadDrafts()
    });
  },
  hrefClickHandler: function(name, e) {
    // EmailActions.sendUnreadEmail();
    EmailActions.createView(name);
  },
  render: function() {
    console.log(this.state.viewState);

    var links = ["Inbox", "Starred", "Important", "Sent", "Drafts", "Links"];
    var lis = links.map(function(link) {
      if (this.state.viewState === link.toLowerCase())
        return <li className="selected"><a onClick={this.hrefClickHandler.bind(this, link.toLowerCase())} href="#">{link} ({EmailStore.unread()})</a></li>;
      // else if (link === "Drafts")
      //   return <li><strong><a onClick={this.hrefClickHandler.bind(this, link.toLowerCase())} href="#">Drafts ({EmailStore.unread()})</a></strong></li>;
      // else
        return <li><a onClick={this.hrefClickHandler.bind(this, link.toLowerCase())} href="#">{link}</a></li>;
    }.bind(this));


    return(
      <div className="sidebar">
        <button onClick={this.composeClickHandler}>Compose</button>
        <ul className="group">
          {lis}
        </ul>
      </div>

      );
}

});

module.exports = Sidebar;
