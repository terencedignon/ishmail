class RemoveExtraColumnsFromUsersTabe < ActiveRecord::Migration
  def change
    remove_column :users, :birthday, :datetime
    remove_column :users, :location, :string
    remove_column :users, :gender, :string 

  end
end
