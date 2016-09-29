require 'rails_helper'

RSpec.describe "students/edit", type: :view do
  before(:each) do
    @student = assign(:student, Student.create!(
      :name => "MyString",
      :father_name => "MyString",
      :mother_name => "MyString",
      :phone_no => "MyString",
      :city => "MyString",
      :zipcode => "MyString",
      :state => "MyString",
      :classroom_id => 1,
      :school_id => 1
    ))
  end

  it "renders the edit student form" do
    render

    assert_select "form[action=?][method=?]", student_path(@student), "post" do

      assert_select "input#student_name[name=?]", "student[name]"

      assert_select "input#student_father_name[name=?]", "student[father_name]"

      assert_select "input#student_mother_name[name=?]", "student[mother_name]"

      assert_select "input#student_phone_no[name=?]", "student[phone_no]"

      assert_select "input#student_city[name=?]", "student[city]"

      assert_select "input#student_zipcode[name=?]", "student[zipcode]"

      assert_select "input#student_state[name=?]", "student[state]"

      assert_select "input#student_classroom_id[name=?]", "student[classroom_id]"

      assert_select "input#student_school_id[name=?]", "student[school_id]"
    end
  end
end
