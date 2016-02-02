
var React = require('react');
var SearchStore = require('../stores/search_store.js');
var SearchApiUtil = require('../util/search_api_util');
var EmailIndexItem = require('./email_index_item');
// var PostIndexItem = require('./posts/post_index_item');

var Search = React.createClass({

  componentDidMount: function() {
    this.listener = SearchStore.addListener(this._onChange);
  },
  componentWillUnmount: function () {
    this.listener.remove();
  },
  getInitialState: function () {
    return {page: 1, query: ""};
  },

  _onChange: function() {
    this.forceUpdate();
  },

  search: function (e) {
    var query = e.target.value;
    SearchApiUtil.search(query, 1);

    this.setState({page: 1, query: query});
  },

  nextPage: function () {
    var nextPage = this.state.page + 1;
    SearchApiUtil.search(this.state.query, nextPage);

    this.setState({page: nextPage});
  },

  componentWillUnmount: function() {
    this.listener.remove();
  },

  render: function() {

    var searchResults = SearchStore.all().map(function (searchResult) {
      if (searchResult._type === "Email") {
        return <EmailIndexItem user={searchResult} />;
      }
    });

    return (
      <div>
        <h1 className="title">Search!</h1>
        <input type="text" placeholder="wut u want" onKeyUp={ this.search } />
        Displaying {SearchStore.all().length} of
        {SearchStore.meta().totalCount}
        <button onClick={this.nextPage}>Next ></button>

        <ul className="users-index">{ searchResults }</ul>
      </div>
    );
  },


});

module.exports = Search;
