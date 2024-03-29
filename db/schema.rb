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

ActiveRecord::Schema.define(version: 20150721114253) do

  create_table "agencies", force: :cascade do |t|
    t.string   "agency_name",   null: false
    t.string   "status"
    t.boolean  "active"
    t.string   "logo"
    t.string   "contact_name"
    t.string   "contact_phone"
    t.string   "contact_email"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  create_table "comments", force: :cascade do |t|
    t.string   "body"
    t.integer  "upvotes"
    t.integer  "post_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "user_id"
  end

  add_index "comments", ["post_id"], name: "index_comments_on_post_id"
  add_index "comments", ["user_id"], name: "index_comments_on_user_id"

  create_table "customers", force: :cascade do |t|
    t.integer  "agency_id",     null: false
    t.string   "company_name"
    t.string   "contact_name"
    t.string   "contact_email"
    t.string   "contact_phone"
    t.string   "billing_email"
    t.integer  "billing_rate"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  create_table "jobs", force: :cascade do |t|
    t.integer  "agency_id",            null: false
    t.string   "status",               null: false
    t.integer  "customer_id",          null: false
    t.integer  "consumer_id"
    t.integer  "interpreter_id"
    t.string   "description",          null: false
    t.datetime "starts_at",            null: false
    t.datetime "start_time",           null: false
    t.integer  "duration",             null: false
    t.string   "repeat_style"
    t.string   "repeat_pattern"
    t.datetime "ends_on"
    t.datetime "requested_at",         null: false
    t.string   "requested_by_name"
    t.string   "requested_by_email"
    t.string   "requested_by_phone"
    t.text     "interpreter_notes"
    t.integer  "interpreter_pay_rate"
    t.string   "site_contact_name"
    t.string   "site_contact_email"
    t.string   "site_contact_phone"
    t.text     "billing_notes"
    t.integer  "billing_rate"
    t.integer  "billable_minutes"
    t.integer  "billing_miles"
    t.boolean  "bill"
    t.boolean  "pay"
    t.integer  "payroll_minutes"
    t.integer  "payroll_miles"
    t.integer  "milage_rate"
    t.integer  "expenses"
    t.integer  "created_id"
    t.integer  "updated_id"
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
  end

  create_table "posts", force: :cascade do |t|
    t.string   "title"
    t.string   "link"
    t.integer  "upvotes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "user_id"
  end

  add_index "posts", ["user_id"], name: "index_posts_on_user_id"

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "username"
    t.string   "role"
    t.integer  "agency_id"
    t.integer  "default_payrate"
    t.string   "last_name"
    t.string   "first_name"
    t.string   "middle_name"
    t.string   "title"
    t.string   "prefix"
    t.string   "suffix"
    t.string   "gender"
  end

  add_index "users", ["agency_id"], name: "index_users_on_agency_id"
  add_index "users", ["email"], name: "index_users_on_email", unique: true
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  add_index "users", ["username"], name: "index_users_on_username", unique: true

end
