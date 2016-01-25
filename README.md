# Ishmael

[Heroku link][heroku]

[heroku]: http://www.herokuapp.com

## Minimum Viable Product

Ishmael is a web application inspired by Gmail built using Ruby on Rails
and React.js. Ishmael allows users to:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [ ] Create an account
- [ ] Log in / Log out
- [ ] Read and write emails.
- [ ] Star/unstar messages
- [ ] Mark as read/unread/spam/trash
- [ ] Save unsent emails as drafts
- [ ] Register a message's priority and type
- [ ] Modify user settings; allows for signatures and vacation responses.
- [ ] Dynamic real-time searches
- [ ] Auto-complete contacts in email composition
- [ ] Chat with friends

## Design Docs
* [View Wireframes][view]
* [DB schema][schema]

[view]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, User, Email, Chat, and Contact Models, and JSON API (1.5 days)

In Phase 1, I will begin by implementing user signup and authentication (using
BCrypt). There will be a basic landing page after signup that will contain the
container for the application's root React component. Before building out the
front end, I will begin by setting up a full JSON API for Users, Emails, Chats, Contacts, and Activities.

[Details][phase-one]

### Phase 2: Flux Architecture and Email CRUD (2.5 days)

Phase 2 is focuses on setting up Flux, the React Router, and the React view
structure for the main application. After the basic Flux architecture is
set up, a Note store will be implemented and a set of actions corresponding to
the needed CRUD functionality created. Once done, I will create React
views for EmailIndex, EmailIndexItem, EmailForm, EmailShow, and Footer. By the end of Phase 2,
email can be created, read, edited and destroyed in the browser. Email will
save as a draft every 10 seconds. While constructing the views I will begin styling the CSS.

[Details][phase-two]

### Phase 3: Contacts and Chat (2.5 days)

Phase 3 adds Contacts, with ContactIndex, ContactIndexItem, and ContactSearch.  Chat will have a ChatForm view.  

[Details][phase-three]

### Phase 4: Header, Settings, and Activity (1.5 days)

Phase 4 adds search functionality to the top bar, a settings panel to modify user preferences, and an activity pop-out to show previous session information.

[Details][phase-four]

### Phase 5: Styling and Seeding (1 day)

Phase 5 wraps up the project with CSS styling and seeding.

[Details][phase-five]

### Bonus Features (TBD)
- [ ] Custom labels
- [ ] Forwarding
- [ ] Modifiable tabs
- [ ] Custom spam filters
- [ ] Multiple sessions

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
