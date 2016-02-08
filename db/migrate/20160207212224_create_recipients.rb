class CreateRecipients < ActiveRecord::Migration
  def change
    create_table :recipients do |t|
      t.string :user, null: false
      t.integer :email_id, null: false 
      t.timestamps null: false
    end
  end
end
