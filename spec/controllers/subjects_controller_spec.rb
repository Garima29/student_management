require 'rails_helper'

RSpec.describe SubjectsController, type: :controller do

  describe "POST #create" do
    context "with valid params" do
      it "creates a new subject" do
        subject=FactoryGirl.create(:subject);
        subject_data={:name=>subject.name}
        expect {
          post :create, :subject=>subject_data
        }.to change(Subject, :count).by(1)
      end
    end
    context "with invalid params" do
      it "should return error" do
        subject=FactoryGirl.create(:subject)
        subject_data={:name=>nil}
        post :create, :subject=>subject_data
        JSON.parse(response.body)["error"].should_not be_empty
        response.status.should be 422
      end
    end
  end

  describe "GET #index" do
    context "with valid params" do
      it "returns all subjects" do
        subject1=FactoryGirl.create(:subject)
        subject2=FactoryGirl.create(:subject)
        subject3=FactoryGirl.create(:subject)
        get :index
        response.should be_success
        assigns(:subjects).should eq([subject1,subject2,subject3])
      end
    end
  end

  describe "GET #show" do
    context "with vaild params" do
      it "returns the respective subject"do
        subject1=FactoryGirl.create(:subject)
        subject2=FactoryGirl.create(:subject)
        subject3=FactoryGirl.create(:subject)
        get :show, :id=>subject2.id
        JSON.parse(response.body)["id"].should eq subject2.id
      end
    end
    context "with invaild params" do
      it "should return error in JSON format"do
        subject1=FactoryGirl.create(:subject)
        subject2=FactoryGirl.create(:subject)
        subject3=FactoryGirl.create(:subject)
        get :show, :id=>1
        JSON.parse(response.body)["error"].should_not be_empty
        response.status.should eq 422
      end
    end
  end

  describe "PUT #update" do
    context "with vaild params" do
      it "updates the respective subject"do
        subject1=FactoryGirl.create(:subject)
        subject2=FactoryGirl.create(:subject)
        subject3=FactoryGirl.create(:subject)
        expect{
          put :update, :id=>subject2.id, :subject =>{:name => "Math1"}
        }.to_not raise_error
        p JSON.parse(response.body)["name"].should eq "Math1"
        response.status.should eq 200
      end
    end
    context "with invaild params" do
      it "should return error in JSON format"do
        subject1=FactoryGirl.create(:subject)
        subject2=FactoryGirl.create(:subject)
        subject3=FactoryGirl.create(:subject)
        put :update, :id=>subject2.id, :subject =>{:name => ""}
        response.status.should eq 422
      end
    end
  end
  describe "GET teacher subjects" do
    it "should return all subjects associated with teacher" do
      school1=FactoryGirl.create(:school)
      school2=FactoryGirl.create(:school,:phone_no=>"9031567880")
      school3=FactoryGirl.create(:school,:phone_no=>"9031567881")
      classroom1=FactoryGirl.create(:classroom,:school_id => school1.id)
      classroom2=FactoryGirl.create(:classroom,:school_id => school1.id)
      subject1=FactoryGirl.create(:subject)
      subject2=FactoryGirl.create(:subject)
      teacher1=FactoryGirl.create(:teacher,:school_id=>school1.id,:classroom_ids=>[classroom1.id,classroom2.id],:subject_ids=>[subject1.id,subject2.id],:phone_no=>"9031567889")
      teacher2=FactoryGirl.create(:teacher,:school_id=>school1.id,:classroom_ids=>classroom2.id,:phone_no=>"9031567882")
      get :teacher_subjects, :id=>teacher1
      JSON.parse(response.body).count.should be 2
    end
  end

  describe "DELETE #destroy" do
    context "with vaild params" do
      it "deletes the respective subject"do
        subject1=FactoryGirl.create(:subject)
        subject2=FactoryGirl.create(:subject)
        subject3=FactoryGirl.create(:subject)
        put :archive, :id=>subject1.id
        JSON.parse(response.body)["archive"].should eq true
        response.status.should eq 200
      end
    end
    context "with invaild params" do
      it "should return error in JSON format"do
        subject1=FactoryGirl.create(:subject)
        subject2=FactoryGirl.create(:subject)
        subject3=FactoryGirl.create(:subject)
        put :archive, :id=>1
        JSON.parse(response.body)["error"].should_not be_empty
        response.status.should eq 422
      end
    end
  end

end
