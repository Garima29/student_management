/**
 * Created by garimadadheech on 9/24/16.
 */

var SM = SM || {};


SM.ListingStudent = function () {
    this.initialize();
}

SM.ListingStudent.prototype= {
    initialize:function() {
        var commonDomManuplation=new SM.CommonDomManuplation();
        $('#schoolContainer #listStudents').removeClass("hidden");
        $('#addEditStudentForm #student_id').val('');
        this.listStudentElements();
        this.handleAddStudentClick();
        this.handleBackButton();
    },
    handleBackButton :function(){
        $("#back-link-go-back .back-link-title").unbind();
        $("#back-link-go-back .back-link-title").click(function(){
            var listingClassroom=new SM.ListingClassroom();
        });
    },

    listStudentElements : function () {
        console.log("before ajax list call");
        var self = this;
        var classroom_id=$('#addEditClassroomForm #classroom_id').val();
        var table = $('#listStudents #studentTable').DataTable();
        table.clear();
        $.ajax({
            url: '/students/'+classroom_id+'/classroom_students',
            type: 'GET',
            format: 'JSON',
            data: {id:classroom_id},
            success: function (data, textStatus, jqXHR) {
                console.log(data);
                var edit_button = "<button class='row-edit' button-type='edit'><span class='label label-pill blue'>Edit</span></button>";
                var delete_button = "<button class='row-delete' button-type='delete'><span class='label label-pill blue'>Delete</span></button>";
                $.each(data, function (i, item) {
                    console.log("+");
                    table.row.add( $(
                        '<tr>'+
                        '<td>'+item.name+'</td>'+
                        '<td>'+item.father_name+'</td>'+
                        '<td>'+item.mother_name+'</td>'+
                        '<td>'+item.city+'</td>'+
                        '<td>'+item.state+'</td>'+
                        '<td>'+item.phone_no+'</td>'+
                        '<td student-id='+item.id+'>'+edit_button+'</td>'+
                        '<td student-id='+item.id+'>'+delete_button+'</td>'+
                        '<tr>'
                    )).draw();
                })
                $('#listStudents #studentTable').unbind('click');
                self.handleEditClick();
                self.handleDeleteClick();
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });
    },
    handleEditClick :function(){
        console.log("handelEditDeleteClick");
        $('#listStudents #studentTable').on('click','.row-edit',function(e){
            var self=this;
            var student_id = ($(this).parent().attr("student-id"));
            $('#addEditStudentForm #student_id').val(student_id);
            var addEditStudent = new SM.AddEditStudent();
        })
    },
    handleDeleteClick :function(){
        console.log("handelDeleteClick");
        $('#listStudents #studentTable').on('click','.row-delete',function(e){
            var self=this;
            var student_id = ($(this).parent().attr("student-id"));
            var parent = $(this).closest('tr');
            $.ajax({
                url: '/students/'+student_id+'/archive',
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
    handleAddStudentClick :function(){
        console.log("handleAdd studentclick");
        $('#listStudents .addNewStudent').unbind();
        $('#listStudents .addNewStudent').click(function(e){
            var addEditStudent = new SM.AddEditStudent();
        })
    }

}