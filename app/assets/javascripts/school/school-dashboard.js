/**
 * Created by garimadadheech on 9/24/16.
 */

var SM = SM || {};

SM.SchoolDashboard = function (school_id) {
    this.initialize();
}

SM.SchoolDashboard .prototype= {
    initialize:function() {
        var x=new SM.CommonDomManuplation();
        $('#schoolDashboard').removeClass("hidden");
        $('#addEditStudentForm #student_id').val('');
        this.listSchools();
    },
    listSchools : function(){
        $('#schoolDashboard #listSchools').unbind();
        $('#schoolDashboard #listSchools').click(function(e){
            var listingSchool = new SM.ListingSchool();
        })
    }
}