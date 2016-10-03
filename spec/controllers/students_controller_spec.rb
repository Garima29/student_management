require 'rails_helper'

RSpec.describe StudentsController, type: :controller do
  describe "POST #create" do
    context "with valid params" do
      it "creates a new teacher" do
        school=FactoryGirl.create(:school)
        classroom=FactoryGirl.create(:classroom,:school_id=>school.id)
        teacher=FactoryGirl.create(:teacher,:school_id=>school.id)
        student=FactoryGirl.create(:student,:school_id=>school.id,:classroom_id=>classroom.id)
        student_data={:name=>student.name,:father_name=>student.father_name, :mother_name=>student.mother_name,:phone_no=>"1234567803", :city=>student.city, :state=>student.state, :classroom_id=>student.classroom_id, :school_id=>student.school_id}
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
        teacher1=FactoryGirl.create(:teacher,:school_id=>school1.id,:classroom_ids=>[classroom2.id],:phone_no=>"1234557803")
        teacher2=FactoryGirl.create(:teacher,:school_id=>school1.id,:classroom_ids=>[classroom1.id],:phone_no=>"1234537803")
        teacher3=FactoryGirl.create(:teacher,:school_id=>school1.id,:classroom_ids=>[classroom1.id,classroom2.id],:phone_no=>"1234967803")
        student1=FactoryGirl.create(:student,:school_id=>school1.id,:classroom_id=>classroom1.id,:phone_no=>"1234567802")
        student2=FactoryGirl.create(:student,:school_id=>school1.id,:classroom_id=>classroom2.id,:phone_no=>"1234567801")
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
        teacher1=FactoryGirl.create(:teacher,:school_id=>school1.id,:classroom_ids=>[classroom2.id],:phone_no=>"1231567803")
        teacher2=FactoryGirl.create(:teacher,:school_id=>school1.id,:classroom_ids=>[classroom1.id],:phone_no=>"1231567103")
        teacher3=FactoryGirl.create(:teacher,:school_id=>school1.id,:classroom_ids=>[classroom1.id,classroom2.id],:phone_no=>"1134561803")
        student1=FactoryGirl.create(:student,:school_id=>school1.id,:classroom_id=>classroom1.id,:phone_no=>"1234567103")
        student2=FactoryGirl.create(:student,:school_id=>school1.id,:classroom_id=>classroom2.id,:phone_no=>"1214267803")
        get :show, :id=>student2.id
        JSON.parse(response.body)["id"].should eq student2.id
      end
    end
    context "with invaild params" do
      it "should return error in JSON format"do
        school1=FactoryGirl.create(:school)
        classroom1=FactoryGirl.create(:classroom,:school_id=>school1.id)
        classroom2=FactoryGirl.create(:classroom,:school_id=>school1.id)
        teacher1=FactoryGirl.create(:teacher,:school_id=>school1.id,:classroom_ids=>[classroom2.id],:phone_no=>"1134567803")
        teacher2=FactoryGirl.create(:teacher,:school_id=>school1.id,:classroom_ids=>[classroom1.id],:phone_no=>"1234567803")
        student1=FactoryGirl.create(:student,:school_id=>school1.id,:classroom_id=>classroom1.id,:phone_no=>"1334567803")
        student2=FactoryGirl.create(:student,:school_id=>school1.id,:classroom_id=>classroom2.id,:phone_no=>"1434567803")
        get :show, :id=>1
        JSON.parse(response.body)["error"].should_not be_empty
        response.status.should eq 422
      end
    end
  end

  describe "PUT #update" do
    context "with vaild params" do
      it "updates the respective student with classroom when school is changed"do
        school1=FactoryGirl.create(:school,:phone_no=>"9234567880")
        school2=FactoryGirl.create(:school,:phone_no=>"9234567881")
        classroom1=FactoryGirl.create(:classroom,:school_id=>school1.id)
        classroom2=FactoryGirl.create(:classroom,:school_id=>school2.id)
        classroom3=FactoryGirl.create(:classroom,:school_id=>school1.id)
        teacher1=FactoryGirl.create(:teacher,:school_id=>school2.id,:classroom_ids=>[classroom2.id],:phone_no=>"9334567880")
        teacher2=FactoryGirl.create(:teacher,:school_id=>school1.id,:classroom_ids=>[classroom1.id],:phone_no=>"9234567882")
        student1=FactoryGirl.create(:student,:school_id=>school1.id,:classroom_id=>classroom1.id,:phone_no=>"9234567887")
        student2=FactoryGirl.create(:student,:school_id=>school1.id,:classroom_id=>classroom2.id,:teacher_ids=>[teacher1.id,teacher2.id],:phone_no=>"9234567885")
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
        school1=FactoryGirl.create(:school,:phone_no=>"9234567380")
        school2=FactoryGirl.create(:school,:phone_no=>"9234527880")
        classroom1=FactoryGirl.create(:classroom,:school_id=>school1.id)
        classroom2=FactoryGirl.create(:classroom,:school_id=>school2.id)
        classroom3=FactoryGirl.create(:classroom,:school_id=>school1.id)
        teacher1=FactoryGirl.create(:teacher,:school_id=>school2.id,:classroom_ids=>[classroom2.id],:phone_no=>"9134567880")
        teacher2=FactoryGirl.create(:teacher,:school_id=>school1.id,:classroom_ids=>[classroom1.id],:phone_no=>"9334567880")
        student1=FactoryGirl.create(:student,:school_id=>school1.id,:classroom_id=>classroom1.id,:phone_no=>"9234567890")
        student2=FactoryGirl.create(:student,:school_id=>school1.id,:classroom_id=>classroom2.id,:phone_no=>"9234564880")
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
        teacher1=FactoryGirl.create(:teacher,:school_id=>school1.id,:classroom_ids=>[classroom2.id],:phone_no=>"1224567803")
        teacher2=FactoryGirl.create(:teacher,:school_id=>school1.id,:classroom_ids=>[classroom1.id],:phone_no=>"1334567803")
        put :update, :id=>classroom2.id,  :teacher =>{:school_id=>nil}
        response.status.should eq 422
      end
    end
  end

  describe "DELETE #destroy" do
    context "with vaild params" do
      it "should delete the respective school"do
        school1=FactoryGirl.create(:school,:archive=>true)
        school2=FactoryGirl.create(:school,:phone_no=>"9234567880")
        school3=FactoryGirl.create(:school,:phone_no=>"9234567180")
        classroom1=FactoryGirl.create(:classroom,:school_id => school1.id,:archive=>true)
        classroom2=FactoryGirl.create(:classroom,:school_id => school2.id)
        classroom3=FactoryGirl.create(:classroom,:school_id => school2.id)
        teacher1=FactoryGirl.create(:teacher,:school_id=>school2.id,:classroom_ids=>[classroom2.id,classroom3.id],:phone_no=>"9224567880")
        teacher2=FactoryGirl.create(:teacher,:school_id=>school2.id,:classroom_ids=>classroom2.id,:phone_no=>"9234567886")
        teacher3=FactoryGirl.create(:teacher,:school_id=>school2.id,:classroom_ids=>classroom3.id,:phone_no=>"9234567820")
        teacher4=FactoryGirl.create(:teacher,:school_id=>school2.id,:classroom_ids=>classroom2.id,:phone_no=>"9234569880")
        student1=FactoryGirl.create(:student,:classroom_id=>classroom1.id,:school_id=>school1.id,:phone_no=>"9231567880")
        student2=FactoryGirl.create(:student,:school_id=>school1.id,:classroom_id=>classroom2.id,:phone_no=>"9234561880")
        put :archive, :id=>student1.id
        p JSON.parse(response.body)
        JSON.parse(response.body)["archive"].should eq true
        response.status.should eq 200
      end
    end
    context "with invaild params" do
      it "should return error in JSON format"do
        school1=FactoryGirl.create(:school)
        school2=FactoryGirl.create(:school,:phone_no=>"9234567880")
        school3=FactoryGirl.create(:school,:phone_no=>"9234567180")
        classroom1=FactoryGirl.create(:classroom,:school_id => school1.id)
        classroom2=FactoryGirl.create(:classroom,:school_id => school1.id)
        teacher1=FactoryGirl.create(:teacher,:school_id=>school1.id,:classroom_ids=>classroom1.id,:phone_no=>"9231567880")
        teacher2=FactoryGirl.create(:teacher,:school_id=>school1.id,:classroom_ids=>classroom2.id,:phone_no=>"9231567810")
        student1=FactoryGirl.create(:student,:school_id=>school1.id,:classroom_id=>classroom1.id,:phone_no=>"9231567880")
        student2=FactoryGirl.create(:student,:school_id=>school1.id,:classroom_id=>classroom2.id,:phone_no=>"9231567890")
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
        school2=FactoryGirl.create(:school,:phone_no=>"9234567880")
        school3=FactoryGirl.create(:school,:phone_no=>"9234567180")
        classroom1=FactoryGirl.create(:classroom,:school_id => school1.id)
        classroom2=FactoryGirl.create(:classroom,:school_id => school1.id)
        teacher1=FactoryGirl.create(:teacher,:school_id=>school1.id,:classroom_ids=>classroom1.id,:phone_no=>"9231267880")
        teacher2=FactoryGirl.create(:teacher,:school_id=>school1.id,:classroom_ids=>classroom2.id,:phone_no=>"9231367880")
        student1=FactoryGirl.create(:student,:school_id=>school1.id,:classroom_id=>classroom1.id,:phone_no=>"9231547880")
        student2=FactoryGirl.create(:student,:school_id=>school1.id,:classroom_id=>classroom1.id,:phone_no=>"9231557880")
        student3=FactoryGirl.create(:student,:school_id=>school1.id,:classroom_id=>classroom1.id,:phone_no=>"9231587880")
        student4=FactoryGirl.create(:student,:school_id=>school1.id,:classroom_id=>classroom2.id,:phone_no=>"9231597880")
        put :classroom_students, :id=>classroom1.id
      end
    end
  end

end
