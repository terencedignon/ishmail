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

var EmailIndex = React.createClass({
  getInitialState: function () {
    return { emails: EmailStore.all(), drafts: DraftStore.all(), eview: "inbox", selectEmails: SelectStore.all(), tabView: "primary"};
  },
  componentDidMount: function () {
    this.emailListener = EmailStore.addListener(this._onEmailChange);
    this.selectListener = SelectStore.addListener(this._onSelectChange);
    this.draftListener = DraftStore.addListener(this._onDraftListener);
    ApiUtil.getAllEmail();
  },
  componentWillUnmount: function () {
    this.emailListener.remove();
    this.selectListener.remove();
    this.draftListener.remove();
  },
  _onEmailChange: function () {
    if (EmailStore.getViewState() !== this.state.view) {
      this.setState({ emails: EmailStore.setFilterEmails(),
        view: EmailStore.getViewState()});
    } else {
      this.setState({ emails: EmailStore.all()});
    }
  },
  _onSelectChange: function () {
    this.setState({ selectEmails: SelectStore.all() });
    console.log(this.state.selectEmails);
  },
  _onDraftChange: function () {
    this.setState({ drafts: DraftStore.all() });
  },
  clickTabView: function (name) {
    this.setState({ tabView: name });
  },
  render: function() {
    var tabs = ["primary", "social", "promotions", "updates", "forums"];
    var icons = ["fa fa-inbox", "fa fa-users", "fa fa-tags", "fa fa-info-circle", "fa fa-comments"];

    var lis = [];

    for (var i = 0; i < tabs.length; i++) {
      var name = tabs[i][0].toUpperCase() + tabs[i].slice(1);
      if (tabs[i] === this.state.tabView) {
        lis.push(<li className={tabs[i] + "selected"}><i className={icons[i]}/> {name} </li>);
      } else {
        lis.push(<li onClick={this.clickTabView.bind(this, tabs[i])} className={tabs[i]}><i className={icons[i]}/> {name} </li>);
      }
    }

    var headerNav = <ul className="index-header group">
    {lis}
    </ul>;

    var listedEmails = (this.state.view === "drafts" ? DraftStore.all() : this.state.emails);

    var indexItems = <div></div>;
    if (!(typeof this.state.emails === "undefined")) {
      var indexItems = listedEmails.map(function(email) {
        if (this.state.selectEmails.indexOf(email.id) !== -1) {
          return <EmailIndexItem key={email.id} id={email.id} email={email} checked="true"/>;
        } else {
          return <EmailIndexItem key={email.id} id={email.id} email={email} checked="false"/>;
        }}.bind(this));
    }
    var email = this.state.emails;

    var mainContent = (typeof this.props.params.id === "undefined" ?
      <ul>{indexItems}</ul> : <EmailShow />);

    if (this.state.view !== "inbox") {
      headerNav = <div></div>;
    }
    if (indexItems.length <= 0) {
      indexItems = <div className="index-header group">There are no conversations with this label</div>;
    }
    return (
      <div className="content-container group">

        <EmailFormIndex />
        {this.props.children}
        <div className="main group">
          {headerNav}
          {mainContent}
        </div>
      </div>
    );
  }
});


module.exports = EmailIndex;
