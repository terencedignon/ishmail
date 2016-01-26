class CreateContacts < ActiveRecord::Migration
  def change
    create_table :contacts do |t|
      t.integer :x_id, null: false
      t.integer :y_id, null: false 
      t.timestamps null: false
    end
  end
end
