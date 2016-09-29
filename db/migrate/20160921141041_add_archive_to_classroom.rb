class AddArchiveToClassroom < ActiveRecord::Migration
  def change
    add_column :classrooms, :archive, :boolean, :default => false
  end
end
