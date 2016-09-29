require 'rails_helper'

RSpec.describe "teachers/edit", type: :view do
  before(:each) do
    @teacher = assign(:teacher, Teacher.create!(
      :name => "MyString",
      :gender => "MyString",
      :phone_no => "MyString"
    ))
  end

  it "renders the edit teacher form" do
    render

    assert_select "form[action=?][method=?]", teacher_path(@teacher), "post" do

      assert_select "input#teacher_name[name=?]", "teacher[name]"

      assert_select "input#teacher_gender[name=?]", "teacher[gender]"

      assert_select "input#teacher_phone_no[name=?]", "teacher[phone_no]"
    end
  end
end
