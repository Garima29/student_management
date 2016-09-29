class AddArchiveToSubject < ActiveRecord::Migration
  def change
    add_column :subjects, :archive, :boolean, :default => false
  end
end
