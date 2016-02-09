json.extract!(
  email, :id, :parent_email_id, :user_id, :subject,
    :from_email, :from_name, :raw_headers, :raw_text, :raw_html,
    :body, :starred_set, :importance_set, :delete_set, :recipient,
    :emails, :created_at, :updated_at, :recipients, :archive_set, :draft_set, :read_set, :spam_set, :compose_set, :sent_set
)
