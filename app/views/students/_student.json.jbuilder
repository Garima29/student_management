json.extract! student, :id, :name, :father_name, :mother_name, :phone_no, :city, :zipcode, :state, :classroom_id, :school_id, :created_at, :updated_at
json.url student_url(student, format: :json)