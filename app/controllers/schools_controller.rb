class SchoolsController < ApplicationController

  def index
    @schools = School.all
    render :json=>@schools, status: :ok
  end

  def non_archive_index
    @schools = School.all.collect {|s| s if s.archive == false}.compact
    p @schools
    render :json => @schools, :status => :ok
  end

  def show
    begin
      @school = School.find(params[:id])
      render :json=> @school, status: :ok
    rescue => error
      render :json=>{:error=> error.message}, status: :unprocessable_entity
    end
  end

  def create
    @school = School.new(school_params)
      if @school.save
        render :json=>@school, status: :ok
      else
        p @school.errors
        render :json=>{:error=>@school.errors}, status: :unprocessable_entity
    end
  end

  def update
    begin
    @school = School.find(params[:id])
    if @school.update_attributes!(school_params)
      render :json=>@school, status: :ok
    end
    rescue => error
      render :json=>{:error=>error.message}, status: :unprocessable_entity
    end
  end

  def archive
    begin
    @school = School.find(params[:id])
    @classroom = @school.classrooms
    @teacher = @school.teachers
    @student = @school.students
    @student.each do |student|
      student.update_attributes(:archive=>true)
    end
    @teacher.each do |teacher|
      teacher.update_attributes(:archive=>true)
    end
    if @school.update_attributes(:archive=>true)
      render :json=>@school, status: :ok
    end
    rescue => error
    render :json=>{:error=>error.message}, status: :unprocessable_entity
    end
  end

  private
    def school_params
      params.require(:school).permit(:name, :city, :zipcode, :state, :phone_no)
    end
end
