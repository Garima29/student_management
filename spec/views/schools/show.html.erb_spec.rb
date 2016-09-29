require 'rails_helper'

RSpec.describe "schools/show", type: :view do
  before(:each) do
    @school = assign(:school, School.create!(
      :name => "Name",
      :city => "City",
      :zipcode => "Zipcode",
      :state => "State",
      :phone_no => "Phone No"
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/Name/)
    expect(rendered).to match(/City/)
    expect(rendered).to match(/Zipcode/)
    expect(rendered).to match(/State/)
    expect(rendered).to match(/Phone No/)
  end
end
