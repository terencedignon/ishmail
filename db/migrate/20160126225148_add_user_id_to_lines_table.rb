class AddUserIdToLinesTable < ActiveRecord::Migration
  def change
    add_column :lines, :user_id, :integer, null: false 
  end
end
