class AddArchiveToEmails < ActiveRecord::Migration
  def change
    add_column :emails, :archive_set, :boolean, default: false
  end
end
