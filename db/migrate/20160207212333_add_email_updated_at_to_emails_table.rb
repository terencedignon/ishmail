class AddEmailUpdatedAtToEmailsTable < ActiveRecord::Migration
  def change
    add_column :emails, :email_updated_at, :datetime, default: Time.new 
  end
end
