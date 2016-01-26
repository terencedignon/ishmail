class CreateLines < ActiveRecord::Migration
  def change
    create_table :lines do |t|
      t.integer :chat_id, null: false
      t.text :line, default: ""
      t.timestamps null: false
    end
  end
end
