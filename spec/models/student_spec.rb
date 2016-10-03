require 'rails_helper'

RSpec.describe Student, type: :model do
  it { should belong_to(:classroom) }
  it { should have_and_belong_to_many(:teachers) }
  it { should belong_to(:school) }
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:father_name) }
  it { should validate_presence_of(:mother_name) }
  it { should validate_presence_of(:classroom_id) }
  it { should validate_presence_of(:school_id) }
  it { should validate_presence_of(:phone_no) }
  # it { should validate_uniqueness_of(:phone_no) }
  it { should validate_numericality_of(:phone_no) }
  it { should validate_length_of(:phone_no).is_equal_to(10)}
  it "should have unique phone no" do
    school=FactoryGirl.create(:school)
    classroom=FactoryGirl.create(:classroom,:school_id=>school.id)
    FactoryGirl.create(:student ,:phone_no => "9123456780",:classroom_id=>classroom.id)
    expect {FactoryGirl.create(:student ,:phone_no => "9123456780",:classroom_id=>classroom.id)}.to raise_error
  end
  context "update_no_of_students" do
    it "when student is created" do
      school=FactoryGirl.create(:school)
      classroom=FactoryGirl.create(:classroom,:school_id=>school.id)
      teacher=FactoryGirl.create(:teacher,:school_id=>school.id,:phone_no=>"3245634567")
      student1=FactoryGirl.create(:student,:school_id=>school.id,:classroom_id=>classroom.id,:phone_no=>"3245634567")
      student2=FactoryGirl.create(:student,:school_id=>school.id,:classroom_id=>classroom.id,:phone_no=>"3245634527")
      student3=FactoryGirl.create(:student,:school_id=>school.id,:classroom_id=>classroom.id,:phone_no=>"3245634517")
      student3.classroom.no_of_students.should be 4
    end
  end
  context "decrease_no_of_students" do
    it "when student is removed" do
      school=FactoryGirl.create(:school)
      classroom=FactoryGirl.create(:classroom,:school_id=>school.id)
      teacher=FactoryGirl.create(:teacher,:school_id=>school.id,:phone_no=>"3245634567")
      student1=FactoryGirl.create(:student,:school_id=>school.id,:classroom_id=>classroom.id,:phone_no=>"3145634567")
      student2=FactoryGirl.create(:student,:school_id=>school.id,:classroom_id=>classroom.id,:phone_no=>"3945634567")
      student2.update_attributes(:archive=>true)
      student2.classroom.no_of_students.should be 2
    end
  end
end
