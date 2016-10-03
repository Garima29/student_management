require 'rails_helper'

RSpec.describe ClassroomsController, type: :controller do
  describe "POST #create" do
    context "with valid params" do
      it "creates a new classroom" do
        school=FactoryGirl.create(:school);
        classroom=FactoryGirl.create(:classroom,:school_id=>school.id)
        classroom_data={:name=>classroom.name,:no_of_students=>classroom.no_of_students,:school_id=>school.id}
        expect {
          post :create, :classroom=>classroom_data
        }.to change(Classroom, :count).by(1)
        response.status.should eq 200
      end
    end
    context "with invalid params" do
      it "should return error" do
        school=FactoryGirl.create(:school);
        classroom=FactoryGirl.create(:classroom,:school_id=>school.id)
        classroom_data={:name=>classroom.name,:no_of_students=>classroom.no_of_students,:school_id=>nil}
        post :create, :classroom=>classroom_data
        JSON.parse(response.body)["error"].should_not be_empty
        response.status.should eq 422
      end
    end
  end

  describe "GET non archive classrooms" do
    it 'should return all classrooms which are non archive' do
      school1=FactoryGirl.create(:school)
      school2=FactoryGirl.create(:school,:phone_no=>"1234567880")
      school3=FactoryGirl.create(:school,:phone_no=>"1234567890")
      classroom1=FactoryGirl.create(:classroom,:school_id=>school1.id,:archive=>true)
      classroom2=FactoryGirl.create(:classroom,:school_id=>school1.id,:archive=>true)
      classroom3=FactoryGirl.create(:classroom,:school_id=>school1.id,:archive=>false)
      classroom4=FactoryGirl.create(:classroom,:school_id=>school1.id,:archive=>false,:no_of_students=>40)
      classroom5=FactoryGirl.create(:classroom,:school_id=>school2.id,:archive=>false)
      get :non_archive_index, :school_id=>school1.id
      p JSON.parse(response.body)
      JSON.parse(response.body)[0]["id"].should eq classroom3.id
    end
  end

  describe "GET #index" do
    context "with valid params" do
      it "returns all classrooms" do
        school1=FactoryGirl.create(:school)
        classroom1=FactoryGirl.create(:classroom,:school_id=>school1.id)
        classroom2=FactoryGirl.create(:classroom,:school_id=>school1.id)
        classroom3=FactoryGirl.create(:classroom,:school_id=>school1.id)
        classroom4=FactoryGirl.create(:classroom,:school_id=>school1.id)
        get :index
        response.should be_success
        assigns(:classrooms).should eq([classroom1,classroom2,classroom3,classroom4])
      end
    end
  end

  describe "GET #show" do
    context "with vaild params" do
      it "returns the respective classroom"do
        school1=FactoryGirl.create(:school)
        classroom1=FactoryGirl.create(:classroom,:school_id=>school1.id)
        classroom2=FactoryGirl.create(:classroom,:school_id=>school1.id)
        classroom3=FactoryGirl.create(:classroom,:school_id=>school1.id)
        classroom4=FactoryGirl.create(:classroom,:school_id=>school1.id)
        get :show, :id=>classroom2.id
        JSON.parse(response.body)["id"].should eq classroom2.id
      end
    end
    context "with invaild params" do
      it "should return error in JSON format"do
        school1=FactoryGirl.create(:school)
        classroom1=FactoryGirl.create(:classroom,:school_id=>school1.id)
        classroom2=FactoryGirl.create(:classroom,:school_id=>school1.id)
        classroom3=FactoryGirl.create(:classroom,:school_id=>school1.id)
        get :show, :id=>1
        JSON.parse(response.body)["error"].should_not be_empty
        response.status.should eq 422
      end
    end
  end

  describe "PUT #update" do
    context "with vaild params" do
      it "updates the respective classroom"do
        school1=FactoryGirl.create(:school)
        classroom1=FactoryGirl.create(:classroom,:school_id=>school1.id)
        classroom2=FactoryGirl.create(:classroom,:school_id=>school1.id)
        classroom3=FactoryGirl.create(:classroom,:school_id=>school1.id)
        expect{
          put :update, :id=>classroom2.id, :classroom=>{:no_of_students =>50}
        }.to_not raise_error
        JSON.parse(response.body)["no_of_students"].should eq 50
        response.status.should eq 200
      end
    end
    context "with invaild params" do
      it "should return error in JSON format"do
        school1=FactoryGirl.create(:school)
        classroom1=FactoryGirl.create(:classroom,:school_id=>school1.id)
        classroom2=FactoryGirl.create(:classroom,:school_id=>school1.id)
        classroom3=FactoryGirl.create(:classroom,:school_id=>school1.id)
        put :update, :id=>classroom2.id, :classroom=>{:no_of_students =>nil}
        response.status.should eq 422
      end
    end
  end
  describe "GET teacher classrooms" do
    it "should return all classrooms of the teacher which are non-archived" do
      school1=FactoryGirl.create(:school,:phone_no=>"1234567888")
      school2=FactoryGirl.create(:school)
      school3=FactoryGirl.create(:school,:phone_no=>"1234567803")
      classroom1=FactoryGirl.create(:classroom,:school_id => school1.id)
      classroom2=FactoryGirl.create(:classroom,:school_id => school1.id)
      teacher1=FactoryGirl.create(:teacher,:school_id=>school1.id,:classroom_ids=>[classroom1.id,classroom2.id],:phone_no=>"1234567823")
      teacher2=FactoryGirl.create(:teacher,:school_id=>school1.id,:classroom_ids=>classroom2.id,:phone_no=>"1234567833")
      get :teacher_classrooms, :id=>teacher1
       JSON.parse(response.body).count.should be 2
    end
  end

  describe "DELETE #destroy" do
    context "with vaild params" do
      it "deletes the respective classroom"do
        school1=FactoryGirl.create(:school)
        school2=FactoryGirl.create(:school,:phone_no=>"1234567883")
        school3=FactoryGirl.create(:school,:phone_no=>"1234567855")
        classroom1=FactoryGirl.create(:classroom,:school_id => school1.id)
        classroom2=FactoryGirl.create(:classroom,:school_id => school1.id)
        teacher1=FactoryGirl.create(:teacher,:school_id=>school1.id,:classroom_ids=>classroom1.id,:phone_no=>"1234567800")
        teacher2=FactoryGirl.create(:teacher,:school_id=>school1.id,:classroom_ids=>classroom2.id,:phone_no=>"1234567810")
        student1=FactoryGirl.create(:student,:school_id=>school1.id,:classroom_id=>classroom1.id,:phone_no=>"1234567820")
        student2=FactoryGirl.create(:student,:school_id=>school1.id,:classroom_id=>classroom2.id,:phone_no=>"1234567780")
        put :archive, :id=>classroom1.id
        JSON.parse(response.body)["archive"].should eq true
        response.status.should eq 200
      end
    end
    context "with invaild params" do
      it "should return error in JSON format"do
        school1=FactoryGirl.create(:school)
        school2=FactoryGirl.create(:school,:phone_no=>"1234567783")
        school3=FactoryGirl.create(:school,:phone_no=>"1230567884")
        classroom1=FactoryGirl.create(:classroom,:school_id => school1.id)
        classroom2=FactoryGirl.create(:classroom,:school_id => school1.id)
        teacher1=FactoryGirl.create(:teacher,:school_id=>school1.id,:classroom_ids=>classroom1.id,:phone_no=>"1234567889")
        teacher2=FactoryGirl.create(:teacher,:school_id=>school1.id,:classroom_ids=>classroom2.id,:phone_no=>"1234567981")
        student1=FactoryGirl.create(:student,:school_id=>school1.id,:classroom_id=>classroom1.id,:phone_no=>"1234567851")
        student2=FactoryGirl.create(:student,:school_id=>school1.id,:classroom_id=>classroom2.id,:phone_no=>"1234567831")
        put :archive, :id=>1
        JSON.parse(response.body)["error"].should_not be_empty
        response.status.should eq 422
      end
    end
  end

end
