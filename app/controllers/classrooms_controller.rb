class ClassroomsController < ApplicationController

  def index
    @classrooms = Classroom.all
    render :json=> @classrooms, status: :ok
  end

  def non_archive_index
    @school = School.find(params[:school_id])
    @classrooms = @school.classrooms.collect {|c| c if c.archive == false}.compact
    render :json => @classrooms, :status => :ok
  end

  def show
    begin
      @classroom=Classroom.find(params[:id])
      render :json=> @classroom, status: :ok
    rescue => error
      render :json=>{:error=>error.message}, status: :unprocessable_entity
    end
  end

  def edit
  end

  def create
    @classroom = Classroom.new(classroom_params)
    if @classroom.save
      render :json=>@classroom, status: :ok
    else
      p @classroom.errors
      render :json=>{:error=>@classroom.errors}, status: :unprocessable_entity
    end
  end

  def update
    begin
      @classroom = Classroom.find(params[:id])
      if @classroom.update_attributes!(classroom_params)

        render :json=>@classroom, status: :ok
      end
    rescue => error
      render :json=>{:error=>error.message}, status: :unprocessable_entity
    end
  end

  def archive
    begin
      @classroom = Classroom.find(params[:id])
      @teacher = @classroom.teachers
      @student = @classroom.students
      @student.each do |student|
        student.update_attributes(:archive=>true)
      end
      @teacher.each do |teacher|
        teacher.update_attributes(:archive=>true)
      end
      if @classroom.update_attributes(:archive=>true)
        render :json=>@classroom, status: :ok
      end
    rescue => error
      render :json=>{:error=>error.message}, status: :unprocessable_entity
    end
  end

  def teacher_classrooms
    @teacher = Teacher.find(params[:id])
    @classrooms = @teacher.classrooms.collect {|c| c if c.archive == false}.compact
    render :json=>@classrooms, status: :ok
  end
  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def classroom_params
      params.require(:classroom).permit(:name, :no_of_students, :school_id)
    end
end
