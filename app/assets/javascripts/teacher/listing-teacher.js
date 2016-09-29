/**
 * Created by garimadadheech on 9/24/16.
 */

var SM = SM || {};


SM.ListingTeacher = function (school_id) {
    this.school_id=school_id || "";
    console.log("school_id");
    console.log(this.school_id);
    console.log("school_id");
    this.initialize();
}

SM.ListingTeacher.prototype= {
    initialize:function() {
        var x=new SM.CommonDomManuplation();
        $('#listTeachersForm').removeClass("hidden");
        $('#addEditTeacherForm #teacher_id').val('');
        this.listTeacherElements();
        this.handleEditDeleteClick();
        this.handleAddTeacherClick();
        this.handleBackButton();
    },

    handleBackButton :function(){
        $("#back-link-go-back .back-link-title").unbind();
        $("#back-link-go-back .back-link-title").click(function(){
            var listingSchool=new SM.ListingSchool();
        });
    },
    listTeacherElements : function () {
        console.log("before ajax list call");
        this.clearOldList();
        var self = this;
        $.ajax({
            url: '/teachers/non_archive_index',
            type: 'GET',
            data: {school_id:this.school_id},
            format: 'JSON',
            success: function (data, textStatus, jqXHR) {
                console.log(data);
                $.each(data,function(i,item){
                    self.addElementToList(item);
                })

            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });
    },
    clearOldList :function(){
        $('#teacher-list').children().not('#teacher-list-template-clone').remove();
    },
    addElementToList : function(teacher){
        console.log("teacher name");
        console.log(teacher.name);
        console.log("teacher name");
        var cloned_teacher;
        cloned_teacher=$('#teacher-list-template-clone').clone(true, true);
        cloned_teacher.attr("id","teacherListTemplate-"+(teacher.id));
        cloned_teacher.attr('teacher-id', teacher.id);
        cloned_teacher.find(".span-teacher-name").html(teacher.name);
        cloned_teacher.find(".span-teacher-gender").html(teacher.gender);
        cloned_teacher.find(".span-teacher-phoneno").html(teacher.phone_no);
        cloned_teacher.find('.editTeacher').attr("data-li", "teacherListTemplate-"+(teacher.id));
        cloned_teacher.find('.deleteTeacher').attr("data-li", "teacherListTemplate-"+(teacher.id));
        cloned_teacher.find('.listTeacherClassrooms').attr("data-li", "teacherListTemplate-"+(teacher.id));
        cloned_teacher.find('.listTeacherSubjects').attr("data-li", "teacherListTemplate-"+(teacher.id));
        cloned_teacher.find(".editTeacher").attr("id","teacher-"+(teacher.id));
        cloned_teacher.find(".deleteTeacher").attr("id","teacher-"+(teacher.id));
        cloned_teacher.find(".listTeacherClassrooms").attr("id","teacher-"+(teacher.id));
        cloned_teacher.find(".listTeacherSubjects").attr("id","teacher-"+(teacher.id));
        cloned_teacher.removeClass("hidden");
        $('#teacher-list').append(cloned_teacher);
    },
    handleEditDeleteClick :function(){
        $('#teacher-list li button').unbind();
        $('#teacher-list li button').click(function(e){
            var self=this;
            console.log($(this));
            var button_type = $(this).attr("button-type");
            var parent = $("#"+$(this).attr('data-li'));
            var teacher_id = ($(parent).attr("teacher-id"));
            console.log(parent);
            console.log(button_type);
            console.log(teacher_id);
            if(button_type=="edit") {
                var addEditTeacher = new SM.AddEditTeacher(teacher_id);
            }
            if(button_type=="delete"){
                $.ajax({
                    url: '/teachers/'+teacher_id+'/archive',
                    type: 'PUT',
                    format: 'JSON',
                    async: false,
                    success: function (data, textStatus, jqXHR) {
                        parent.remove();
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        alert(JSON.parse(jqXHR.responseText)["error"]);
                    }
                });
            }
            if(button_type=="showTeacherClassrooms"){
                $('#addEditTeacherForm #teacher_id').val(teacher_id);
                console.log(teacher_id);
                console.log("showTeacherClassrooms");
                var listingClassroom = new SM.ListingClassroom();
            }
            if(button_type=="showTeacherSubjects"){
                $.ajax({
                    url: '/subjects/teacher_subjects',
                    type: 'GET',
                    format: 'JSON',
                    data: {id:teacher_id},
                    async: false,
                    success: function (data, textStatus, jqXHR) {
                        $.each(data, function (i,item) {
                            console.log(item.name);
                            parent.append(item.name+" ");
                        })
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        alert(JSON.parse(jqXHR.responseText)["error"]);
                    }
                });
            }

        })
    },
    handleAddTeacherClick :function(){
        console.log("handleAdd teacherclick");
        $('#listTeachersForm .addNewTeacher').unbind();
        $('#listTeachersForm .addNewTeacher').click(function(e){
            var addEditTeacher = new SM.AddEditTeacher();
        })
    }

}