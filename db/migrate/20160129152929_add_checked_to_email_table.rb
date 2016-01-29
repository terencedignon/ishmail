class AddCheckedToEmailTable < ActiveRecord::Migration
  def change
    add_column :emails, :select_set, :boolean, default: false
  end
end
