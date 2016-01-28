var React = require('react');
var EmailActions = require('../actions/email_actions.js');
var EmailStore = require('../stores/email_store.js');

var Sidebar = React.createClass({
  getInitialState: function() {
    return { viewState: "inbox"};
  },
  componentDidMount: function() {
    this.listener = EmailStore.addListener(this._onChange);
  },
  componentWillUnmount: function() {
    this.listener.remove();
  },
  composeClickHandler: function() {
    EmailActions.composeEmail();
  },
  _onChange: function() {
    this.setState({ viewState: EmailStore.getViewState() });
  },
  hrefClickHandler: function(name, e) {
    console.log(name);
    EmailActions.sendUnreadEmail();
    EmailActions.createView(name);
  },
  render: function() {
    console.log(this.state.viewState);

    var links = ["Inbox", "Starred", "Important", "Sent", "Drafts", "Links"];
    var lis = links.map(function(link) {
      if (this.state.viewState === link.toLowerCase()) {
      return <li className="selected"><a onClick={this.hrefClickHandler.bind(this, link.toLowerCase())} href="#">{link} ({EmailStore.unread()})</a></li>;
    }
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
