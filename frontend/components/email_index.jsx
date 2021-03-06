var React = require('react');
var EmailStore = require('../stores/email_store.js');
var EmailIndexItem = require('./email_index_item.jsx');
var EmailActions = require('../actions/email_actions.js');
var ApiUtils = require('../util/api_util.js');
var Sidebar = require('./sidebar.jsx');
var EmailFormIndex = require('./email_form_index.jsx');
var SelectStore = require('../stores/select_store.js');
var SelectActions = require('../actions/select_actions.js');
var DraftStore = require('../stores/draft_store.js');
var SpamStore = require('../stores/spam_store.js');

var EmailIndex = React.createClass({
  getInitialState: function () {
    return {
      emails: EmailStore.setFilterEmails(), drafts: DraftStore.all(),
      spam: SpamStore.all(), view: "inbox", selectEmails: SelectStore.all(), tabView: "primary"
    };
  },
  componentDidMount: function () {
    this.emailListener = EmailStore.addListener(this._onEmailChange);
    this.selectListener = SelectStore.addListener(this._onSelectChange);
    this.draftListener = DraftStore.addListener(this._onDraftChange);
    this.spamListener = SpamStore.addListener(this._onSpamChange);
    ///seteventlistenerhere
    this.autoUpdate = setInterval(ApiUtil.autoUpdate, 5000);
    ApiUtil.getAllEmail();
  },
  componentWillUnmount: function () {
    this.emailListener.remove();
    this.selectListener.remove();
    this.draftListener.remove();
    this.spamListener.remove();
    clearInterval(this.autoUpdate);
  },
  _onEmailChange: function () {
    this.setState({ emails: EmailStore.setFilterEmails(), view: EmailStore.getViewState()});
  },
  _onSelectChange: function () {
    this.setState({ selectEmails: SelectStore.all() });
  },
  _onDraftChange: function () {
    this.setState({ drafts: DraftStore.all() });
  },
  _onSpamChange: function () {

    this.setState ({ spam: SpamStore.all() });
  },

  fetchHeaderTags: function () {
    var tabs = ["primary", "social", "promotions", "updates", "forums"];
    var icons = ["fa fa-inbox", "fa fa-user", "fa fa-tags", "fa fa-info-circle", "fa fa-comments"];
    var lis = [];
    for (var i = 0; i < tabs.length; i++) {
      var name = tabs[i][0].toUpperCase() + tabs[i].slice(1);
      if (tabs[i] === this.state.tabView) {
        lis.push(<li key={Math.random()} className={tabs[i] + "selected"}><i className={icons[i]}/> {name} </li>);
      } else {
        lis.push(<li key={Math.random()} onClick={this.clickTabView.bind(this, tabs[i])} className={tabs[i]}><i className={icons[i]}/> {name} </li>);
      }
    }
    return lis;
  },

  fetchEmailList: function () {

    if (this.state.view === "drafts") return DraftStore.all() ;
    if (this.state.view === "spam") return SpamStore.all();
    return this.state.emails;
  },
  clickTabView: function (name) {
    this.setState({ tabView: name });
  },
  render: function() {


    var lis = this.fetchHeaderTags();
    var emailList = this.fetchEmailList();
    var display;
    var indexHeaderLabels;
    
    if (!(typeof this.state.emails === "undefined")) {
      var indexItems = emailList.map(function(email) {

        if (this.state.selectEmails.indexOf(email.id) !== -1) {
          return <EmailIndexItem view={this.state.view} key={Math.random()} id={email.id} email={email} checked="true"/>;
        } else {
          return <EmailIndexItem view={this.state.view} key={Math.random()} id={email.id} email={email} checked="false"/>;
        }}.bind(this));
    }


    if (this.state.view === "inbox") {
      indexHeaderLabels = <ul key={Math.random()} className="index-header group">{lis}</ul>;
    } else {
      indexHeaderLabels = <div></div>;
    }
    // if (indexItems.length <= 0) {
    //   indexItems = <div className="index-header group">There are no conversations with this label</div>;
    // }

    if (lis.length === 5) {

      display = <div className="content-container group">

        {this.props.children}
        <div className="main group">
          {indexHeaderLabels}
          <ul>{indexItems}</ul>
        </div>
      </div>;
    } else {

      display =
      <div className="loading">
        test
      </div>;
    }

    return (
      <div>
        {display}
      </div>
    );
  }
});


module.exports = EmailIndex;
