class AddArchiveToStudent < ActiveRecord::Migration
  def change
    add_column :students, :archive, :boolean, :default => false
  end
end
