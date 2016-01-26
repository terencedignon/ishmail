class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username, null: false
      t.string :password_digest, null: false
      t.string :session_token, null: false
      t.string :fname, null: false
      t.string :lname, null: false
      t.string :birthday, null: false
      t.string :gender, null: false
      t.string :mobile_phone
      t.string :current_email
      t.string :location, null: false

      t.string :vaca_response, default: ""
      t.boolean :vaca_response_set, default: false
      t.boolean :show_snippets_set, default: false
      t.boolean :auto_complete_set, default: true
      t.boolean :importance_set, default: true
      t.string :signature, default: ""
      t.integer :pagination, default: 25
      t.boolean :online, default: false


      t.timestamps null: false
    end
  end
end
