class Line < ActiveRecord::Base

  validates :line, :chat_id, presence: true 

end
