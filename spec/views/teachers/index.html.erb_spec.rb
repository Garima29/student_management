require 'rails_helper'

RSpec.describe "teachers/index", type: :view do
  before(:each) do
    assign(:teachers, [
      Teacher.create!(
        :name => "Name",
        :gender => "Gender",
        :phone_no => "Phone No"
      ),
      Teacher.create!(
        :name => "Name",
        :gender => "Gender",
        :phone_no => "Phone No"
      )
    ])
  end

  it "renders a list of teachers" do
    render
    assert_select "tr>td", :text => "Name".to_s, :count => 2
    assert_select "tr>td", :text => "Gender".to_s, :count => 2
    assert_select "tr>td", :text => "Phone No".to_s, :count => 2
  end
end
