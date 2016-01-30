var React = require('react');
var EmailStore = require('../stores/email_store.js');
var ReactRouter = require('react-router');
var ApiUtil = require('../util/api_util.js');
var Sidebar = require('../components/sidebar.jsx');


var EmailShow = React.createClass({
  getInitialState: function () {
    return { draft: false }
  },
  componentDidMount: function () {
    this.listener = EmailStore.addListener(this._onChange);
    ApiUtil.getEmail(this.props.params.id);
  },
  componentWillUnmount: function () {
    this.listener.remove();
  },
  _onChange: function () {
    this.setState({ draft: true });
    console.log("changing");
  },
  render: function() {
    debugger
    return (<div>
      hello
    </div>);
  }
});


module.exports = EmailShow;
