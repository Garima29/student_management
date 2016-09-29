require 'rails_helper'

RSpec.describe "students/index", type: :view do
  before(:each) do
    assign(:students, [
      Student.create!(
        :name => "Name",
        :father_name => "Father Name",
        :mother_name => "Mother Name",
        :phone_no => "Phone No",
        :city => "City",
        :zipcode => "Zipcode",
        :state => "State",
        :classroom_id => 2,
        :school_id => 3
      ),
      Student.create!(
        :name => "Name",
        :father_name => "Father Name",
        :mother_name => "Mother Name",
        :phone_no => "Phone No",
        :city => "City",
        :zipcode => "Zipcode",
        :state => "State",
        :classroom_id => 2,
        :school_id => 3
      )
    ])
  end

  it "renders a list of students" do
    render
    assert_select "tr>td", :text => "Name".to_s, :count => 2
    assert_select "tr>td", :text => "Father Name".to_s, :count => 2
    assert_select "tr>td", :text => "Mother Name".to_s, :count => 2
    assert_select "tr>td", :text => "Phone No".to_s, :count => 2
    assert_select "tr>td", :text => "City".to_s, :count => 2
    assert_select "tr>td", :text => "Zipcode".to_s, :count => 2
    assert_select "tr>td", :text => "State".to_s, :count => 2
    assert_select "tr>td", :text => 2.to_s, :count => 2
    assert_select "tr>td", :text => 3.to_s, :count => 2
  end
end
