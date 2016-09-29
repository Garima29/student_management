/**
* Created by garimadadheech on 9/24/16.
*/

var SM = SM || {};

SM.TeacherDashboard = function (teacher_id) {
    this.initialize();
}

SM.TeacherDashboard .prototype= {
    initialize:function() {
        var x=new SM.CommonDomManuplation();
        $('#teacherDashboard').removeClass("hidden");
        //$('#addEditTeacherForm #teacher_id').val('');
        this.listTeachers();
    },
    listTeachers : function(){
        $('#teacherDashboard #listTeachers').unbind();
        $('#teacherDashboard #listTeachers').click(function(e){
            var listingTeacher = new SM.ListingTeacher();
        })
    }
}