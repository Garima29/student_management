/**
 * Created by garimadadheech on 9/24/16.
 */

var SM = SM || {};


SM.ListingStudent = function (school_id) {
    this.school_id=school_id || "";
    console.log("school_id");
    console.log(this.school_id);
    console.log("school_id");
    this.initialize();
}

SM.ListingStudent.prototype= {
    initialize:function() {
        var x=new SM.CommonDomManuplation();
        $('#listStudentsForm').removeClass("hidden");
        $('#addEditStudentForm #student_id').val('');
        this.listStudentElements();
        this.handleEditDeleteClick();
        this.handleAddStudentClick();
        this.handleBackButton();
    },
    handleBackButton :function(){
        $("#back-link-go-back .back-link-title").unbind();
        $("#back-link-go-back .back-link-title").click(function(){
            school_id=$('#addEditSchoolForm #school_id').val();
            var listingClassroom=new SM.ListingClassroom(school_id);
        });
    },

    listStudentElements : function () {
        console.log("before ajax list call");
        this.clearOldList();

        var self = this;
        classroom_created=$('#addEditClassroomForm #classroom_id').val() == '' ? false :true ;
        classroom_id=$('#addEditClassroomForm #classroom_id').val();
        $.ajax({
            url: '/students/'+classroom_id+'/classroom_students',
            type: 'GET',
            format: 'JSON',
            data: {id:classroom_id},
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
        $('#student-list').children().not('#student-list-template-clone').remove();
    },
    addElementToList : function(student){
        console.log("student name");
        console.log(student.name);
        console.log("student name");
        var cloned_student;
        cloned_student=$('#student-list-template-clone').clone(true, true);
        cloned_student.attr("id","studentListTemplate-"+(student.id));
        cloned_student.attr('student-id', student.id);
        cloned_student.find(".span-student-name").html(student.name);
        cloned_student.find(".span-student-father-name").html(student.father_name);
        cloned_student.find(".span-student-mother-name").html(student.mother_name);
        cloned_student.find(".span-student-phoneno").html(student.phone_no);
        cloned_student.find(".span-student-city").html(student.city);
        cloned_student.find(".span-student-state").html(student.state);
        cloned_student.find('.editStudent').attr("data-li", "studentListTemplate-"+(student.id));
        cloned_student.find('.deleteStudent').attr("data-li", "studentListTemplate-"+(student.id));
        cloned_student.find(".editStudent").attr("id","student-"+(student.id));
        cloned_student.find(".deleteStudent").attr("id","student-"+(student.id));
        cloned_student.removeClass("hidden");
        $('#student-list').append(cloned_student);
    },
    handleEditDeleteClick :function(){
        $('#student-list li button').unbind();
        $('#student-list li button').click(function(e){
            var self=this;
            console.log($(this));
            var button_type = $(this).attr("button-type");
            var parent = $("#"+$(this).attr('data-li'));
            var student_id = ($(parent).attr("student-id"));
            console.log(button_type);
            if(button_type=="edit") {
                var addEditStudent = new SM.AddEditStudent(student_id);
            }
            if(button_type=="delete"){
                $.ajax({
                    url: '/students/'+student_id+'/archive',
                    type: 'PUT',
                    format: 'JSON',
                    async: false,
                    success: function (data, textStatus, jqXHR) {
                        alert("student is deleted successfully!!!");
                        parent.remove();
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        alert(JSON.parse(jqXHR.responseText)["error"]);
                    }
                });
            }
            if(button_type=="showStudentClassrooms"){
                $('#addEditstudentForm #student_id').val(student_id);
                console.log(student_id);
                console.log("showstudentClassrooms");
                var listingClassroom = new SM.ListingClassroom();
            }

        })
    },
    handleAddStudentClick :function(){
        console.log("handleAdd studentclick");
        $('#listStudentsForm .addNewStudent').unbind();
        $('#listStudentsForm .addNewStudent').click(function(e){
            var addEditStudent = new SM.AddEditStudent();
        })
    }

}