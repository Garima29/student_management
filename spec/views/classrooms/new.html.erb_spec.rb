require 'rails_helper'

RSpec.describe "classrooms/new", type: :view do
  before(:each) do
    assign(:classroom, Classroom.new(
      :name => "MyString",
      :no_of_students => 1,
      :school_id => ""
    ))
  end

  it "renders new classroom form" do
    render

    assert_select "form[action=?][method=?]", classrooms_path, "post" do

      assert_select "input#classroom_name[name=?]", "classroom[name]"

      assert_select "input#classroom_no_of_students[name=?]", "classroom[no_of_students]"

      assert_select "input#classroom_school_id[name=?]", "classroom[school_id]"
    end
  end
end
