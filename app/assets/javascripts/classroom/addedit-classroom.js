/**
 * Created by garimadadheech on 9/23/16.
 */

var SM = SM || {};

SM.AddEditClassroom = function (classroom_id) {
    console.log("header");
    console.log(classroom_id);
    console.log("header");
    this.classroom_data_id = classroom_id || "";
    if(this.classroom_data_id){
        this.update=true;
    }
    this.initialize();
}

SM.AddEditClassroom.prototype= {
    initialize:function() {
        var x=new SM.CommonDomManuplation();
        $('#addEditClassroomForm').removeClass("hidden");
        $('#addEditClassroomForm #classroomAdd').removeClass("hidden");
        $('#addEditClassroomForm #classroomUpdate').addClass("hidden");
        this.handleBackButton();
        this.clearClassroomForm();
        this.classroomFormValidate();
        this.populateSchoolList();
        this.createClassroom();
        this.populateClassroom();
        this.updateClassroom();
    },
    handleBackButton :function(){
        $("#back-link-go-back .back-link-title").unbind();
        $("#back-link-go-back .back-link-title").click(function(){
            school_id=$('#addEditSchoolForm #school_id').val();
            var listingClassroom=new SM.ListingClassroom(school_id);
        });
    },
    clearClassroomForm :function(){
        $("#addEditClassroomForm #classroom_id").val("");
        $('#addEditClassroomForm #classroomName').val("");
        $("#addEditClassroomForm #classroomNoOfStudents").val("");
    },
    classroomFormValidate :function(){
        console.log("classroomform");
        $("#addEditClassroomForm #classroomForm").validate ({
            rules: {
                classroom_name: {
                    required: true
                },
                classroom_no_of_students: {
                    required: true
                },
                school_list_element: {
                    required: true,
                    number: true
                }
            },
            messages : {
                classroom_name : {
                    required: 'classroom Name Required'
                },
                classroom_no_of_students: {
                    required: 'classroom no of students Required'
                },
                school_list_element: {
                    required: 'School Required'
                }
            }
        });
    },
    populateSchoolList : function(){
        var school_created = $('#addEditSchoolForm #school_id').val() == '' ? false :true ;
        $.ajax({
            url: '/schools/non_archive_index',
            type: 'GET',
            format: 'JSON',
            async: false,
            success: function (data, textStatus, jqXHR) {
                $('#schoolListElement').html("");
                $.each(data, function (i, school) {
                    var option_string = "<option value=" + school.id + ">" + school.name + "</option>";
                    $('#schoolListElement').append(option_string);
                });
                if(school_created) {
                    alert("school");
                   var school=$('#addEditSchoolForm #school_id').val();
                    $('#addEditClassroomForm #schoolListElement option[value = '+school+']' ).prop('selected','true');
                    $('#addEditClassroomForm #schoolListElement').prop('disabled', true);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                //alert(JSON.parse(jqXHR.responseText)["error"]);
            }
        });
    },
    createClassroom :function(){
        var self=this;
        var school_id=$('#addEditSchoolForm #school_id').val();
        $('#addEditClassroomForm #classroomAdd').unbind();
        $('#addEditClassroomForm #classroomAdd').click(function(e){
            e.preventDefault();
            if($('#addEditClassroomForm #classroomForm').valid())
            {
                var classroom={};
                classroom["name"]=$("#addEditClassroomForm  #classroomName").val();
                classroom["no_of_students"]=$("#addEditClassroomForm #classroomNoOfStudents").val();
                classroom["school_id"]=$("#addEditClassroomForm #schoolListElement").find(":selected").val();
                $.ajax({
                    url: '/classrooms',
                    type: 'POST',
                    data: {classroom:classroom},
                    format: 'JSON',
                    async: false,
                    success: function (data, textStatus, jqXHR) {
                        //window.location.assign('/classroom_dashboard/show_classroom_dashboard');
                        console.log(data);
                        $('#addEditClassroomForm #classroom_id').val(data.id);
                        var listingClassroom =new SM.ListingClassroom(school_id);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        //alert(JSON.parse(jqXHR.responseText)["error"]);
                    }
                });
            }


        });

    },
    populateClassroom :function(){
        var self = this;
        console.log(this.classroom_data_id);
        if(this.update){
            console.log("1");
            $('#addEditClassroomForm #classroomAdd').addClass("hidden");
            $('#addEditClassroomForm #classroomUpdate').removeClass("hidden");
            $.ajax({
                url: '/classrooms/'+this.classroom_data_id,
                type: 'GET',
                format: 'JSON',
                async: false,
                success: function (data, textStatus, jqXHR) {
                    console.log(data);
                    $("#addEditClassroomForm #classroom_id").val(data.id);
                    $('#addEditClassroomForm #classroomName').val((data["name"]));
                    $('#addEditClassroomForm #classroomNoOfStudents').val((data["no_of_students"]));
                    $('#addEditClassroomForm #schoolListElement option[value = '+data.school_id+']' ).prop('selected','true');
                },
                error: function (jqXHR, textStatus, errorThrown) {

                }
            });
        }

    },
    updateClassroom :function(){
        var school_id=$('#addEditSchoolForm #school_id').val();
        $('#addEditClassroomForm #classroomUpdate').unbind();
        $('#addEditClassroomForm #classroomUpdate').click(function(e){
            e.preventDefault();
            if($('#addEditClassroomForm #classroomForm').valid()) {
                var classroom = {};
                classroom["name"]=$("#addEditClassroomForm  #classroomName").val();
                classroom["no_of_students"]=$("#addEditClassroomForm #classroomNoOfStudents").val();
                classroom["school_id"]=$("#addEditClassroomForm #schoolListElement").find(":selected").val();
                classroom_id = $("#addEditClassroomForm #classroom_id").val();
                $.ajax({
                    url: '/classrooms/' + classroom_id,
                    type: 'PUT',
                    format: 'JSON',
                    data: {classroom: classroom},
                    async: false,
                    success: function (data, textStatus, jqXHR) {
                        console.log(data);
                        var listingClassroom = new SM.ListingClassroom(school_id);

                    },
                    error: function (jqXHR, textStatus, errorThrown) {

                    }
                });
            }
        })
    }
}