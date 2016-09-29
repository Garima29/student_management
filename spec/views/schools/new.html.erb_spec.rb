require 'rails_helper'

RSpec.describe "schools/new", type: :view do
  before(:each) do
    assign(:school, School.new(
      :name => "MyString",
      :city => "MyString",
      :zipcode => "MyString",
      :state => "MyString",
      :phone_no => "MyString"
    ))
  end

  it "renders new school form" do
    render

    assert_select "form[action=?][method=?]", schools_path, "post" do

      assert_select "input#school_name[name=?]", "school[name]"

      assert_select "input#school_city[name=?]", "school[city]"

      assert_select "input#school_zipcode[name=?]", "school[zipcode]"

      assert_select "input#school_state[name=?]", "school[state]"

      assert_select "input#school_phone_no[name=?]", "school[phone_no]"
    end
  end
end
