json.extract!(
  email, :id, :parent_email_id, :user_id, :sender, :subject,
    :body, :starred_set, :importance_set, :delete_set,
    :created_at, :updated_at, :draft_set, :read_set, :compose_set, :sent_set, :select_set
)
