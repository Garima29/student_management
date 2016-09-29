class School < ActiveRecord::Base
  has_many :classrooms
  has_many :teachers
  has_many :students

  validates_presence_of :name,:city,:state,:zipcode,:phone_no
  validates_numericality_of :phone_no,:zipcode
  validates_length_of :phone_no, is:10
end
