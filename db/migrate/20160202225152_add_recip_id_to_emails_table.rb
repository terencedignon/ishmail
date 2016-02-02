class AddRecipIdToEmailsTable < ActiveRecord::Migration
  def change
    add_column :emails, :recipient_id, :integer, null: false 
  end
end
