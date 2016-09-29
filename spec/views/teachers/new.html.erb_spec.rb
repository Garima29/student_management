require 'rails_helper'

RSpec.describe "teachers/new", type: :view do
  before(:each) do
    assign(:teacher, Teacher.new(
      :name => "MyString",
      :gender => "MyString",
      :phone_no => "MyString"
    ))
  end

  it "renders new teacher form" do
    render

    assert_select "form[action=?][method=?]", teachers_path, "post" do

      assert_select "input#teacher_name[name=?]", "teacher[name]"

      assert_select "input#teacher_gender[name=?]", "teacher[gender]"

      assert_select "input#teacher_phone_no[name=?]", "teacher[phone_no]"
    end
  end
end
