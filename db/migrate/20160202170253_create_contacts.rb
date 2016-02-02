class CreateContacts < ActiveRecord::Migration
  def change
    remove_column :contacts, :x_id
    remove_column :contacts, :y_id

    add_column :contacts, :user_id, :integer, null: false
    add_column :contacts, :contact_id, :integer, null: false
  
  end
end
