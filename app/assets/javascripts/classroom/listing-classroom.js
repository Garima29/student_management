/**
 * Created by garimadadheech on 9/24/16.
 */

var SM = SM || {};


SM.ListingClassroom = function () {
    this.initialize();
}

SM.ListingClassroom.prototype= {
    initialize:function() {
        var commonDomManuplation=new SM.CommonDomManuplation();
        $('#schoolContainer #listClassrooms').removeClass("hidden");
        $('#addEditClassroomForm #classroom_id').val('');
        this.handleBackButton();
        this.listClassroomElements();
        this.handleAddClassroomClick();
        this.handleBackButton();
        this.handleHomeButton();
    },
    handleBackButton :function(){
        $("#backLinkGoBack .back-link-title").unbind();
        $("#backLinkGoBack .back-link-title").click(function(){
            var teacher_created=$('#addEditTeacherForm #teacher_id').val() == ''? false : true;
            if(teacher_created){
                var listingTeacher=new SM.ListingTeacher();
            }else {
                var listingSchool = new SM.ListingSchool();
            }
        });
    },
    handleHomeButton :function(){
        $("#backLinkGoHome .back-link-title").unbind();
        $("#backLinkGoHome .back-link-title").click(function(){
            var listingSchool=new SM.ListingSchool();
        });
    },
    listClassroomElements : function () {
        console.log("before ajax list call");
        var self = this;
        var school_id = $('#addEditSchoolForm #school_id').val();
        var teacher_created=$('#addEditTeacherForm #teacher_id').val() == '' ? false : true ;
        if(teacher_created) {
            var teacher_id=$('#addEditTeacherForm #teacher_id').val();
            var table = $('#listClassrooms #classroomTable').DataTable();
            table.clear();
            $.ajax({
                url: '/classrooms/' + teacher_id + '/teacher_classrooms',
                type: 'GET',
                format: 'JSON',
                async: true,
                success: function (data, textStatus, jqXHR) {
                    console.log("listing classrooms");
                    var show_button = "<button class='row-show btn btn-info btn-sm' button-type='edit'><span>Show Students</span></button>";
                    var edit_button = "<button class='row-edit btn btn-primary btn-sm' button-type='edit'><span>Edit</span></button>";
                    var delete_button = "<button class='row-delete btn btn-danger btn-sm' button-type='delete'><span>Delete</span></button>";
                    $.each(data, function (i, item) {
                        table.row.add( $(
                            '<tr>'+
                            '<td>'+item.name+'</td>'+
                            '<td>'+item.no_of_students+'</td>'+
                            '<td classroom-id='+item.id+'>'+show_button+'</td>'+
                            '<td classroom-id='+item.id+'>'+edit_button+'</td>'+
                            '<td classroom-id='+item.id+'>'+delete_button+'</td>'+
                            '<tr>'
                        )).draw();
                    })
                    $('#listClassrooms #classroomTable').unbind('click');
                    self.handleShowClick();
                    self.handleEditClick();
                    self.handleDeleteClick();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR);
                }
            });
        }
        else {
            var table = $('#listClassrooms #classroomTable').DataTable();
            table.clear();
            $.ajax({
                url: '/classrooms/non_archive_index',
                type: 'GET',
                data: {school_id: school_id},
                format: 'JSON',
                success: function (data, textStatus, jqXHR) {
                    console.log(data);
                    var show_button = "<button class='row-show btn btn-info btn-sm' button-type='show'><span>Show students</span></button>";
                    var edit_button = "<button class='row-edit btn btn-primary btn-sm' button-type='edit'><span>Edit</span></button>";
                    var delete_button = "<button class='row-delete btn btn-danger btn-sm' button-type='delete'><span>Delete</span></button>";
                    $.each(data, function (i, item) {
                        table.row.add( $(
                            '<tr>'+
                            '<td>'+item.name+'</td>'+
                            '<td>'+item.no_of_students+'</td>'+
                            '<td classroom-id='+item.id+'>'+show_button+'</td>'+
                            '<td classroom-id='+item.id+'>'+edit_button+'</td>'+
                            '<td classroom-id='+item.id+'>'+delete_button+'</td>'+
                            '<tr>'
                        )).draw();
                    })
                    $('#listClassrooms #classroomTable').unbind('click');
                    self.handleShowClick();
                    self.handleEditClick();
                    self.handleDeleteClick();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                }
            });
        }
    },
    handleShowClick :function(){
        console.log("handelEditDeleteClick");
        $('#listClassrooms #classroomTable').on('click','.row-show',function(e){
            var self=this;
            var classroom_id = ($(this).parent().attr("classroom-id"));
            $('#addEditClassroomForm #classroom_id').val(classroom_id);
            var listingStudent=new SM.ListingStudent();
        })
    },
    handleEditClick :function(){
        console.log("handelEditDeleteClick");
        $('#listClassrooms #classroomTable').on('click','.row-edit',function(e){
            var self=this;
            var classroom_id = ($(this).parent().attr("classroom-id"));
            $('#addEditClassroomForm #classroom_id').val(classroom_id);
            var addEditClassroom = new SM.AddEditClassroom();
        })
    },
    handleDeleteClick :function(){
        console.log("handelDeleteClick");
        var self=this;
        $('#listClassrooms #classroomTable').on('click','.row-delete',function(e){
            var classroom_id = ($(this).parent().attr("classroom-id"));
            var parent = $(this).closest('tr');
            $.ajax({
                url: '/classrooms/'+classroom_id+'/archive',
                type: 'PUT',
                format: 'JSON',
                async: false,
                success: function (data, textStatus, jqXHR) {
                    console.log("deleting");
                    console.log(data);
                    console.log("deleting");
                    //parent.remove();
                    self.listClassroomElements();
                },
                error: function (jqXHR, textStatus, errorThrown) {

                }
            });
        });
    },
    handleAddClassroomClick :function(){
        $('#listClassrooms .addNewClassroom').unbind();
        $('#listClassrooms .addNewClassroom').click(function(e){
            var addEditClassroom = new SM.AddEditClassroom();
        })
    }

}