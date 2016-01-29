var React = require('react');
var EmailStore = require('../stores/email_store.js');
var EmailActions = require('../actions/email_actions.js');

var Header = React.createClass({
  getInitialState: function() {
    return { indexToolbar: true };
  },
  selectAll: function() {
    EmailActions.selectAll();
  },
  render: function () {
    var toolbar;
    if (this.state.indexToolbar) {
      toolbar = <div>
        <li>
        <a onClick={this.selectAll} href="#">Select All</a>
        </li>
        <li>
        <i className="fa fa-refresh"></i>
        </li>
        <li>
        More
        </li></div>;
    }

    return (
      <header>
        <div className="header group">
        <div className="top-left">
          <h1>Ishmael</h1>
        </div>
        <div className="top-right">
          <input type="text"/>
          <button><i className ="fa fa-search"></i></button>

        </div>
        <div className="bottom-left">
          &nbsp;
        </div>
        <div className="bottom-right">
          <ul className="header-nav group">
            {toolbar}
          </ul>
        </div>
      </div>

      </header>
    );

  }

});

module.exports = Header;
