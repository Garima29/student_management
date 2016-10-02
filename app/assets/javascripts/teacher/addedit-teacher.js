/**
 * Created by garimadadheech on 9/24/16.
 */

var SM = SM || {};

SM.AddEditTeacher = function () {
    this.initialize();
}

SM.AddEditTeacher.prototype= {
    initialize:function() {
        var commonDomManuplation=new SM.CommonDomManuplation();
        $('#schoolContainer #addEditTeacherForm').removeClass("hidden");
        $('#addEditTeacherForm #teacherAdd').removeClass("hidden");
        $('#addEditTeacherForm #teacherUpdate').addClass("hidden");
        this.handleBackButton();
        this.handleHomeButton();
        this.clearTeacherForm();
        this.teacherFormValidate();
        this.populateSchoolList();
        this.populateSubjectList();
        this.createTeacher();
        this.populateTeacher();
        this.updateTeacher();
    },
    handleBackButton :function(){
        $("#backLinkGoBack .back-link-title").unbind();
        $("#backLinkGoBack .back-link-title").click(function(){
            var listingTeacher = new SM.ListingTeacher();
        });
    },
    handleHomeButton :function(){
        $("#backLinkGoHome .back-link-title").unbind();
        $("#backLinkGoHome .back-link-title").click(function(){
            var listingSchool=new SM.ListingSchool();
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
                school_list_element: {
                    required: true
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
                school_list_element: {
                    required: 'Subject Required'
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
    populateSchoolList :function(){
        var self=this;
        var school_id=$('#addEditSchoolForm #school_id').val();
        var school_created = $('#addEditSchoolForm #school_id').val() == '' ? false :true ;
        var teacher_created = $('#addEditTeacherForm #teacher_id').val() == '' ? false :true ;
        console.log(school_created);
        $.ajax({
            url: '/schools/non_archive_index',
            type: 'GET',
            format: 'JSON',
            async: false,
            success: function (data, textStatus, jqXHR) {
                console.log(data);
                $('#teacherForm #schoolListElement').html("");
                $('#teacherForm #classroomListElement').html("");
                $.each(data, function (i, school) {
                    var option_string = "<option value=" + school.id + ">" + school.name + "</option>";
                    $('#teacherForm #schoolListElement').append(option_string);
                });
                if(!(teacher_created)){
                    //var school_id=$('#addEditSchoolForm #school_id').val();
                    $('#teacherForm #schoolListElement option[value = '+school_id+']').prop('selected','true');
                    $('#teacherForm #schoolListElement').prop('disabled',true);
                    self.populateClassroomList(school_id);
                }

                //console.log("teacher created");
                //console.log(teacher_created);
                //console.log("teacher created");
                $("#teacherForm #schoolListElement").change(function() {
                    var school_selected = $(this).val();
                    self.populateClassroomList(school_selected);
                });

            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });

    },
    populateClassroomList :function(school_id){
        console.log("on change");
        //var school_id=$('#teacherForm #schoolListElement').find(":selected").val();
        console.log(school_id);
            $.ajax({
                url: '/classrooms/non_archive_index',
                type: 'GET',
                data: {school_id:school_id},
                format: 'JSON',
                async: false,
                success: function (data, textStatus, jqXHR) {
                    console.log(data);
                    $('#teacherForm #classroomListElement').html("");
                    $.each(data, function (i, classroom) {
                        console.log(classroom.school_id);
                        var option_string = "<option value=" + classroom.id + ">" + classroom.name + "</option>";
                        $('#teacherForm #classroomListElement').append(option_string);
                    });
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
                $('#teacherForm #subjectListElement').html("");
                $.each(data, function (i, subject) {
                    var option_string = "<option value=" + subject.id + ">" + subject.name + "</option>";
                    $('#teacherForm #subjectListElement').append(option_string);
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });
    },
    createTeacher :function(){
        var self=this;
        var school_id=$('#addEditSchoolForm #school_id').val();
        console.log("createteacher");
        $('#addEditTeacherForm #teacherAdd').unbind();
        $('#addEditTeacherForm #teacherAdd').click(function(e){
            e.preventDefault();
            console.log("beore valid");
            if($('#addEditTeacherForm #teacherForm').valid())
            {
                console.log("===========");
                console.log("after valid");
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
                console.log("teachhhhh");
                console.log(teacher);
                console.log("teachhhhh");
                $.ajax({
                    url: '/teachers',
                    type: 'POST',
                    data: {teacher:teacher},
                    format: 'JSON',
                    async: false,
                    success: function (data, textStatus, jqXHR) {
                        console.log(data);
                        var listingteacher=new SM.ListingTeacher();
                    },
                    error: function (jqXHR, textStatus, errorThrown) {

                    }
                });
            }


        });

    },
    populateTeacher :function(){
        var self = this;
        var teacher_created = $('#addEditTeacherForm #teacher_id').val() == '' ? false :true ;
        if(teacher_created){
            var teacher_id=$('#addEditTeacherForm #teacher_id').val();
            $('#addEditTeacherForm #teacherAdd').addClass("hidden");
            $('#addEditTeacherForm #teacherUpdate').removeClass("hidden");
            $.ajax({
                url: '/teachers/'+teacher_id,
                type: 'GET',
                format: 'JSON',
                async: false,
                success: function (data, textStatus, jqXHR) {
                    $("#addEditTeacherForm #teacher_id").val(data.id);
                    $('#addEditTeacherForm #teacherName').val(data.name);
                    $('#addEditTeacherForm #teacherPhoneno').val(data.phone_no);
                    $('#addEditTeacherForm #teacherGender').val(data.gender);
                    $('#teacherForm #schoolListElement option[value = '+data.school_id+']' ).prop('selected','true');
                    $('#teacherForm #schoolListElement').prop('disabled',false);
                    self.populateClassroomList(data.school_id);
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
        var teacher_id=$('#addEditTeacherForm #teacher_id').val();
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
                $('#classroomListElement :selected').each(function (i, selected) {
                    classroom_ids[i] = $(selected).val();
                });
                $('#subjectListElement :selected').each(function (i, selected) {
                    subject_ids[i] = $(selected).val();
                });
                teacher["school_id"] = $('#addEditTeacherForm #schoolListElement').find(":selected").val();
                teacher["classroom_ids"] = classroom_ids;
                teacher["subject_ids"] = subject_ids;
                $.ajax({
                    url: '/teachers/' + teacher_id,
                    type: 'PUT',
                    format: 'JSON',
                    data: {teacher: teacher},
                    success: function (data, textStatus, jqXHR) {
                        console.log(data);
                        var listingTeacher = new SM.ListingTeacher();

                    },
                    error: function (jqXHR, textStatus, errorThrown) {

                    }
                });
            }
        })
    }
}