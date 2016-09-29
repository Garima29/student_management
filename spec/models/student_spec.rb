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
  it { should validate_numericality_of(:phone_no) }
  it { should validate_length_of(:phone_no).is_equal_to(10)}
end
