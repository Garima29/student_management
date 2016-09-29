/**
 * Created by garimadadheech on 9/23/16.
 */
var SM = SM || {};


SM.ClassroomDashboard = function () {
    this.initialize();
}

SM.ClassroomDashboard.prototype= {
    initialize:function() {
        var x=new SM.CommonDomManuplation();
        $('#classroomDashboard').removeClass("hidden");
        console.log("classroomDashboard");
        this.showAddEditClassroomForm();
        this.listClassrooms();

    },
    showAddEditClassroomForm :function(){
        $('.addNewClassroom').unbind();
        $('.addNewClassroom').click(function(e){
            console.log("showAddEditClassroomForm");
            var addEditClassroom=new SM.AddEditClassroom();
        });
    },
    listClassrooms :function(){
        $('.listClassrooms').unbind();
        $('.listClassrooms').click(function(e){
            console.log("showAddEditSClassroomForm");
            var listingClassroom=new SM.ListingClassroom();

        });
    }
}