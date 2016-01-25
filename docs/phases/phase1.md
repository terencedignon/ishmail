# Phase 1: User Authentication, Note Model and JSON API

## Rails
### Models
* User
* Email 
* Chat 
* Activity

### Controllers
* UsersController (create, new, update, destroy)
* SessionsController (create, new, destroy)
* Api::EmailsController (create, destroy, index, show, update)
* Api::LinesController (create)
* Api::ChatsController (create, destroy, show, update)
* Api::ContactsController (create, index, update, destroy)
* Api::Activity (create, update, index)

### Views
* users/new.html.erb
* session/new.html.erb
* emails/index.json.jbuilder
* emails/show.json.jbuilder
* chats/show.json.jbuilder 
* activities/index.json.jbuilder

## Flux
### Views (React Components)

### Stores

### Actions

### ApiUtil

## Gems/Libraries
* BCrypt (Gem)