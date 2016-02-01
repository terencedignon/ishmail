json.extract!(
  email, :id, :parent_email_id, :user_id, :sender, :subject,
    :body, :starred_set, :importance_set, :delete_set,
    :created_at, :updated_at, :draft_set, :read_set, :compose_set, :sent_set, :select_set
)

query = email.subquery



json.all_read query[0]
json.most_recent query[1]
json.emails query[2]
