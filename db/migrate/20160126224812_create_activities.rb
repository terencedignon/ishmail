class CreateActivities < ActiveRecord::Migration
  def change
    create_table :activities do |t|
      t.integer :user_id, null: false
      t.string :browser, null: false
      t.string :location, null: false
      t.string :ip_address, null: false 
      t.timestamps null: false
    end
  end
end
