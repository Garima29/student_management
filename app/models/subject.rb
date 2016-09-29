class Subject < ActiveRecord::Base
  has_and_belongs_to_many :teachers
  has_and_belongs_to_many :classrooms

  validates_presence_of :name
end
