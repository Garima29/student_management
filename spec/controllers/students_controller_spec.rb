require 'rails_helper'

RSpec.describe StudentsController, type: :controller do
  describe "POST #create" do
    context "with valid params" do
      it "creates a new teacher" do
        school=FactoryGirl.create(:school)
        classroom=FactoryGirl.create(:classroom,:school_id=>school.id)
        teacher=FactoryGirl.create(:teacher,:school_id=>school.id)
        student=FactoryGirl.create(:student,:school_id=>school.id,:classroom_id=>classroom.id)
        student_data={:name=>student.name,:father_name=>student.father_name, :mother_name=>student.mother_name, :phone_no=>student.phone_no, :city=>student.city, :state=>student.state, :classroom_id=>student.classroom_id, :school_id=>student.school_id}
        expect {
          post :create, :student=>student_data
        }.to change(Student, :count).by(1)
        response.status.should eq 200
      end
    end
    context "with invalid params" do
      it "should return error" do
        school=FactoryGirl.create(:school);
        classroom=FactoryGirl.create(:classroom,:school_id=>school.id)
        teacher=FactoryGirl.create(:teacher,:school_id=>school.id)
        student=FactoryGirl.create(:student,:school_id=>school.id,:classroom_id=>classroom.id)
        student_data={:name=>student.name,:father_name=>student.father_name, :mother_name=>student.mother_name, :phone_no=>student.phone_no, :city=>student.city, :state=>student.state, :classroom_id=>student.classroom_id, :school_id=>nil}
        post :create, :student=>student_data
        JSON.parse(response.body)["error"].should_not be_empty
        response.status.should eq 422
      end
    end
  end

  describe "GET #index" do
    context "with valid params" do
      it "returns all students" do
        school1=FactoryGirl.create(:school)
        classroom1=FactoryGirl.create(:classroom,:school_id=>school1.id)
        classroom2=FactoryGirl.create(:classroom,:school_id=>school1.id)
        teacher1=FactoryGirl.create(:teacher,:school_id=>school1.id,:classroom_ids=>[classroom2.id])
        teacher2=FactoryGirl.create(:teacher,:school_id=>school1.id,:classroom_ids=>[classroom1.id])
        teacher3=FactoryGirl.create(:teacher,:school_id=>school1.id,:classroom_ids=>[classroom1.id,classroom2.id])
        student1=FactoryGirl.create(:student,:school_id=>school1.id,:classroom_id=>classroom1.id)
        student2=FactoryGirl.create(:student,:school_id=>school1.id,:classroom_id=>classroom2.id)
        get :index
        response.should be_success
        assigns(:students).should eq([student1,student2])
      end
    end
  end

  describe "GET #show" do
    context "with vaild params" do
      it "returns the respective student"do
        school1=FactoryGirl.create(:school)
        classroom1=FactoryGirl.create(:classroom,:school_id=>school1.id)
        classroom2=FactoryGirl.create(:classroom,:school_id=>school1.id)
        teacher1=FactoryGirl.create(:teacher,:school_id=>school1.id,:classroom_ids=>[classroom2.id])
        teacher2=FactoryGirl.create(:teacher,:school_id=>school1.id,:classroom_ids=>[classroom1.id])
        teacher3=FactoryGirl.create(:teacher,:school_id=>school1.id,:classroom_ids=>[classroom1.id,classroom2.id])
        student1=FactoryGirl.create(:student,:school_id=>school1.id,:classroom_id=>classroom1.id)
        student2=FactoryGirl.create(:student,:school_id=>school1.id,:classroom_id=>classroom2.id)
        get :show, :id=>student2.id
        JSON.parse(response.body)["id"].should eq student2.id
      end
    end
    context "with invaild params" do
      it "should return error in JSON format"do
        school1=FactoryGirl.create(:school)
        classroom1=FactoryGirl.create(:classroom,:school_id=>school1.id)
        classroom2=FactoryGirl.create(:classroom,:school_id=>school1.id)
        teacher1=FactoryGirl.create(:teacher,:school_id=>school1.id,:classroom_ids=>[classroom2.id])
        teacher2=FactoryGirl.create(:teacher,:school_id=>school1.id,:classroom_ids=>[classroom1.id])
        student1=FactoryGirl.create(:student,:school_id=>school1.id,:classroom_id=>classroom1.id)
        student2=FactoryGirl.create(:student,:school_id=>school1.id,:classroom_id=>classroom2.id)
        get :show, :id=>1
        JSON.parse(response.body)["error"].should_not be_empty
        response.status.should eq 422
      end
    end
  end

  describe "PUT #update" do
    context "with vaild params" do
      it "updates the respective student with classroom when school is changed"do
        school1=FactoryGirl.create(:school)
        school2=FactoryGirl.create(:school)
        classroom1=FactoryGirl.create(:classroom,:school_id=>school1.id)
        classroom2=FactoryGirl.create(:classroom,:school_id=>school2.id)
        classroom3=FactoryGirl.create(:classroom,:school_id=>school1.id)
        teacher1=FactoryGirl.create(:teacher,:school_id=>school2.id,:classroom_ids=>[classroom2.id])
        teacher2=FactoryGirl.create(:teacher,:school_id=>school1.id,:classroom_ids=>[classroom1.id])
        student1=FactoryGirl.create(:student,:school_id=>school1.id,:classroom_id=>classroom1.id)
        student2=FactoryGirl.create(:student,:school_id=>school1.id,:classroom_id=>classroom2.id,:teacher_ids=>[teacher1.id,teacher2.id])
        p school1.classroom_ids
        expect{
          put :update, :id=>student2.id, :student =>{:school_id=>school2.id,:classroom_id=>classroom2.id,:teacher_ids=>classroom2.teacher_ids}
        }.to_not raise_error
        p JSON.parse(response.body)
        JSON.parse(response.body)["school_id"].should eq school2.id
        JSON.parse(response.body)["classroom_id"].should eq classroom2.id
        response.status.should eq 200
      end

      it "updates the respective student when classroom is changed"do
        school1=FactoryGirl.create(:school)
        school2=FactoryGirl.create(:school)
        classroom1=FactoryGirl.create(:classroom,:school_id=>school1.id)
        classroom2=FactoryGirl.create(:classroom,:school_id=>school2.id)
        classroom3=FactoryGirl.create(:classroom,:school_id=>school1.id)
        teacher1=FactoryGirl.create(:teacher,:school_id=>school2.id,:classroom_ids=>[classroom2.id])
        teacher2=FactoryGirl.create(:teacher,:school_id=>school1.id,:classroom_ids=>[classroom1.id])
        student1=FactoryGirl.create(:student,:school_id=>school1.id,:classroom_id=>classroom1.id)
        student2=FactoryGirl.create(:student,:school_id=>school1.id,:classroom_id=>classroom2.id)
        p school1.classroom_ids
        expect{
          put :update, :id=>student2.id, :student =>{:classroom_id=>classroom2.id,:teacher_ids=>classroom2.teacher_ids}
        }.to_not raise_error
        p JSON.parse(response.body)
        p JSON.parse(response.body)["classroom_id"].should eq classroom2.id
        p JSON.parse(response.body)["teachers_id"].should eq classroom2.teacher_ids
        response.status.should eq 200
      end
    end
    context "with invaild params" do
      it "should return error in JSON format"do
        school1=FactoryGirl.create(:school)
        classroom1=FactoryGirl.create(:classroom,:school_id=>school1.id)
        classroom2=FactoryGirl.create(:classroom,:school_id=>school1.id)
        teacher1=FactoryGirl.create(:teacher,:school_id=>school1.id,:classroom_ids=>[classroom2.id])
        teacher2=FactoryGirl.create(:teacher,:school_id=>school1.id,:classroom_ids=>[classroom1.id])
        put :update, :id=>classroom2.id,  :teacher =>{:school_id=>nil}
        response.status.should eq 422
      end
    end
  end

  describe "DELETE #destroy" do
    context "with vaild params" do
      it "should delete the respective school"do
        school1=FactoryGirl.create(:school,:archive=>true)
        school2=FactoryGirl.create(:school)
        school3=FactoryGirl.create(:school)
        classroom1=FactoryGirl.create(:classroom,:school_id => school1.id,:archive=>true)
        classroom2=FactoryGirl.create(:classroom,:school_id => school2.id)
        classroom3=FactoryGirl.create(:classroom,:school_id => school2.id)
        teacher1=FactoryGirl.create(:teacher,:school_id=>school2.id,:classroom_ids=>[classroom2.id,classroom3.id])
        teacher2=FactoryGirl.create(:teacher,:school_id=>school2.id,:classroom_ids=>classroom2.id)
        teacher3=FactoryGirl.create(:teacher,:school_id=>school2.id,:classroom_ids=>classroom3.id)
        teacher4=FactoryGirl.create(:teacher,:school_id=>school2.id,:classroom_ids=>classroom2.id)
        student1=FactoryGirl.create(:student,:classroom_id=>classroom1.id,:school_id=>school1.id)
        student2=FactoryGirl.create(:student,:school_id=>school1.id,:classroom_id=>classroom2.id)
        put :archive, :id=>student1.id
        p JSON.parse(response.body)
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
        teacher1=FactoryGirl.create(:teacher,:school_id=>school1.id,:classroom_ids=>classroom1.id)
        teacher2=FactoryGirl.create(:teacher,:school_id=>school1.id,:classroom_ids=>classroom2.id)
        student1=FactoryGirl.create(:student,:school_id=>school1.id,:classroom_id=>classroom1.id)
        student2=FactoryGirl.create(:student,:school_id=>school1.id,:classroom_id=>classroom2.id)
        put :archive, :id=>1
        JSON.parse(response.body)["error"].should_not be_empty
        response.status.should eq 422
      end
    end
  end
  describe "DELETE #destroy" do
    context "with invaild params" do
      it "should return error in JSON format"do
        school1=FactoryGirl.create(:school)
        school2=FactoryGirl.create(:school)
        school3=FactoryGirl.create(:school)
        classroom1=FactoryGirl.create(:classroom,:school_id => school1.id)
        classroom2=FactoryGirl.create(:classroom,:school_id => school1.id)
        teacher1=FactoryGirl.create(:teacher,:school_id=>school1.id,:classroom_ids=>classroom1.id)
        teacher2=FactoryGirl.create(:teacher,:school_id=>school1.id,:classroom_ids=>classroom2.id)
        student1=FactoryGirl.create(:student,:school_id=>school1.id,:classroom_id=>classroom1.id)
        student2=FactoryGirl.create(:student,:school_id=>school1.id,:classroom_id=>classroom1.id)
        student3=FactoryGirl.create(:student,:school_id=>school1.id,:classroom_id=>classroom1.id)
        student4=FactoryGirl.create(:student,:school_id=>school1.id,:classroom_id=>classroom2.id)
        put :classroom_students, :id=>classroom1.id
        p JSON.parse(response.body).count
      end
    end
  end

end
