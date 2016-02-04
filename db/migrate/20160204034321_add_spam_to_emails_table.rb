class AddSpamToEmailsTable < ActiveRecord::Migration
  def change
    add_column :emails, :spam_set, :boolean, default: false
  end
end
