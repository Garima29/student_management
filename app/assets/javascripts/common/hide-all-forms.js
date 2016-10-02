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
        $('#schoolContainer #listSchools').addClass("hidden");
        $('#schoolContainer #addEditSchoolForm').addClass("hidden");
        $('#schoolContainer #addEditClassroomForm').addClass("hidden");
        $('#schoolContainer #classroomDashboard').addClass("hidden");
        $('#schoolContainer #listClassrooms').addClass("hidden");
        $('#schoolContainer #teacherDashboard').addClass("hidden");
        $('#schoolContainer #listTeachers').addClass("hidden");
        $('#schoolContainer #addEditTeacherForm').addClass("hidden");
        $('#schoolContainer #showSchoolForm').addClass("hidden");
        $('#schoolContainer #listStudents').addClass("hidden");
        $('#schoolContainer #addEditStudentForm').addClass("hidden");
    }
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
