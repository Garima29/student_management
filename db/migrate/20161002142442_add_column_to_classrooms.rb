class AddColumnToClassrooms < ActiveRecord::Migration
  def change
    add_column :classrooms,:no_of_students,:integer,:default=>0
  end
end
