
var React = require('react');
var SearchStore = require('../stores/search_store.js');
var SearchApiUtil = require('../util/search_api_util');
var EmailIndexItem = require('./email_index_item');
var SearchActions = require('../actions/search_actions.js');
var History = require('react-router').History;
// var PostIndexItem = require('./posts/post_index_item');

var Search = React.createClass({
  mixins: [History],
  componentDidMount: function() {
    this.listener = SearchStore.addListener(this._onChange);
  },
  componentWillUnmount: function () {
    this.listener.remove();
  },
  getInitialState: function () {
    return {page: 1, query: "", type: "email"};
  },

  _onChange: function() {
      if (SearchStore.type() === this.state.type) {
          this.searchResults = SearchStore.all().slice(0, 5).map(function (email) {
                return <li key={Math.random()} id={email.id} onClick={this.clickHandler}><i className="fa fa-envelope envelope"></i> {email.subject}</li>;
          }.bind(this));
            }
    this.forceUpdate();
  },
  clickHandler: function (e) {
    ApiUtil.getEmail(e.currentTarget.id);
    var newID = e.currentTarget.id;
    this.setState({ query: "" });
    SearchActions.clearSearch();
    this.history.pushState(null, "inbox/" + newID, {});

  },
  search: function (e) {
    var query = e.target.value;
    if (e.target.value.length > 3) { }
      SearchApiUtil.search(query, 1, this.state.type);
      this.setState({page: 1, query: query});

  },
  nextPage: function () {
    var nextPage = this.state.page + 1;
    SearchApiUtil.search(this.state.query, nextPage, this.state.type);

    this.setState({page: nextPage});
  },

  render: function() {
    //
    // var searchResults = SearchStore.all().slice(0, 5).map(function (email) {
    //     return <li>{email.subject}</li>;
    //     });
    //     // Displaying {SearchStore.all().length} of {SearchStore.meta().totalCount}
    //

    this.searchResults = this.searchResults || <div></div>;
    var display;
      // if (SearchStore.type() === this.state.type) {
      //   searchResults = SearchStore.all().slice(0, 5).map(function (email) {
      //       return <li key={Math.random()} id={email.id} onClick={this.clickHandler}><i className="fa fa-envelope envelope"></i> {email.subject}</li>;
      //       }.bind(this));
      //   }
        display = <div className="header-top group">

            <div className="top-left">
                <h1><a href="/#">Ishmael</a></h1>
            </div>
              <div className="top-right">
                <input type="text" placeholder="" onInput={this.search} value={this.state.query}/>
                <button><i className="fa fa-search"></i></button>

                <ul className="search-dropdown">
                  { this.searchResults }
                </ul>
            </div>
          </div>;
    return (
      <div>{display}</div>
    );
  },


});

module.exports = Search;
