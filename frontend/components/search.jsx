
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

    var searchResults = SearchStore.all().map(function (email) {
        return <li>{email.subject}</li>;
        });

    return (
          <div className="top-right">
            <input type="text" placeholder="" onKeyUp={this.search} />
            Displaying {SearchStore.all().length} of {SearchStore.meta().totalCount}
            <button onClick={this.nextPage}>Next ></button>
            <button><i className="fa fa-search"></i></button>

        </div>
        {searchResults }
      </div>


    );
  },


});

module.exports = Search;
