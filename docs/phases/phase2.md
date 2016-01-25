# Phase 2: Flux Architecture and Email CRUD (2 days)

## Rails
### Models

### Controllers

### Views

## Flux
### Views (React Components)
* EmailIndex
  - EmailIndexItem
  - EmailTabNav
  - EmailFilterNav
* EmailForm
* EmailShow
  - EmailReplyForm 
  - EmailFilterNav
* Footer 

### Stores
* EmailStore

### Actions
* EmailActions.receiveAllEmails -> triggered by ApiUtil
* EmailActions.receiveSingleEmail
* EmailActions.updateEmail 
* EmailActions.deleteEmail
* EmailActions.createEmail

### ApiUtil
* ApiUtil.fetchAllEmails
* ApiUtil.fetchSingleEmail
* ApiUtil.createEmail
* ApiUtil.updateEmail
* ApiUtil.destroyEmail

### Constants 
* EmailConstants.CREATE
* EmailConstants.INDEX 
* EmailConstants.SHOW 
* EmailConstants.EDIT 
* EmailConstants.DESTROY

## Gems/Libraries
* Flux Dispatcher (npm)
* QuillJS
