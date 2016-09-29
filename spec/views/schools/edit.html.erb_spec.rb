require 'rails_helper'

RSpec.describe "schools/edit", type: :view do
  before(:each) do
    @school = assign(:school, School.create!(
      :name => "MyString",
      :city => "MyString",
      :zipcode => "MyString",
      :state => "MyString",
      :phone_no => "MyString"
    ))
  end

  it "renders the edit school form" do
    render

    assert_select "form[action=?][method=?]", school_path(@school), "post" do

      assert_select "input#school_name[name=?]", "school[name]"

      assert_select "input#school_city[name=?]", "school[city]"

      assert_select "input#school_zipcode[name=?]", "school[zipcode]"

      assert_select "input#school_state[name=?]", "school[state]"

      assert_select "input#school_phone_no[name=?]", "school[phone_no]"
    end
  end
end
