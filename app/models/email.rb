class Email < ActiveRecord::Base

 # default_scope { order('created_at DESC') }
 #


  # validates :sender, :user_id, presence: true

  belongs_to :user
  has_many(
    :emails,
    class_name: "Email",
    foreign_key: :parent_email_id,
    primary_key: :id
    )
  belongs_to(
    :email,
    class_name: "Email",
    foreign_key: :parent_email_id,
    primary_key: :id
  )

  def self.get_by_current_user(id)
    Email.where(user_id: id)
  end

  def most_recent
    recent = nil
    self.emails.push(self).each do |email|
      recent = email.created_at if recent.nil? || recent < email.created_at
    end
    recent
  end

  def subquery
    read = true
    recent = nil
    children = self.emails
    children.push(self).each do |email|
      recent = email.created_at if recent.nil? || recent < email.created_at
      read = false if email.read_set == false
    end

    return [read, recent, children]
  end

end
