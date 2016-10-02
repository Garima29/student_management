/**
 * Created by garimadadheech on 9/24/16.
 */

var SM = SM || {};


SM.ListingTeacher = function () {
    this.initialize();
}

SM.ListingTeacher.prototype= {
    initialize:function() {
        var x=new SM.CommonDomManuplation();
        $('#schoolContainer #listTeachers').removeClass("hidden");
        $('#addEditTeacherForm #teacher_id').val('');
        this.listTeacherElements();
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
        var school_id=$('#addEditSchoolForm #school_id').val();
        console.log("2");
        console.log(school_id);
        console.log("2");
        var table = $('#listTeachers #teacherTable').DataTable();
        table.clear();
        var self = this;
        $.ajax({
            url: '/teachers/non_archive_index',
            type: 'GET',
            data: {school_id:school_id},
            format: 'JSON',
            success: function (data, textStatus, jqXHR) {
                console.log(data);
                var show_classrooms = "<button class='row-show-classrooms' button-type='show-classrooms'><span class='label label-pill blue'>Show classrooms</span></button>";
                var show_subjects = "<button class='row-show-subjects' button-type='show-subjects'><span class='label label-pill blue'>Show subjects</span></button>";
                var edit_button = "<button class='row-edit' button-type='edit'><span class='label label-pill blue'>Edit</span></button>";
                var delete_button = "<button class='row-delete' button-type='delete'><span class='label label-pill blue'>Delete</span></button>";
                $.each(data, function (i, item) {
                    console.log(item.name);
                    console.log("+");
                    table.row.add( $(
                        '<tr>'+
                        '<td>'+item.name+'</td>'+
                        '<td>'+item.gender+'</td>'+
                        '<td>'+item.phone_no+'</td>'+
                        '<td teacher-id='+item.id+'>'+show_classrooms+'</td>'+
                        '<td teacher-id='+item.id+'>'+show_subjects+'</td>'+
                        '<td teacher-id='+item.id+'>'+edit_button+'</td>'+
                        '<td teacher-id='+item.id+'>'+delete_button+'</td>'+
                        '<tr>'
                    )).draw();
                })
                $('#listTeachers #teacherTable').unbind('click');
                self.handleTeacherClassrooms();
                self.handleTeacherSubjects();
                self.handleEditClick();
                self.handleDeleteClick();            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });
    },
    //addElementToList : function(teacher){
    //    console.log("teacher name");
    //    console.log(teacher.name);
    //    console.log("teacher name");
    //    var cloned_teacher;
    //    cloned_teacher=$('#teacher-list-template-clone').clone(true, true);
    //    cloned_teacher.attr("id","teacherListTemplate-"+(teacher.id));
    //    cloned_teacher.attr('teacher-id', teacher.id);
    //    cloned_teacher.find(".span-teacher-name").html(teacher.name);
    //    cloned_teacher.find(".span-teacher-gender").html(teacher.gender);
    //    cloned_teacher.find(".span-teacher-phoneno").html(teacher.phone_no);
    //    cloned_teacher.find('.editTeacher').attr("data-li", "teacherListTemplate-"+(teacher.id));
    //    cloned_teacher.find('.deleteTeacher').attr("data-li", "teacherListTemplate-"+(teacher.id));
    //    cloned_teacher.find('.listTeacherClassrooms').attr("data-li", "teacherListTemplate-"+(teacher.id));
    //    cloned_teacher.find('.listTeacherSubjects').attr("data-li", "teacherListTemplate-"+(teacher.id));
    //    cloned_teacher.find(".editTeacher").attr("id","teacher-"+(teacher.id));
    //    cloned_teacher.find(".deleteTeacher").attr("id","teacher-"+(teacher.id));
    //    cloned_teacher.find(".listTeacherClassrooms").attr("id","teacher-"+(teacher.id));
    //    cloned_teacher.find(".listTeacherSubjects").attr("id","teacher-"+(teacher.id));
    //    cloned_teacher.removeClass("hidden");
    //    $('#teacher-list').append(cloned_teacher);
    //},
    handleEditClick :function(){
        console.log("handelEditDeleteClick");
        $('#listTeachers #teacherTable').on('click','.row-edit',function(e){
            var self=this;
            var teacher_id = ($(this).parent().attr("teacher-id"));
            console.log("edit");
            console.log(teacher_id);
            console.log("edit");
            $('#addEditTeacherForm #teacher_id').val(teacher_id);
            var addEditTeacher = new SM.AddEditTeacher();
        })
    },
    handleDeleteClick :function(){
        console.log("handelDeleteClick");
        $('#listTeachers #teacherTable').on('click','.row-delete',function(e){
            var self=this;
            var teacher_id = ($(this).parent().attr("teacher-id"));
            var parent = $(this).closest('tr');
            $.ajax({
                url: '/teachers/'+teacher_id+'/archive',
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
        });
    },
    handleTeacherClassrooms :function(){
        $('#listTeachers #teacherTable').on('click','.row-show-classrooms',function(e){
            var teacher_id = ($(this).parent().attr("teacher-id"));
            $('#addEditTeacherForm #teacher_id').val(teacher_id);
            var listingClassroom = new SM.ListingClassroom();
        });
    },
    handleTeacherSubjects :function(){
        //$('#listTeachers #teacherTable').on('click','.row-show-subjects',function(e){
        //    var teacher_id = ($(this).parent().attr("teacher-id"));
        //    $.ajax({
        //        url: '/subjects/teacher_subjects',
        //        type: 'GET',
        //        format: 'JSON',
        //        data: {id:teacher_id},
        //        async: false,
        //        success: function (data, textStatus, jqXHR) {
        //            $.each(data, function (i,item) {
        //                console.log(item.name);
        //                parent.append(item.name+" ");
        //            })
        //        },
        //        error: function (jqXHR, textStatus, errorThrown) {
        //            alert(JSON.parse(jqXHR.responseText)["error"]);
        //        }
        //    });
        //});
    },
    handleAddTeacherClick :function(){
        console.log("handleAdd teacherclick");
        $('#listTeachers .addNewTeacher').unbind();
        $('#listTeachers .addNewTeacher').click(function(e){
            var addEditTeacher = new SM.AddEditTeacher();
        })
    }

}