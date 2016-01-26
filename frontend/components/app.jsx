var React = require('react');
var EmailIndex = require('./email_index.jsx');

var App = React.createClass({
  render: function() {
    return(
      <div>
        <EmailIndex />
      </div>
    );

  }
});

module.exports = App;
