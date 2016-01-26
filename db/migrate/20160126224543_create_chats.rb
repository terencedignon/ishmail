class CreateChats < ActiveRecord::Migration
  def change
    create_table :chats do |t|
      t.integer :x_id, null: false
      t.integer :y_id, null: false 
      t.timestamps null: false
    end
  end
end
