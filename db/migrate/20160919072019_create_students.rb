class CreateStudents < ActiveRecord::Migration
  def change
    create_table :students do |t|
      t.string :name
      t.string :father_name
      t.string :mother_name
      t.string :phone_no
      t.string :city
      t.string :zipcode
      t.string :state
      t.integer :classroom_id
      t.integer :school_id

      t.timestamps null: false
    end
  end
end
