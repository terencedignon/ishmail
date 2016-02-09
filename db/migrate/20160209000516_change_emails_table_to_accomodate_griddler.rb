class ChangeEmailsTableToAccomodateGriddler < ActiveRecord::Migration
  def change
    remove_column :emails, :sender, :string
    add_column :emails, :from_email, :string, default: ""
    add_column :emails, :from_name, :string, default: ""
    add_column :recipients, :to_email, :string, default: ""
    add_column :recipients, :to_name, :string, default: ""
    add_column :emails, :raw_headers, :string, default: ""
    add_column :emails, :raw_text, :string, default: ""
    add_column :emails, :raw_html, :string, defaut: ""
  end
end
