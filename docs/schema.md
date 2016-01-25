# Schema Information

## users
column name           | data type | details
----------------------|-----------|-----------------------
id                    | integer   | not null, primary key
username              | string    | not null
fname                 | string    | not null
lname                 | string    | not null
session_token		      | string    | not null
password_digest       | string    | not null
vaca_response_set     | boolean   | not null, default: false
vaca_response         | string    | not null, default: false
signature 		        | string    | not null, default: ""
pagination 			      | integer   | not null, default: 25
show_snippets_set     | boolean   | not null, default: false
auto_complete_set     | boolean   | not null, default: false
importance_set        | boolean   | not null, default: false
online  		          | boolean   | not null, default: false


## emails
column name    | data type | details
---------------|-----------|-----------------------
id             | integer   | not null, primary key
parent_email   | integer   | not null, foreign key (references emails), indexed
user_id        | integer   | not null, foreign key (references users), indexed
sender         | string    | not null
subject        | string    | default: ""
body           | string    | default: ""
created_at     | datetime  | not null
updated_at	   | datetime  | not null
starred_set    | boolean   | not null, default: false
importance_set | boolean   | not null, default: false
delete_set 	   | boolean   | not null, default: false


## chats
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
x_id        | integer   | not null, foreign key (references users), indexed
y_id        | integer   | not null, foreign key (references users), indexed

## lines
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
chat_id     | integer   | not null, foreign key (references chats), indexed
created_at  | datetime  | not null
line        | string    | not null, default: ""

## activity
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references chats), indexed
browser 	  | string	  | not null
location    | string    | not null
ip_address  | integer   | not null

## contacts
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
x_id  	  	| integer   | not null, foreign key (references users), indexed
y_id   	    | integer   | not null, foreign key (references users), indexed
