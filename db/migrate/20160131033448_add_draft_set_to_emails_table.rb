class AddDraftSetToEmailsTable < ActiveRecord::Migration
  def change
    add_column :emails, :draft_set, :boolean, default: true
  end
end
