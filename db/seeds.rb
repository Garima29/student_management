# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
#created fefault for school
School.create(:name=>"school2",:city=>"Udai",:zipcode=>"313001",:state=>"Raj",:phone_no=>"9123456788")
School.create(:name=>"school1",:city=>"Udai",:zipcode=>"313001",:state=>"Raj",:phone_no=>"9123456789")
School.create(:name=>"school3",:city=>"Udai",:zipcode=>"313001",:state=>"Raj",:phone_no=>"9123456787")

#created default for classroom
Classroom.create(:name=>"Nursery",:no_of_students=>25,:school_id=>1)
Classroom.create(:name=>"KG",:no_of_students=>25,:school_id=>1)
Classroom.create(:name=>"Prep",:no_of_students=>25,:school_id=>1)

#created default for teacher
Teacher.create(:name=>"Tech1",:gender=>"male",:phone_no=>"9123456789",:school_id=>1)
Teacher.create(:name=>"Tech2",:gender=>"male",:phone_no=>"9123456785",:school_id=>2)
Teacher.create(:name=>"Tech3",:gender=>"female",:phone_no=>"9123456782",:school_id=>3)

#created default for student
Student.create(:name=>"stud1",:father_name =>"father1",:mother_name => "mother1",:phone_no => "9123456789",:city=>"Udai",:zipcode=>"313001",:state=>"Raj",:school_id=>1)
Student.create(:name=>"stud2",:father_name =>"father2",:mother_name => "mother2",:phone_no => "9123456788",:city=>"Jaiur",:zipcode=>"413001",:state=>"Raj",:school_id=>2)
Student.create(:name=>"stud3",:father_name =>"father3",:mother_name => "mother3",:phone_no => "9123456787",:city=>"Jodhpur",:zipcode=>"213001",:state=>"Raj",:school_id=>3)

#created default for subjects
Subject.create(:name => "sub1")
Subject.create(:name => "sub2")
Subject.create(:name => "sub3")