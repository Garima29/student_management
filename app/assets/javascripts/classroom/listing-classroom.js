/**
 * Created by garimadadheech on 9/24/16.
 */

var SM = SM || {};


SM.ListingClassroom = function (school_id) {
    this.school_id=school_id || "";
    console.log("school_id");
    console.log(this.school_id);
    console.log("school_id");
    this.initialize();
}

SM.ListingClassroom.prototype= {
    initialize:function() {
        var x=new SM.CommonDomManuplation();
        $('#listClassroomsForm').removeClass("hidden");
        //$('#addEditClassroomForm #classroom_id').val('');
        this.handleBackButton();
        this.listClassroomElements();
        this.handleEditDeleteClick();
        this.handleAddClassroomClick();
        this.handleBackButton();
    },
    handleBackButton :function(){
        $("#back-link-go-back .back-link-title").unbind();
        $("#back-link-go-back .back-link-title").click(function(){
            teacher_id=$('#addEditTeacherForm #teacher_id').val();
            school_id=$('#addEditSchoolForm #school_id').val();
            teacher_data_id=teacher_id || "";
            if(teacher_id){
                var listingTeacher=new SM.ListingTeacher(school_id);
            }else {
                var listingSchool = new SM.ListingSchool();
            }
        });
    },
    listClassroomElements : function () {
        console.log("before ajax list call");
        this.clearOldList();
        //school_id = $('#addEditSchoolForm #school_id').val();
        var self = this;
        teacher_created=$('#addEditTeacherForm #teacher_id').val() == '' ? false :true ;
        if(teacher_created) {
            teacher_id=$('#addEditTeacherForm #teacher_id').val();
            $.ajax({
                url: '/classrooms/' + teacher_id + '/teacher_classrooms',
                type: 'GET',
                format: 'JSON',
                async: false,
                success: function (data, textStatus, jqXHR) {
                    console.log("listing classrooms");
                    $.each(data, function (i, item) {
                        self.addElementToList(item);
                    })
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR);
                }
            });
        }
        else {
            $.ajax({
                url: '/classrooms/non_archive_index',
                type: 'GET',
                data: {school_id: this.school_id},
                format: 'JSON',
                success: function (data, textStatus, jqXHR) {
                    console.log(data);
                    $.each(data, function (i, item) {
                        self.addElementToList(item);
                    })

                },
                error: function (jqXHR, textStatus, errorThrown) {

                }
            });
        }
    },
    clearOldList :function(){
        $('#classroom-list').children().not('#classroom-list-template-clone').remove();
    },
    addElementToList : function(classroom){
        console.log("classroom.no_of_students");
        console.log(classroom.no_of_students);
        console.log("classroom.no_of_students");
        var cloned_classroom;
        cloned_classroom=$('#classroom-list-template-clone').clone(true, true);
        cloned_classroom.attr("id","classroomListTemplate-"+(classroom.id));
        cloned_classroom.attr('classroom-id', classroom.id);
        cloned_classroom.find(".span-classroom-name").html(classroom.name);
        cloned_classroom.find(".span-classroom-students").html(classroom.no_of_students);
        cloned_classroom.find('.editClassroom').attr("data-li", "classroomListTemplate-"+(classroom.id));
        cloned_classroom.find('.deleteClassroom').attr("data-li", "classroomListTemplate-"+(classroom.id));
        cloned_classroom.find('.listTeacherStudents').attr("data-li", "classroomListTemplate-"+(classroom.id));
        cloned_classroom.find(".editClassroom").attr("id","classroom-"+(classroom.id));
        cloned_classroom.find(".deleteClassroom").attr("id","classroom-"+(classroom.id));
        cloned_classroom.find(".listTeacherStudents").attr("id","classroom-"+(classroom.id));
        cloned_classroom.removeClass("hidden");
        $('#classroom-list').append(cloned_classroom);
    },
    handleEditDeleteClick :function(){
        $('#classroom-list li button').unbind();
        $('#classroom-list li button').click(function(e){
            var self=this;
            console.log($(this));
            var button_type = $(this).attr("button-type");
            var parent = $("#"+$(this).attr('data-li'));
            var classroom_id = ($(parent).attr("classroom-id"));
            console.log(button_type);
            if(button_type=="edit") {
                var addEditClassroom = new SM.AddEditClassroom(classroom_id);
            }
            if(button_type=="delete"){
                $.ajax({
                    url: '/classrooms/'+classroom_id+'/archive',
                    type: 'PUT',
                    format: 'JSON',
                    async: false,
                    success: function (data, textStatus, jqXHR) {
                        console.log("deleting");
                        console.log(data);
                        console.log("deleting");
                        parent.remove();
                    },
                    error: function (jqXHR, textStatus, errorThrown) {

                    }
                });
            }
            if(button_type=="showStudents"){
                $('#addEditClassroomForm #classroom_id').val(classroom_id);
                var listingStudent=new SM.ListingStudent();
            }

        })
    },
    handleAddClassroomClick :function(){
        $('#listClassroomsForm .addNewClassroom').unbind();
        $('#listClassroomsForm .addNewClassroom').click(function(e){
            var addEditClassroom = new SM.AddEditClassroom();
        })
    }

}