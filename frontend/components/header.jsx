var React = require('react');


var Header = React.createClass({
  getInitialState: function() {
    return { indexToolbar: true };
  },

  render: function () {
    var toolbar;
    if (this.state.indexToolbar) {
      toolbar = <div>
        <li>
        Select All
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
