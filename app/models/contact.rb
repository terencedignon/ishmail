class Contact < ActiveRecord::Base

  validates :x_id, :y_id, presence: true 

end
