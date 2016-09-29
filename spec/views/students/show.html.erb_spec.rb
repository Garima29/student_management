require 'rails_helper'

RSpec.describe "students/show", type: :view do
  before(:each) do
    @student = assign(:student, Student.create!(
      :name => "Name",
      :father_name => "Father Name",
      :mother_name => "Mother Name",
      :phone_no => "Phone No",
      :city => "City",
      :zipcode => "Zipcode",
      :state => "State",
      :classroom_id => 2,
      :school_id => 3
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/Name/)
    expect(rendered).to match(/Father Name/)
    expect(rendered).to match(/Mother Name/)
    expect(rendered).to match(/Phone No/)
    expect(rendered).to match(/City/)
    expect(rendered).to match(/Zipcode/)
    expect(rendered).to match(/State/)
    expect(rendered).to match(/2/)
    expect(rendered).to match(/3/)
  end
end
