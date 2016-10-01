class StudentsController < ApplicationController
    def index
      @students = Student.all
    end

    def show
      begin
        @student = Student.find(params[:id])
        render :json=>@student, status: :ok
      rescue => error
        render :json=>{:error=>error.message}, status: :unprocessable_entity
      end
    end

    def create
      @student = Student.new(student_params)
      if @student.save
        render :json=>@student, status: :ok
      else
        p @student.errors
        render :json=>{:error=>@student.errors}, status: :unprocessable_entity
      end
    end

    def update
      begin
        @student = Student.find(params[:id])
        student_update=(params.require(:student).permit(:name, :father_name, :mother_name, :phone_no, :city, :zipcode, :state, :classroom_id, :school_id)).merge(:teacher_ids=>params[:student][:teacher_ids])
        if @student.update_attributes!(student_update)
          render :json=>JSON.parse(@student.to_json(:methods=>[:teachers_id])), status: :ok
        end
      rescue => error
        render :json=>{:error=>error.message}, status: :unprocessable_entity
      end
    end

    # DELETE /teachers/1
    # DELETE /teachers/1.json
    def archive
      begin
        @student = Student.find(params[:id])
          if @student.update_attributes!(:archive=>true)
            render :json=>@student, status: :ok
          end
        rescue => error
          p error.message
          render :json=>{:error=>error.message}, status: :unprocessable_entity
      end
    end

    def classroom_students
      @classroom = Classroom.find(params[:id])
      @students = @classroom.students.collect {|s| s if s.archive == false}.compact
      p @students
      render :json=>@students, status: :ok
    end
    private


  # Never trust parameters from the scary internet, only allow the white list through.
    def student_params
      params.require(:student).permit(:name, :father_name, :mother_name, :phone_no, :city, :zipcode, :state, :classroom_id, :school_id)
    end
end
