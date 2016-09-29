/**
 * Created by garimadadheech on 9/24/16.
 */

var SM = SM || {};

SM.AddEditStudent = function (student_id) {
    console.log("header");
    console.log(student_id);
    console.log("header");
    this.student_data_id = student_id || "";
    if(this.student_data_id){
        this.update=true;
    }
    this.initialize();
}

SM.AddEditStudent.prototype= {
    initialize:function() {
        var x=new SM.CommonDomManuplation();
        $('#addEditStudentForm').removeClass("hidden");
        $('#addEditStudentForm #studentAdd').removeClass("hidden");
        $('#addEditStudentForm #studentUpdate').addClass("hidden");
        this.handleBackButton();
        this.clearStudentForm();
        this.studentFormValidate();
        this.populateStudentClassroomList();
        this.createStudent();
        this.populateStudent();
        this.updateStudent();
    },
    handleBackButton :function(){
        $("#back-link-go-back .back-link-title").unbind();
        $("#back-link-go-back .back-link-title").click(function(){
            school_id=$('#addEditSchoolForm #school_id').val();
            console.log("--------listing classroom");
            var listingStudent = new SM.ListingStudent(school_id);

        });
    },
    clearStudentForm :function(){
        console.log("clearing student");
        $('#addEditStudentForm #studentName').val("");
        $('#addEditStudentForm #studentClass').val("");
        $("#addEditStudentForm  #studentFatherName").val("");
        $("#addEditStudentForm  #studentMotherName").val("");
        $("#addEditStudentForm  #studentPhoneno").val("");
        $("#addEditStudentForm  #studentCity").val("");
        $("#addEditStudentForm  #studentState").val("");
        $("#addEditStudentForm #studentGender").val("");
    },
    studentFormValidate :function(){
        console.log("studentform");
        $("#addEditStudentForm #studentForm").validate ({
            rules: {
                student_name: {
                    required: true
                },
                student_father_name: {
                    required: true
                },
                student_mother_name: {
                    required: true
                },
                student_city_name: {
                    required: true
                },
                student_state_name: {
                    required: true
                },
                student_phoneno: {
                    required: true,
                    minlength: 10,
                    number: true
                },
                student_classroom_list_element: {
                    required: true
                }
            },
            messages : {
                student_name : {
                    required: 'student Name Required'
                },
                student_father_name: {
                    required: 'student father Name Required'
                },
                student_mother_name: {
                    required: 'student mother Name Required'
                },
                student_city_name: {
                    required: 'student city Name Required'
                },
                student_state_name: {
                    required: 'student state Name Required'
                },
                student_phoneno: {
                    required: 'student phone no Required',
                },
                student_classroom_list_element: {
                    required: 'student classroom Required'
                }
            }
        });
    },

    createStudent :function(){
        var self=this;
        school_id=$('#addEditSchoolForm #school_id').val();
        classroom_id_id=$('#addEditClassroomForm #classroom_id').val();
        console.log("createstudent");
        $('#addEditStudentForm #studentAdd').unbind();
        $('#addEditStudentForm #studentAdd').click(function(e){
            e.preventDefault();
            if($('#addEditStudentForm #studentForm').valid())
            {
                var student={};
                var classroom_ids=[];
                var subject_ids=[];
                student["name"]=$("#addEditStudentForm  #studentName").val();
                student["father_name"]=$("#addEditStudentForm  #studentFatherName").val();
                student["mother_name"]=$("#addEditStudentForm  #studentMotherName").val();
                student["phone_no"]=$("#addEditStudentForm  #studentPhoneno").val();
                student["city"]=$("#addEditStudentForm  #studentCity").val();
                student["state"]=$("#addEditStudentForm  #studentState").val();
                student["classroom_id"]=$("#addEditStudentForm #studentClassroomListElement").val();
                student["school_id"]=school_id;
                console.log(student);
                $.ajax({
                    url: '/students',
                    type: 'POST',
                    data: {student:student},
                    format: 'JSON',
                    async: false,
                    success: function (data, textStatus, jqXHR) {
                        console.log(data);
                        var listingstudent=new SM.ListingStudent();
                    },
                    error: function (jqXHR, textStatus, errorThrown) {

                    }
                });
            }


        });

    },
    populateStudentClassroomList: function(){
        var school_created = $('#addEditSchoolForm #school_id').val() == '' ? false :true ;
        var school_id=$('#addEditSchoolForm #school_id').val();
        var classroom_created = $('#addEditClassroomForm #classroom_id').val() == '' ? false :true ;
        console.log(school_created);
        $.ajax({
            url: '/classrooms/non_archive_index',
            type: 'GET',
            format: 'JSON',
            data: {school_id:school_id},
            async: false,
            success: function (data, textStatus, jqXHR) {
                console.log(data);
                $('#studentClassroomListElement').html("");
                $.each(data, function (i, classroom) {
                    var option_string = "<option value=" + classroom.id + ">" + classroom.name + "</option>";
                    $('#studentClassroomListElement').append(option_string);
                });
                if(classroom_created) {
                    $('#studentClassroomListElement').val($('#addEditClassroomForm #classroom_id').val());
                    $('#studentClassroomListElement').prop('disabled', true);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });

    },
    populateStudent :function(){
        var self = this;
        console.log("student_data_id");
        console.log(this.student_data_id);
        console.log("student_data_id");
        console.log(this.student_data_id);
        if(this.update){
            $('#addEditStudentForm #studentAdd').addClass("hidden");
            $('#addEditStudentForm #studentUpdate').removeClass("hidden");
            $.ajax({
                url: '/students/'+this.student_data_id,
                type: 'GET',
                format: 'JSON',
                async: false,
                success: function (data, textStatus, jqXHR) {
                    $("#addEditStudentForm #student_id").val(data.id);
                    $('#addEditStudentForm #studentName').val(data.name);
                    $('#addEditStudentForm #studentPhoneno').val(data.phone_no);
                    $("#addEditStudentForm  #studentFatherName").val(data.father_name);
                    $("#addEditStudentForm  #studentMotherName").val(data.mother_name);
                    $("#addEditStudentForm  #studentPhoneno").val(data.phone_no);
                    $("#addEditStudentForm  #studentCity").val(data.city);
                    $("#addEditStudentForm  #studentState").val(data.state);
                    $('#addEditStudentForm  #studentClassroomListElement').prop('disabled',false);
                },
                error: function (jqXHR, textStatus, errorThrown) {

                }
            });
        }

    },
    updateStudent :function(){
        student_id=$('#addEditStudentForm #student_id').val();
        console.log("student_id");
        console.log(student_id);
        console.log("student_id");
        school_id=$('#addEditSchoolForm #school_id').val();
        $('#addEditStudentForm #studentUpdate').unbind();
        $('#addEditStudentForm #studentUpdate').click(function(e){
            e.preventDefault();
            if($('#addEditStudentForm #studentForm').valid()) {
                var student = {};
                student["name"] = $('#addEditStudentForm #studentName').val();
                student["phone_no"] = $('#addEditStudentForm #studentPhoneno').val();
                student["father_name"] = $("#addEditStudentForm  #studentFatherName").val();
                student["mother_name"] = $("#addEditStudentForm  #studentMotherName").val();
                student["phone_no"] = $("#addEditStudentForm  #studentPhoneno").val();
                student["city"] = $("#addEditStudentForm  #studentCity").val();
                student["state"] = $("#addEditStudentForm  #studentState").val();
                student["classroom_id"] = $('#addEditStudentForm  #studentClassroomListElement').val();
                student["school_id"] = school_id;
                $.ajax({
                    url: '/students/' + student_id,
                    type: 'PUT',
                    format: 'JSON',
                    data: {student: student},
                    success: function (data, textStatus, jqXHR) {
                        console.log(data);
                        console.log(school_id);
                        var listingStudent = new SM.ListingStudent(school_id);

                    },
                    error: function (jqXHR, textStatus, errorThrown) {

                    }
                });
            }
        })

    }
}