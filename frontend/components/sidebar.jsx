var React = require('react');
var EmailActions = require('../actions/email_actions.js');
var EmailStore = require('../stores/email_store.js');
var DraftStore = require('../stores/draft_store.js');
var Contact = require('./contact.jsx');

var Sidebar = React.createClass({
  getInitialState: function() {
    return { unread: EmailStore.unread(), viewState: "inbox", unreadDrafts: DraftStore.unreadCount()};
  },
  componentDidMount: function() {
    ApiUtil.getAllEmail();
    this.emailListener = EmailStore.addListener(this._onEmailChange);
    this.draftListener = DraftStore.addListener(this._onDraftChange);
  },
  componentWillUnmount: function() {
    this.emailListener.remove();
    this.draftListener.remove();
  },
  composeClickHandler: function() {
    if (DraftStore.getOpenDrafts().length <= 2) {
    ApiUtil.createEmail({compose_set: true, sender: "helloyou", draft_set: true, read_set: true, subject: "New Message"});
    EmailActions.getComposeSet();
  }
  },
  _onDraftChange: function () {
    this.setState({ unreadDrafts: DraftStore.unreadCount() });
  },
  _onEmailChange: function() {
    this.setState({
      viewState: EmailStore.getViewState(),
      unread: EmailStore.unread(),
      unreadDrafts: EmailStore.unreadDrafts()
    });
  },
  generateSidebar: function () {

    // this.state.viewState === "drafts"
    var links = ["Inbox", "Starred", "Important", "Sent", "Drafts", "Links"];
    var lens = this.state.viewState;
    var emailUnread = (EmailStore.unread() > 0 ? "(" + EmailStore.unread() + ")" : "");
    var drafts = (DraftStore.all().length > 0 ? "(" + DraftStore.all().length + ")" : "");

    var lis = links.map(function(link) {

      if (lens === link.toLowerCase()) {

        if (lens === "inbox") {
          return <div key={Math.random()} className="select-holder"><div className="red-highlight"></div><li>
            <a className="selected" onClick={this.hrefClickHandler.bind(this, link.toLowerCase())} href="#">
              {link} {emailUnread}
            </a></li></div>;
        } else if (lens == "drafts") {
          return <div key={Math.random()} className="select-holder"><div className="red-highlight"></div><li key={Math.random()}>
          <a className="selected" onClick={this.hrefClickHandler.bind(this, link.toLowerCase())} href="#">
            {link} {drafts}
          </a></li></div>;
        } else {
          return <div className="select-holder"><div className="red-highlight"></div><li key={Math.random()}><a className="selected" onClick={this.hrefClickHandler.bind(this, link.toLowerCase())} href="#">{link}</a></li></div>;
        }
      }
      else if (link === "Drafts") {
        if (drafts.length > 0) return <li key={Math.random()}><a className="bolded" onClick={this.hrefClickHandler.bind(this, link.toLowerCase())} href="#">{link} {drafts}</a></li>;
        return <li key={Math.random()}><a onClick={this.hrefClickHandler.bind(this, link.toLowerCase())} href="#">{link} {drafts}</a></li>
      }
      else if (link === "Inbox" && emailUnread.length > 0) {
        return <li key={Math.random()}><a className="bolded" onClick={this.hrefClickHandler.bind(this, link.toLowerCase())} href="#">{link} {emailUnread}</a></li>;
      }
      else {
        return <li key={Math.random()}><a onClick={this.hrefClickHandler.bind(this, link.toLowerCase())} href="#">{link}</a></li>;
      }


    }.bind(this));
    // }});/.bind(this));
    return lis;
  },
  hrefClickHandler: function(name, e) {
    // EmailActions.sendUnreadEmail();
    EmailActions.createView(name);
    this.setState({ viewState: name});
  },
  render: function() {
    sidebarView = this.generateSidebar();


    return(
      <div className="sidebar">
        <button onClick={this.composeClickHandler}>Compose</button>
        <ul className="group">
          {sidebarView}
          <Contact />
        </ul>

      </div>

      );
}

});

module.exports = Sidebar;
