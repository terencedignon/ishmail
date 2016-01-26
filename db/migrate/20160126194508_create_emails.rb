class CreateEmails < ActiveRecord::Migration
  def change
    create_table :emails do |t|
      t.integer :parent_email_id
      t.integer :user_id
      t.string :sender, null: false
      t.string :subject, default: ""
      t.string :body, default: ""
      t.boolean :starred_set, default: false
      t.boolean :importance_set, default: false
      t.boolean :delete_set, default: false

      t.timestamps null: false
    end
  end
end
