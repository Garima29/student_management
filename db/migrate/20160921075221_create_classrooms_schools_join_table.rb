class CreateClassroomsSchoolsJoinTable < ActiveRecord::Migration
  def change
    create_table :classrooms_schools, :id => false do |t|
      t.integer :classroom_id
      t.integer :school_id
    end
  end
end
