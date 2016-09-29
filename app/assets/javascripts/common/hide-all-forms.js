/**
 * Created by garimadadheech on 9/23/16.
 */
var SM = SM || {}

SM.CommonDomManuplation = function(){
    this.initialize();
}
SM.CommonDomManuplation.prototype={
    initialize :function(){
        this.hideAll();
        //this.backOnShowSchool();
        //this.backOnClassroomList();
    },
    hideAll : function () {
        $('#schoolDashboard').addClass("hidden");
        $('#addEditSchoolForm').addClass("hidden");
        $('#listSchoolsForm').addClass("hidden");
        $('#addEditClassroomForm').addClass("hidden");
        $('#classroomDashboard').addClass("hidden");
        $('#listClassroomsForm').addClass("hidden");
        $('#teacherDashboard').addClass("hidden");
        $('#listTeachersForm').addClass("hidden");
        $('#addEditTeacherForm').addClass("hidden");
        $('#showSchoolForm').addClass("hidden");
        $('#listStudentsForm').addClass("hidden");
        $('#addEditStudentForm').addClass("hidden");
    },
    //backOnShowSchool: function(){
    //    var self=this;
    //    $('#back-link-go-back').removeClass("hidden");
    //    $("#back-link-go-back").unbind();
    //    $("#back-link-go-back").click(function(){
    //        self.hideAll();
    //        $("#listSchoolsForm").removeClass('hidden');
    //    });
    //},
    //backOnClassroomList: function(){
    //    var self=this;
    //    $('#back-link-go-back').removeClass("hidden");
    //    $("#back-link-go-back").unbind();
    //    $("#back-link-go-back").click(function(){
    //        self.hideAll();
    //        $("#listSchoolsForm").removeClass('hidden');
    //    });
    //}
}
