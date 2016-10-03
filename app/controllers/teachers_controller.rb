class TeachersController < ApplicationController
  def index
    @teachers = Teacher.all
    render :json => @teachers, :status => :ok
  end

  def non_archive_index
    @school = School.find(params[:school_id])
    @teachers = @school.teachers.collect {|t| t if t.archive == false}.compact
    p "teachers"
    p @teachers
    @teachers.each do |teacher|
      p teacher.classroom_ids
    end
    render :json => @teachers, :status => :ok
  end

  def show
    begin
      @teacher = Teacher.find(params[:id])
      render :json=>JSON.parse(@teacher.to_json(:methods=>[:subjects_id,:classrooms_id])), status: :ok
    rescue => error
       render :json=>{:error=>error.message}, status: :unprocessable_entity
    end
  end

  def create
    p params
    teacher=(params.require(:teacher).permit(:name, :gender, :phone_no, :school_id))
    p teacher
    teacher_merge=teacher.merge!(:subject_ids=>params[:teacher][:subject_ids],:classroom_ids=>params[:teacher][:classroom_ids])
    p teacher_merge
    @teacher = Teacher.new(teacher_merge)
    if @teacher.save
      render :json=>JSON.parse(@teacher.to_json(:methods=>[:subjects_id,:classrooms_id])), status: :ok
    else
      p @teacher.errors
      render :json=>{:error=>@teacher.errors}, status: :unprocessable_entity
    end
  end

  def update
    begin
      @teacher = Teacher.find(params[:id])
      teacher_update=(params.require(:teacher).permit(:name, :gender, :phone_no, :school_id)).merge!(:classroom_ids=>params[:teacher][:classroom_ids],:subject_ids=>params[:teacher][:subject_ids])
      if @teacher.update_attributes!(teacher_update)
        render :json=>JSON.parse(@teacher.to_json(:methods=>[:classrooms_id,:subjects_id])), status: :ok
      end
      p @teacher.errors
    rescue => error
      p error.message
      render :json=>{:error=>error.message}, status: :unprocessable_entity
    end
  end

  def archive
    begin
      @teacher = Teacher.find(params[:id])
      p @teacher
      if @teacher.update_attributes!(:archive=>true)
         render :json=>@teacher, status: :ok
      end
    rescue => error
      p error.message
      render :json=>{:error=>error.message}, status: :unprocessable_entity
    end
  end



  private

    # Never trust parameters from the scary internet, only allow the white list through.
    # def teacher_params
    #   params.require(:teacher).permit(:name, :gender, :phone_no, :school_id)
    # end
end
