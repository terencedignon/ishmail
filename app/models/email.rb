class Email < ActiveRecord::Base

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
end
