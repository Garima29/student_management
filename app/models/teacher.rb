class Teacher < ActiveRecord::Base
  has_and_belongs_to_many :classrooms
  belongs_to :school
  has_and_belongs_to_many :subjects
  has_and_belongs_to_many :students

  validates_presence_of :name, :gender, :phone_no, :school_id
  validates_numericality_of :phone_no, :school_id
  validates_length_of :phone_no, is:10
  validates_uniqueness_of :phone_no
  # validate :check_teacher_and_classroom_school_id

  # def check_teacher_and_classroom_school_id
  #   school_id = self.school_id
  #   self.classrooms.each do |classroom|
  #      if !classroom.school_id.eql?(school_id)
  #       self.errors.add(:base,"classroom associated to a teacher should belong to same school")
  #       return false
  #      end
  #   end
  # end

  def classrooms_id
   self.classroom_ids
  end

  def subjects_id
    self.subject_ids
  end
end
