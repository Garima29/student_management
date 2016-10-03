require 'rails_helper'

RSpec.describe SchoolsController, type: :controller do

  describe "POST #create" do
      context "with valid params" do
        it "creates a new School" do
          school=FactoryGirl.create(:school);
          school_data={:name=>school.name,:city=>school.city,:zipcode=>school.zipcode,:state=>school.state,:phone_no=>school.phone_no}
          expect {
            post :create, :school=>school_data
          }.to change(School, :count).by(1)
        end
      end
      context "with invalid params" do
        it "should return error" do
          school=FactoryGirl.create(:school)
          school_data={:name=>school.name,:city=>school.city,:zipcode=>school.zipcode,:phone_no=>school.phone_no}
          post :create, :school=>school_data
          JSON.parse(response.body)["error"].should_not be_empty
          response.status.should be 422
        end
      end
  end
  describe "GET non archive schools" do
    it 'should return all schools which are non archive' do
      school1=FactoryGirl.create(:school,:archive=>true)
      school2=FactoryGirl.create(:school,:archive=>false)
      school3=FactoryGirl.create(:school,:archive=>true)
      get :non_archive_index
      JSON.parse(response.body)[0]["id"].should eq school2.id
    end
  end

  describe "GET #index" do
    context "with valid params" do
      it "assigns all schools" do
        school1=FactoryGirl.create(:school)
        school2=FactoryGirl.create(:school)
        school3=FactoryGirl.create(:school)
        get :index
        response.should be_success
        assigns(:schools).should eq([school1,school2,school3])
      end
      it "should return all schools in JSON format" do
        school1=FactoryGirl.create(:school)
        school2=FactoryGirl.create(:school)
        school3=FactoryGirl.create(:school)
        get :index
        response.should be_success
        JSON.parse(response.body).count.should eq 3
      end
    end
  end

  describe "GET #show" do
    context "with vaild params" do
      it "returns the respective school"do
        school1=FactoryGirl.create(:school)
        school2=FactoryGirl.create(:school)
        school3=FactoryGirl.create(:school)
        get :show, :id=>school2.id
        JSON.parse(response.body)["id"].should eq school2.id
      end
    end
    context "with invaild params" do
      it "should return error in JSON format"do
        school1=FactoryGirl.create(:school)
        school2=FactoryGirl.create(:school)
        school3=FactoryGirl.create(:school)
        get :show, :id=>1
        JSON.parse(response.body)["error"].should_not be_empty
        response.status.should eq 422
      end
    end
  end

  describe "PUT #update" do
    context "with vaild params" do
      it "updates the respective school"do
        school1=FactoryGirl.create(:school)
        school2=FactoryGirl.create(:school)
        school3=FactoryGirl.create(:school)
        expect{
           put :update, :id=>school2.id, :school =>{:state => "Delhi"}
        }.to_not raise_error
        p JSON.parse(response.body)["state"].should eq "Delhi"
        response.status.should eq 200
      end
    end
    context "with invaild params" do
      it "should return error in JSON format"do
        school1=FactoryGirl.create(:school)
        school2=FactoryGirl.create(:school)
        school3=FactoryGirl.create(:school)
        put :update, :id=>school2.id, :school =>{:state => ""}
        response.status.should eq 422
      end
    end
  end

  describe "DELETE #destroy" do
    context "with vaild params" do
      it "deletes the respective school"do
        school1=FactoryGirl.create(:school)
        school2=FactoryGirl.create(:school)
        school3=FactoryGirl.create(:school)
        classroom1=FactoryGirl.create(:classroom,:school_id => school1.id)
        classroom2=FactoryGirl.create(:classroom,:school_id => school1.id)
        teacher1=FactoryGirl.create(:teacher,:school_id=>school1.id)
        teacher2=FactoryGirl.create(:teacher,:school_id=>school1.id)
        student1=FactoryGirl.create(:student,:school_id=>school1.id,:classroom_id=>classroom1.id)
        student2=FactoryGirl.create(:student,:school_id=>school1.id,:classroom_id=>classroom1.id)
        put :archive, :id=>school1.id
        JSON.parse(response.body)["archive"].should eq true
        response.status.should eq 200
      end
    end
    context "with invaild params" do
      it "should return error in JSON format"do
        school1=FactoryGirl.create(:school)
        school2=FactoryGirl.create(:school)
        school3=FactoryGirl.create(:school)
        classroom1=FactoryGirl.create(:classroom,:school_id => school1.id)
        classroom2=FactoryGirl.create(:classroom,:school_id => school1.id)
        teacher1=FactoryGirl.create(:teacher,:school_id=>school1.id)
        teacher2=FactoryGirl.create(:teacher,:school_id=>school1.id)
        student1=FactoryGirl.create(:student,:school_id=>school1.id,:classroom_id=>classroom1.id)
        student2=FactoryGirl.create(:student,:school_id=>school1.id,:classroom_id=>classroom1.id)
        put :archive, :id=>1
        JSON.parse(response.body)["error"].should_not be_empty
        response.status.should eq 422
      end
    end
  end
end
