class Email < ActiveRecord::Base


  validates :sender, :user_id, presence: true
  belongs_to :user

  def self.get_by_current_user(id)

    Email.where(user_id: id)
  end
end
