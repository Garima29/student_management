require 'rails_helper'

RSpec.describe Classroom, type: :model do
  it { should have_and_belong_to_many(:teachers) }
  it { should have_and_belong_to_many(:subjects) }
  it { should belong_to(:school) }
  it { should have_many(:students) }
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:no_of_students) }
  it { should validate_presence_of(:school_id) }
  it { should validate_numericality_of(:no_of_students) }
end
