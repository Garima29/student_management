class CreateClassrooms < ActiveRecord::Migration
  def change
    create_table :classrooms do |t|
      t.string :name
      t.integer :no_of_students
      t.integer :school_id

      t.timestamps null: false
    end
  end
end
