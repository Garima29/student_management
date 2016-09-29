class SubjectsController < ApplicationController

  def index
    @subjects = Subject.all
    render :json=>@subjects, status: :ok
  end

  def show
    begin
      @subject = Subject.find(params[:id])
      render :json=> @subject, status: :ok
    rescue => error
      render :json=>{:error=> error.message}, status: :unprocessable_entity
    end
  end

  def create
    @subject = Subject.new(subject_params)
    p @subject
    if @subject.save
      render :json=>@subject, status: :ok
    else
      render :json=>{:error=>@subject.errors}, status: :unprocessable_entity
    end
  end

  def update
    begin
      @subject = Subject.find(params[:id])
      if @subject.update_attributes!(subject_params)
        render :json=>@subject, status: :ok
      end
    rescue => error
      render :json=>{:error=>error.message}, status: :unprocessable_entity
    end
  end

  def archive
    begin
      @subject = Subject.find(params[:id])
      if @subject.update_attributes(:archive=>true)
        render :json=>@subject, status: :ok
      end
    rescue => error
      render :json=>{:error=>error.message}, status: :unprocessable_entity
    end
  end
  def teacher_subjects
    @teacher = Teacher.find(params[:id])
    @subjects = @teacher.subjects
    render :json=>@subjects, status: :ok
  end

  # Never trust parameters from the scary internet, only allow the white list through.
    def subject_params
      params.require(:subject).permit(:name)
    end
end
