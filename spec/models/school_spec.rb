require 'rails_helper'

RSpec.describe School, type: :model do
     it { should have_many(:classrooms) }
     it { should have_many(:teachers) }
     it { should have_many(:students) }
     it { should validate_presence_of(:name) }
     it { should validate_presence_of(:city) }
     it { should validate_presence_of(:state) }
     it { should validate_presence_of(:zipcode) }
     it { should validate_presence_of(:phone_no) }
     it { should validate_numericality_of(:phone_no) }
     it { should validate_uniqueness_of(:phone_no) }
     it { should validate_length_of(:phone_no).is_equal_to(10)}
end
