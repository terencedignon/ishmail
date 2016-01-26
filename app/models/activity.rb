class Activity < ActiveRecord::Base

  validates :user_id, :browser, :location, :ip_address, presence: true 

end
