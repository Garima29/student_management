class Student < ActiveRecord::Base
  belongs_to :school
  belongs_to :classroom
  has_and_belongs_to_many :teachers

  validates_presence_of :name, :father_name, :mother_name, :phone_no, :city, :state, :classroom_id, :school_id
  validates_numericality_of :phone_no, :school_id, :classroom_id
  validates_length_of :phone_no, is:10
  before_save :highlight_changes
  after_create :increase_no_of_students
  after_update :descrease_no_of_students
  def teachers_id
    self.teacher_ids
  end

  def increase_no_of_students
    p "inside increase"
    @classroom=self.classroom
    p @classroom
    @classroom.update_attributes(:no_of_students=>(@classroom.no_of_students+1))
  end
  def descrease_no_of_students
    p "inside increase"
    if(@changes.keys.include?('archive'))
      @classroom=self.classroom
      @classroom.update_attributes(:no_of_students=>(@classroom.no_of_students-1))
    end
  end

  def highlight_changes
    @changes = self.changes
  end
end
