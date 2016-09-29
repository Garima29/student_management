class AddArchiveToTeacher < ActiveRecord::Migration
  def change
    add_column :teachers, :archive, :boolean, :default => false
  end
end
