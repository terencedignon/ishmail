# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160202030915) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "activities", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.string   "browser",    null: false
    t.string   "location",   null: false
    t.string   "ip_address", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "chats", force: :cascade do |t|
    t.integer  "x_id",       null: false
    t.integer  "y_id",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "contacts", force: :cascade do |t|
    t.integer  "x_id",       null: false
    t.integer  "y_id",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "emails", force: :cascade do |t|
    t.integer  "parent_email_id"
    t.integer  "user_id"
    t.string   "sender",                          null: false
    t.string   "subject",         default: ""
    t.string   "body",            default: ""
    t.boolean  "starred_set",     default: false
    t.boolean  "importance_set",  default: false
    t.boolean  "delete_set",      default: false
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
    t.boolean  "read_set",        default: false
    t.boolean  "sent_set",        default: false
    t.boolean  "compose_set",     default: false
    t.boolean  "select_set",      default: false
    t.boolean  "draft_set",       default: true
  end

  create_table "lines", force: :cascade do |t|
    t.integer  "chat_id",                 null: false
    t.text     "line",       default: ""
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
    t.integer  "user_id",                 null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "username",                          null: false
    t.string   "password_digest",                   null: false
    t.string   "session_token",                     null: false
    t.string   "fname",                             null: false
    t.string   "lname",                             null: false
    t.string   "birthday",                          null: false
    t.string   "gender",                            null: false
    t.string   "mobile_phone"
    t.string   "current_email"
    t.string   "location",                          null: false
    t.string   "vaca_response",     default: ""
    t.boolean  "vaca_response_set", default: false
    t.boolean  "show_snippets_set", default: false
    t.boolean  "auto_complete_set", default: true
    t.boolean  "importance_set",    default: true
    t.string   "signature",         default: ""
    t.integer  "pagination",        default: 25
    t.boolean  "online",            default: false
    t.datetime "created_at",                        null: false
    t.datetime "updated_at",                        null: false
  end

end
