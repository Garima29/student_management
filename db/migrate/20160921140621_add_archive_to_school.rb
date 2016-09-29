class AddArchiveToSchool < ActiveRecord::Migration
  def change
    add_column :schools, :archive, :boolean, :default => false
  end
end
