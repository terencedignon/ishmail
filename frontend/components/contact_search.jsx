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
    return {page: 1, query: "", type: "contacts"};
  },

  _onChange: function() {
    this.forceUpdate();
  },

  search: function (e) {
    var query = e.target.value;
    SearchApiUtil.search(query, 1, this.state.type);

    this.setState({page: 1, query: query});
  },

  nextPage: function () {
    var nextPage = this.state.page + 1;
    SearchApiUtil.search(this.state.query, nextPage, this.state.type);

    this.setState({page: nextPage});
  },
  componentWillUnmount: function() {
    this.listener.remove();
  },

  render: function() {
    //
    // var searchResults = SearchStore.all().slice(0, 5).map(function (email) {
    //     return <li>{email.subject}</li>;
    //     });
    //     // Displaying {SearchStore.all().length} of {SearchStore.meta().totalCount}
    //

      var searchResults = SearchStore.all().slice(0, 5).map(function (user) {
            return <li>{user.fname}</li>;
            });
      var display = <div className="contact-search">
          <input type="text" onKeyUp={this.search} />
            <ul className="contact-search-results">
              {searchResults }
            </ul>
        </div>;

    return (
      <div>{display}</div>
    );
  },


});

module.exports = Search;
