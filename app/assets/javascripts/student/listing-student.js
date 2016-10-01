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
    //addElementToList : function(student){
    //    console.log("student name");
    //    console.log(student.name);
    //    console.log("student name");
    //    var cloned_student;
    //    cloned_student=$('#student-list-template-clone').clone(true, true);
    //    cloned_student.attr("id","studentListTemplate-"+(student.id));
    //    cloned_student.attr('student-id', student.id);
    //    cloned_student.find(".span-student-name").html(student.name);
    //    cloned_student.find(".span-student-father-name").html(student.father_name);
    //    cloned_student.find(".span-student-mother-name").html(student.mother_name);
    //    cloned_student.find(".span-student-phoneno").html(student.phone_no);
    //    cloned_student.find(".span-student-city").html(student.city);
    //    cloned_student.find(".span-student-state").html(student.state);
    //    cloned_student.find('.editStudent').attr("data-li", "studentListTemplate-"+(student.id));
    //    cloned_student.find('.deleteStudent').attr("data-li", "studentListTemplate-"+(student.id));
    //    cloned_student.find(".editStudent").attr("id","student-"+(student.id));
    //    cloned_student.find(".deleteStudent").attr("id","student-"+(student.id));
    //    cloned_student.removeClass("hidden");
    //    $('#student-list').append(cloned_student);
    //},
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
    //handleEditDeleteClick :function(){
    //    $('#student-list li button').unbind();
    //    $('#student-list li button').click(function(e){
    //        var self=this;
    //        console.log($(this));
    //        var button_type = $(this).attr("button-type");
    //        var parent = $("#"+$(this).attr('data-li'));
    //        var student_id = ($(parent).attr("student-id"));
    //        console.log(button_type);
    //        if(button_type=="edit") {
    //            var addEditStudent = new SM.AddEditStudent(student_id);
    //        }
    //        if(button_type=="delete"){
    //            $.ajax({
    //                url: '/students/'+student_id+'/archive',
    //                type: 'PUT',
    //                format: 'JSON',
    //                async: false,
    //                success: function (data, textStatus, jqXHR) {
    //                    alert("student is deleted successfully!!!");
    //                    parent.remove();
    //                },
    //                error: function (jqXHR, textStatus, errorThrown) {
    //                    alert(JSON.parse(jqXHR.responseText)["error"]);
    //                }
    //            });
    //        }
    //        if(button_type=="showStudentClassrooms"){
    //            $('#addEditstudentForm #student_id').val(student_id);
    //            console.log(student_id);
    //            console.log("showstudentClassrooms");
    //            var listingClassroom = new SM.ListingClassroom();
    //        }
    //
    //    })
    //},
    handleAddStudentClick :function(){
        console.log("handleAdd studentclick");
        $('#listStudents .addNewStudent').unbind();
        $('#listStudents .addNewStudent').click(function(e){
            var addEditStudent = new SM.AddEditStudent();
        })
    }

}