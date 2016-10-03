require 'rails_helper'

RSpec.describe TeachersController, type: :controller do
    describe "POST #create" do
      context "with valid params" do
        it "creates a new teacher" do
          school=FactoryGirl.create(:school)
          classroom=FactoryGirl.create(:classroom,:school_id=>school.id)
          subject1=FactoryGirl.create(:subject,:classroom_ids=[classroom.id])
          teacher=FactoryGirl.create(:teacher,:school_id=>school.id,:subject_ids=>[subject1.id])
          teacher_data={:name=>teacher.name,:gender=>teacher.gender,:phone_no=>"8909876543",:school_id=>school.id,:subject_ids=>teacher.subject_ids}
          expect {
            post :create, :teacher=>teacher_data
          }.to change(Teacher, :count).by(1)
          p JSON.parse(response.body)
          response.status.should eq 200
        end
      end
      context "with invalid params" do
        it "should return error" do
          school=FactoryGirl.create(:school);
          classroom=FactoryGirl.create(:classroom,:school_id=>school.id)
          teacher=FactoryGirl.create(:teacher,:school_id=>school.id)
          teacher_data={:name=>teacher.name,:gender=>teacher.gender,:phone_no=>teacher.phone_no,:school_id=>nil}
          post :create, :teacher=>teacher_data
          JSON.parse(response.body)["error"].should_not be_empty
          response.status.should eq 422
        end
      end
    end

    describe "GET non archive classrooms" do
      it 'should return all classrooms which are non archive' do
        school1=FactoryGirl.create(:school,:phone_no=>"8231567880")
        school2=FactoryGirl.create(:school,:phone_no=>"8131567880")
        school3=FactoryGirl.create(:school,:phone_no=>"8331567880")
        teacher1=FactoryGirl.create(:teacher,:school_id=>school1.id,:archive=>true,:phone_no=>"8431567880")
        teacher2=FactoryGirl.create(:teacher,:school_id=>school1.id,:archive=>true,:phone_no=>"8531567880")
        teacher3=FactoryGirl.create(:teacher,:school_id=>school1.id,:archive=>false,:phone_no=>"8631567880")
        classroom4=FactoryGirl.create(:classroom,:school_id=>school1.id,:archive=>false,:no_of_students=>40)
        classroom5=FactoryGirl.create(:classroom,:school_id=>school2.id,:archive=>false)
        get :non_archive_index, :school_id=>school1.id
        p JSON.parse(response.body)
        JSON.parse(response.body)[0]["id"].should eq teacher3.id
      end
    end

    describe "GET #index" do
      context "with valid params" do
        it "returns all teachers" do
          school1=FactoryGirl.create(:school)
          classroom1=FactoryGirl.create(:classroom,:school_id=>school1.id)
          classroom2=FactoryGirl.create(:classroom,:school_id=>school1.id)
          teacher1=FactoryGirl.create(:teacher,:school_id=>school1.id,:classroom_ids=>[classroom2.id],:phone_no=>"8332567880")
          teacher2=FactoryGirl.create(:teacher,:school_id=>school1.id,:classroom_ids=>[classroom1.id],:phone_no=>"8337567880")
          teacher3=FactoryGirl.create(:teacher,:school_id=>school1.id,:classroom_ids=>[classroom1.id,classroom2.id],:phone_no=>"8321567880")
          get :index
          response.should be_success
          assigns(:teachers).should eq([teacher1,teacher2,teacher3])
        end
      end
    end

    describe "GET #show" do
      context "with vaild params" do
        it "returns the respective teacher"do
          school1=FactoryGirl.create(:school)
          classroom1=FactoryGirl.create(:classroom,:school_id=>school1.id)
          classroom2=FactoryGirl.create(:classroom,:school_id=>school1.id)
          teacher1=FactoryGirl.create(:teacher,:school_id=>school1.id,:classroom_ids=>[classroom2.id],:phone_no=>"8331567881")
          teacher2=FactoryGirl.create(:teacher,:school_id=>school1.id,:classroom_ids=>[classroom1.id],:phone_no=>"8331567882")
          teacher3=FactoryGirl.create(:teacher,:school_id=>school1.id,:classroom_ids=>[classroom1.id,classroom2.id],:phone_no=>"8331567883")
          get :show, :id=>teacher2.id
          JSON.parse(response.body)["id"].should eq teacher2.id
        end
      end
      context "with invaild params" do
        it "should return error in JSON format"do
          school1=FactoryGirl.create(:school)
          classroom1=FactoryGirl.create(:classroom,:school_id=>school1.id)
          classroom2=FactoryGirl.create(:classroom,:school_id=>school1.id)
          teacher1=FactoryGirl.create(:teacher,:school_id=>school1.id,:classroom_ids=>[classroom2.id],:phone_no=>"8331567880")
          teacher2=FactoryGirl.create(:teacher,:school_id=>school1.id,:classroom_ids=>[classroom1.id],:phone_no=>"8331567882")
          get :show, :id=>1
          JSON.parse(response.body)["error"].should_not be_empty
          response.status.should eq 422
        end
      end
    end

    describe "PUT #update" do
      context "with vaild params" do
        it "updates the respective teacher"do
          school1=FactoryGirl.create(:school)
          school2=FactoryGirl.create(:school,:phone_no=>"8331567890")
          classroom1=FactoryGirl.create(:classroom,:school_id=>school1.id)
          classroom2=FactoryGirl.create(:classroom,:school_id=>school2.id)
          classroom3=FactoryGirl.create(:classroom,:school_id=>school1.id)
          teacher1=FactoryGirl.create(:teacher,:school_id=>school2.id,:classroom_ids=>[classroom2.id],:phone_no=>"8331566880")
          teacher2=FactoryGirl.create(:teacher,:school_id=>school1.id,:classroom_ids=>[classroom1.id],:phone_no=>"8331568880")
          p school1.classroom_ids
          expect{
            put :update, :id=>teacher2.id, :teacher =>{:school_id=>school2.id,:classroom_ids=>school2.classroom_ids}
          }.to_not raise_error
          p JSON.parse(response.body)
          JSON.parse(response.body)["school_id"].should eq school2.id
          JSON.parse(response.body)["classrooms_id"].should eq [classroom2.id]
          response.status.should eq 200
        end
      end
      context "with invaild params" do
        it "should return error in JSON format"do
          school1=FactoryGirl.create(:school)
          classroom1=FactoryGirl.create(:classroom,:school_id=>school1.id)
          classroom2=FactoryGirl.create(:classroom,:school_id=>school1.id)
          teacher1=FactoryGirl.create(:teacher,:school_id=>school1.id,:classroom_ids=>[classroom2.id],:phone_no=>"8331567880")
          teacher2=FactoryGirl.create(:teacher,:school_id=>school1.id,:classroom_ids=>[classroom1.id],:phone_no=>"8331567889")
          put :update, :id=>classroom2.id,  :teacher =>{:school_id=>nil}
          response.status.should eq 422
        end
      end
    end

    describe "DELETE #destroy" do
      context "with vaild params" do
        it "should delete the respective teacher"do
          school1=FactoryGirl.create(:school,:archive=>true)
          school2=FactoryGirl.create(:school,:phone_no=>"8331567890")
          school3=FactoryGirl.create(:school,:phone_no=>"8331567860")
          classroom1=FactoryGirl.create(:classroom,:school_id => school1.id,:archive=>true)
          classroom2=FactoryGirl.create(:classroom,:school_id => school1.id)
          classroom3=FactoryGirl.create(:classroom,:school_id => school1.id)
          teacher1=FactoryGirl.create(:teacher,:school_id=>school1.id,:classroom_ids=>[classroom1.id],:phone_no=>"8331567830")
          teacher2=FactoryGirl.create(:teacher,:school_id=>school1.id,:classroom_ids=>classroom2.id,:phone_no=>"8331567280")
          teacher3=FactoryGirl.create(:teacher,:school_id=>school1.id,:phone_no=>"8331567180")
          teacher4=FactoryGirl.create(:teacher,:school_id=>school1.id,:phone_no=>"8331562880")
          p teacher1.classrooms
          put :archive, :id=>teacher1.id
          JSON.parse(response.body)["archive"].should eq true
          response.status.should eq 200
        end

      end

      context "with invaild params" do
        it "should return error in JSON format"do
          school1=FactoryGirl.create(:school)
          school2=FactoryGirl.create(:school,:phone_no=>"8331537880")
          school3=FactoryGirl.create(:school,:phone_no=>"8331527880")
          classroom1=FactoryGirl.create(:classroom,:school_id => school1.id)
          classroom2=FactoryGirl.create(:classroom,:school_id => school1.id)
          teacher1=FactoryGirl.create(:teacher,:school_id=>school1.id,:classroom_ids=>classroom1.id,:phone_no=>"8331567880")
          teacher2=FactoryGirl.create(:teacher,:school_id=>school1.id,:classroom_ids=>classroom2.id,:phone_no=>"8331567890")
          student1=FactoryGirl.create(:student,:school_id=>school1.id,:classroom_id=>classroom1.id,:phone_no=>"8331567870")
          student2=FactoryGirl.create(:student,:school_id=>school1.id,:classroom_id=>classroom2.id,:phone_no=>"8331567820")
          put :archive, :id=>1
          JSON.parse(response.body)["error"].should_not be_empty
          response.status.should eq 422
        end
      end
    end


end
