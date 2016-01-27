class AddReadSetToEmailsTable < ActiveRecord::Migration
  def change
    add_column :emails, :read_set, :boolean, default: false 
  end
end
