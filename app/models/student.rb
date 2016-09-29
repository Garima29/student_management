class Student < ActiveRecord::Base
  belongs_to :school
  belongs_to :classroom
  has_and_belongs_to_many :teachers

  validates_presence_of :name, :father_name, :mother_name, :phone_no, :city, :state, :classroom_id, :school_id
  validates_numericality_of :phone_no, :school_id, :classroom_id
  validates_length_of :phone_no, is:10
  def teachers_id
    self.teacher_ids
  end
end
