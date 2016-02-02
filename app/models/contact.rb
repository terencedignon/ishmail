class Contact < ActiveRecord::Base

  belongs_to :user
  belongs_to :subject, class_name: "User", foreign_key: :contact_id, primary_key: :id

end
