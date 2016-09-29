require 'rails_helper'

RSpec.describe "classrooms/edit", type: :view do
  before(:each) do
    @classroom = assign(:classroom, Classroom.create!(
      :name => "MyString",
      :no_of_students => 1,
      :school_id => ""
    ))
  end

  it "renders the edit classroom form" do
    render

    assert_select "form[action=?][method=?]", classroom_path(@classroom), "post" do

      assert_select "input#classroom_name[name=?]", "classroom[name]"

      assert_select "input#classroom_no_of_students[name=?]", "classroom[no_of_students]"

      assert_select "input#classroom_school_id[name=?]", "classroom[school_id]"
    end
  end
end
