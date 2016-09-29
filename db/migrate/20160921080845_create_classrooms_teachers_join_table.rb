class CreateClassroomsTeachersJoinTable < ActiveRecord::Migration
  def change
    create_table :classrooms_teachers, :id => false do |t|
      t.integer :classroom_id
      t.integer :teacher_id
    end
  end
end
