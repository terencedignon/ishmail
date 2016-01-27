var React = require('react');


var Header = React.createClass({

  render: function () {
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
          &nbsp;
        </div>

      </div>

      </header>
    );

  }

});

module.exports = Header;
