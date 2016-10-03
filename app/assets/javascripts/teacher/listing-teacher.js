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
        this.handleHomeButton();
    },

    handleBackButton :function(){
        $("#backLinkGoBack .back-link-title").unbind();
        $("#backLinkGoBack .back-link-title").click(function(){
            var listingSchool=new SM.ListingSchool();
        });
    },
    handleHomeButton :function(){
        $("#backLinkGoHome .back-link-title").unbind();
        $("#backLinkGoHome .back-link-title").click(function(){
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
                var show_classrooms = "<button class='row-show-classrooms btn btn-info btn-sm' button-type='show-classrooms'><span>Show classrooms</span></button>";
                var show_subjects = "<button class='row-show-subjects btn btn-info btn-sm' button-type='show-subjects'><span>Show subjects</span></button>";
                var edit_button = "<button class='row-edit btn btn-primary btn-sm' button-type='edit'><span>Edit</span></button>";
                var delete_button = "<button class='row-delete btn btn-danger btn-sm' button-type='delete'><span>Delete</span></button>";
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
        var self=this;
        $('#listTeachers #teacherTable').on('click','.row-delete',function(e){
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
                    //parent.remove();
                    self.listTeacherElements();
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
        $('#listTeachers #teacherTable').on('click','.row-show-subjects',function(e){
            var self=this;
            var teacher_id = ($(this).parent().attr("teacher-id"));
            var parent = $(this).parent();
            $.ajax({
                url: '/subjects/teacher_subjects',
                type: 'GET',
                format: 'JSON',
                data: {id:teacher_id},
                async: false,
                success: function (data, textStatus, jqXHR) {
                    self.remove();
                    $.each(data, function (i,item) {
                        console.log(item.name);
                        parent.append(item.name+" ");
                    })
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert(JSON.parse(jqXHR.responseText)["error"]);
                }
            });
        });
    },
    handleAddTeacherClick :function(){
        console.log("handleAdd teacherclick");
        $('#listTeachers .addNewTeacher').unbind();
        $('#listTeachers .addNewTeacher').click(function(e){
            var addEditTeacher = new SM.AddEditTeacher();
        })
    }

}