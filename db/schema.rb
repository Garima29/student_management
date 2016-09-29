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

ActiveRecord::Schema.define(version: 20160921141623) do

  create_table "classrooms", force: :cascade do |t|
    t.string   "name",           limit: 255
    t.integer  "no_of_students", limit: 4
    t.integer  "school_id",      limit: 4
    t.datetime "created_at",                                 null: false
    t.datetime "updated_at",                                 null: false
    t.boolean  "archive",        limit: 1,   default: false
  end

  create_table "classrooms_schools", id: false, force: :cascade do |t|
    t.integer "classroom_id", limit: 4
    t.integer "school_id",    limit: 4
  end

  create_table "classrooms_subjects", id: false, force: :cascade do |t|
    t.integer "classroom_id", limit: 4
    t.integer "subject_id",   limit: 4
  end

  create_table "classrooms_teachers", id: false, force: :cascade do |t|
    t.integer "classroom_id", limit: 4
    t.integer "teacher_id",   limit: 4
  end

  create_table "schools", force: :cascade do |t|
    t.string   "name",       limit: 255
    t.string   "city",       limit: 255
    t.string   "zipcode",    limit: 255
    t.string   "state",      limit: 255
    t.string   "phone_no",   limit: 255
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
    t.boolean  "archive",    limit: 1,   default: false
  end

  create_table "students", force: :cascade do |t|
    t.string   "name",         limit: 255
    t.string   "father_name",  limit: 255
    t.string   "mother_name",  limit: 255
    t.string   "phone_no",     limit: 255
    t.string   "city",         limit: 255
    t.string   "zipcode",      limit: 255
    t.string   "state",        limit: 255
    t.integer  "classroom_id", limit: 4
    t.integer  "school_id",    limit: 4
    t.datetime "created_at",                               null: false
    t.datetime "updated_at",                               null: false
    t.boolean  "archive",      limit: 1,   default: false
  end

  create_table "students_teachers", id: false, force: :cascade do |t|
    t.integer "student_id", limit: 4
    t.integer "teacher_id", limit: 4
  end

  create_table "subjects", force: :cascade do |t|
    t.string   "name",       limit: 255
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
    t.boolean  "archive",    limit: 1,   default: false
  end

  create_table "subjects_teachers", id: false, force: :cascade do |t|
    t.integer "subject_id", limit: 4
    t.integer "teacher_id", limit: 4
  end

  create_table "teachers", force: :cascade do |t|
    t.string   "name",       limit: 255
    t.string   "gender",     limit: 255
    t.string   "phone_no",   limit: 255
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
    t.integer  "school_id",  limit: 4
    t.boolean  "archive",    limit: 1,   default: false
  end

end
