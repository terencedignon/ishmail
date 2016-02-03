class AddRecipientToEmailTable < ActiveRecord::Migration
  def change
    add_column :emails, :recipient, :string, default: ""
  end
end
