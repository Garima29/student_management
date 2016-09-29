require 'rails_helper'

RSpec.describe "schools/index", type: :view do
  before(:each) do
    assign(:schools, [
      School.create!(
        :name => "Name",
        :city => "City",
        :zipcode => "Zipcode",
        :state => "State",
        :phone_no => "Phone No"
      ),
      School.create!(
        :name => "Name",
        :city => "City",
        :zipcode => "Zipcode",
        :state => "State",
        :phone_no => "Phone No"
      )
    ])
  end

  it "renders a list of schools" do
    render
    assert_select "tr>td", :text => "Name".to_s, :count => 2
    assert_select "tr>td", :text => "City".to_s, :count => 2
    assert_select "tr>td", :text => "Zipcode".to_s, :count => 2
    assert_select "tr>td", :text => "State".to_s, :count => 2
    assert_select "tr>td", :text => "Phone No".to_s, :count => 2
  end
end
