require 'rails_helper'

RSpec.describe Teacher, type: :model do
  it { should have_and_belong_to_many(:classrooms) }
  it { should have_and_belong_to_many(:subjects) }
  it { should have_and_belong_to_many(:students) }
  it { should belong_to(:school) }
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:gender) }
  it { should validate_presence_of(:phone_no) }
  it { should validate_presence_of(:school_id) }
  it { should validate_numericality_of(:phone_no) }
  it { should validate_numericality_of(:school_id) }
  it { should validate_uniqueness_of(:phone_no) }
  it { should validate_length_of(:phone_no).is_equal_to(10)}
  # context "schoold id validation" do
  #   context "failure" do
  #     it "should raise error if school_id of classroom id and school_id of teacher id do not match" do
  #       school1 = FactoryGirl.create(:school)
  #       school2 = FactoryGirl.create(:school)
  #       classroom1 = FactoryGirl.create(:classroom,:school_id=>school1.id)
  #       classroom2 = FactoryGirl.create(:classroom,:school_id=>school1.id)
  #       classroom3 = FactoryGirl.create(:classroom,:school_id=>school2.id)
  #       classroom4 = FactoryGirl.create(:classroom,:school_id=>school2.id)
  #        FactoryGirl.build(:teacher,:school_id=>school1.id,:classroom_ids=>[classroom3.id,classroom2.id]).should_not be_valid
  #     end
  #   end
  #   context "success" do
  #     it "should not raise error if school_id of classroom id and school_id of teacher id matches" do
  #       school1 = FactoryGirl.create(:school)
  #       school2 = FactoryGirl.create(:school)
  #       classroom1 = FactoryGirl.create(:classroom,:school_id=>school1.id)
  #       classroom2 = FactoryGirl.create(:classroom,:school_id=>school1.id)
  #       classroom3 = FactoryGirl.create(:classroom,:school_id=>school2.id)
  #       classroom4 = FactoryGirl.create(:classroom,:school_id=>school2.id)
  #       FactoryGirl.create(:teacher,:school_id=>school1.id,:classroom_ids=>[classroom1.id,classroom2.id]).should be_valid
  #     end
  #   end
  # end
end
