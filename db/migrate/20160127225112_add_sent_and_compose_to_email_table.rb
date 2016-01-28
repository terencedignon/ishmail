class AddSentAndComposeToEmailTable < ActiveRecord::Migration
  def change
    add_column :emails, :sent_set, :boolean, default: false
    add_column :emails, :compose_set, :boolean, default: false 
  end
end
