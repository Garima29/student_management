require 'rails_helper'

RSpec.describe "classrooms/index", type: :view do
  before(:each) do
    assign(:classrooms, [
      Classroom.create!(
        :name => "Name",
        :no_of_students => 2,
        :school_id => ""
      ),
      Classroom.create!(
        :name => "Name",
        :no_of_students => 2,
        :school_id => ""
      )
    ])
  end

  it "renders a list of classrooms" do
    render
    assert_select "tr>td", :text => "Name".to_s, :count => 2
    assert_select "tr>td", :text => 2.to_s, :count => 2
    assert_select "tr>td", :text => "".to_s, :count => 2
  end
end
