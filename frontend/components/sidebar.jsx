var React = require('react');

var Sidebar = React.createClass({

  render: function() {
    return(

      <div className="sidebar">
        <button>Compose</button>
        <ul className="group">
        <li className="selected"><a href="#">Inbox</a></li>
        <li><a href="#">Starred</a></li>
        <li><a href="#">Important</a></li>
        <li><a href="#">Sent Mail</a></li>
        <li><a href="#">Drafts</a></li>
        <li><a href="#">Links</a></li>
        </ul>
      </div>

      );
}

});

module.exports = Sidebar;
