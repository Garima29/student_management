/**
 * Created by garimadadheech on 9/24/16.
 */

var SM = SM || {};

SM.AddEditTeacher = function (teacher_id) {
    console.log("header");
    console.log(teacher_id);
    console.log("header");
    this.teacher_data_id = teacher_id || "";
    if(this.teacher_data_id){
        this.update=true;
    }
    this.initialize();
}

SM.AddEditTeacher.prototype= {
    initialize:function() {
        var x=new SM.CommonDomManuplation();
        $('#addEditTeacherForm').removeClass("hidden");
        $('#addEditTeacherForm #teacherAdd').removeClass("hidden");
        $('#addEditTeacherForm #teacherUpdate').addClass("hidden");
        this.handleBackButton();
        this.clearTeacherForm();
        this.teacherFormValidate();
        this.populateClassroomList();
        this.populateSubjectList();
        this.createTeacher();
        this.populateTeacher();
        this.updateTeacher();
    },
    handleBackButton :function(){
        $("#back-link-go-back .back-link-title").unbind();
        $("#back-link-go-back .back-link-title").click(function(){
            school_id=$('#addEditSchoolForm #school_id').val();
                console.log("--------listing teacger");
                var listingTeacher = new SM.ListingTeacher(school_id);

        });
    },
    clearTeacherForm :function(){
        console.log("clearing teacher");
        $('#addEditTeacherForm #teacherName').val("");
        $('#addEditTeacherForm #teacherGender').val("");
        $('#addEditTeacherForm #teacherPhoneno').val("");
        $('#addEditTeacherForm #classroomListElement').val("");
        $('#addEditTeacherForm #subjectListElement').val("");
    },
    teacherFormValidate :function(){
        console.log("teacherform");
        $("#addEditTeacherForm #teacherForm").validate ({
            rules: {
                teacher_name: {
                    required: true
                },
                teacher_gender: {
                    required: true
                },
                teacher_phoneno: {
                    required: true,
                    minlength: 10,
                    number: true
                },
                subject_list_element: {
                    required: true
                },
                classroom_list_element: {
                    required: true
                }
            },
            messages : {
                teacher_name : {
                    required: 'teacher Name Required'
                },
                teacher_gender: {
                    required: 'teacher gender Required'
                },
                teacher_phoneno: {
                    required: 'teacher phoneno Required'
                },
                subject_list_element: {
                    required: 'Subject Required'
                },
                classroom_list_element: {
                    required: 'Classroom Required'
                }
            }
        });
    },
    populateClassroomList :function(){
        school_id=$('#addEditSchoolForm #school_id').val();
        var school_created = $('#addEditSchoolForm #school_id').val() == '' ? false :true ;
        var teacher_created = $('#addEditteacherForm #teacher_id').val() == '' ? false :true ;
        console.log(school_created);
            $.ajax({
                url: '/classrooms/non_archive_index',
                type: 'GET',
                data: {school_id:school_id},
                format: 'JSON',
                async: false,
                success: function (data, textStatus, jqXHR) {
                    console.log(data);
                    $('#classroomListElement').html("");
                    $.each(data, function (i, classroom) {
                        var option_string = "<option value=" + classroom.id + ">" + classroom.name + "</option>";
                        $('#classroomListElement').append(option_string);
                    });
                    //if(school_created) {
                    //    $('#schoolListElement').val($('#addEditSchoolForm #school_id').val());
                    //    $('#schoolListElement').prop('disabled', true);
                    //}
                },
                error: function (jqXHR, textStatus, errorThrown) {

                }
            });

    },
    populateSubjectList :function(){
        console.log("populatesubejct");
        $.ajax({
            url: '/subjects',
            type: 'GET',
            format: 'JSON',
            async: false,
            success: function (data, textStatus, jqXHR) {
                console.log(data);
                $('#subjectListElement').html("");
                $.each(data, function (i, subject) {
                    var option_string = "<option value=" + subject.id + ">" + subject.name + "</option>";
                    $('#subjectListElement').append(option_string);
                });
                //if(school_created) {
                //    $('#schoolListElement').val($('#addEditSchoolForm #school_id').val());
                //    $('#schoolListElement').prop('disabled', true);
                //}
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });
    },
    createTeacher :function(){
        var self=this;
        school_id=$('#addEditSchoolForm #school_id').val();
        console.log("createteacher");
        $('#addEditTeacherForm #teacherAdd').unbind();
        $('#addEditTeacherForm #teacherAdd').click(function(e){
            e.preventDefault();
            if($('#addEditTeacherForm #teacherForm').valid())
            {
                var teacher={};
                var classroom_ids=[];
                var subject_ids=[];
                teacher["name"]=$("#addEditTeacherForm  #teacherName").val();
                teacher["gender"]=$("#addEditTeacherForm #teacherGender").find(":selected").val();
                teacher["phone_no"]=$('#addEditTeacherForm #teacherPhoneno').val();
                teacher["school_id"]=school_id;
                $('#classroomListElement :selected').each(function(i, selected){
                    classroom_ids[i] = $(selected).val();
                });
                $('#subjectListElement :selected').each(function(i, selected){
                    subject_ids[i] = $(selected).val();
                });
                teacher["classroom_ids"]=classroom_ids;
                teacher["subject_ids"]=subject_ids;
                console.log(teacher);
                $.ajax({
                    url: '/teachers',
                    type: 'POST',
                    data: {teacher:teacher},
                    format: 'JSON',
                    async: false,
                    success: function (data, textStatus, jqXHR) {
                        console.log(data);
                        var listingteacher=new SM.ListingTeacher(school_id);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {

                    }
                });
            }


        });

    },
    populateTeacher :function(){
        var self = this;
        console.log("teacher_data_id");
        console.log(this.teacher_data_id);
        console.log("teacher_data_id");
        console.log(this.teacher_data_id);
        if(this.update){
            $('#addEditTeacherForm #teacherAdd').addClass("hidden");
            $('#addEditTeacherForm #teacherUpdate').removeClass("hidden");
            $.ajax({
                url: '/teachers/'+this.teacher_data_id,
                type: 'GET',
                format: 'JSON',
                async: false,
                success: function (data, textStatus, jqXHR) {
                    $("#addEditTeacherForm #teacher_id").val(data.id);
                    $('#addEditTeacherForm #teacherName').val(data.name);
                    $('#addEditTeacherForm #teacherPhoneno').val(data.phone_no);

                    $('#addEditTeacherForm #teacherGender').val(data.gender);
                    for (var classroom_index=0; classroom_index < data.classrooms_id.length; classroom_index++)
                    {
                        $('#classroomListElement option[value = '+data.classrooms_id[classroom_index]+']' ).prop('selected','true');
                    }
                    for (var subject_index=0; subject_index < data.subjects_id.length; subject_index++)
                    {
                        $('#subjectListElement option[value = '+data.subjects_id[subject_index]+']' ).prop('selected','true');
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {

                }
            });
        }

    },
    updateTeacher :function(){
        teacher_id=$('#addEditTeacherForm #teacher_id').val();
        console.log("teacher_id");
        console.log(teacher_id);
        console.log("teacher_id");
        school_id=$('#addEditSchoolForm #school_id').val();
        $('#addEditTeacherForm #teacherUpdate').unbind();
        $('#addEditTeacherForm #teacherUpdate').click(function(e){
            e.preventDefault();
            if($('#addEditTeacherForm #teacherForm').valid()) {
                var teacher = {};
                var classroom_ids = [];
                var subject_ids = [];
                teacher["name"] = $("#addEditTeacherForm  #teacherName").val();
                teacher["gender"] = $("#addEditTeacherForm #teacherGender").find(":selected").val();
                teacher["phone_no"] = $('#addEditTeacherForm #teacherPhoneno').val();
                teacher["school_id"] = school_id;
                $('#classroomListElement :selected').each(function (i, selected) {
                    classroom_ids[i] = $(selected).val();
                });
                $('#subjectListElement :selected').each(function (i, selected) {
                    subject_ids[i] = $(selected).val();
                });
                teacher["classroom_ids"] = classroom_ids;
                teacher["subject_ids"] = subject_ids;
                $.ajax({
                    url: '/teachers/' + teacher_id,
                    type: 'PUT',
                    format: 'JSON',
                    data: {teacher: teacher},
                    success: function (data, textStatus, jqXHR) {
                        console.log(data);
                        console.log(school_id);
                        var listingTeacher = new SM.ListingTeacher(school_id);

                    },
                    error: function (jqXHR, textStatus, errorThrown) {

                    }
                });
            }
        })
    }
}