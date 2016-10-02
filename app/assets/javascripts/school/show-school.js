/**
 * Created by garimadadheech on 9/28/16.
 */
SM.ShowSchoolDashboard = function () {
    this.initialize();
}

SM.ShowSchoolDashboard.prototype= {
    initialize:function() {
        var commonDomManuplation=new SM.CommonDomManuplation();
        $('#schoolContainer #showSchoolForm').removeClass("hidden");
        this.populateSchoolData();
        this.handleListClassrooms();
        this.handleListTeachers();
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
   populateSchoolData: function () {
       console.log("populatechaool");
       var school_id=$('#addEditSchoolForm #school_id').val();
       console.log(school_id);
       $.ajax({
           url: '/schools/'+school_id,
           type: 'GET',
           format: 'JSON',
           async: false,
           success: function (data, textStatus, jqXHR) {
               console.log(data);
               $("#showSchoolForm #school_id").val(data.id);
               $('#showSchoolForm #showSchoolName').val((data["name"])).prop("disabled","true");
               $('#showSchoolForm #showSchoolCity').val((data["city"])).prop("disabled","true");
               $('#showSchoolForm #showSchoolState').val((data["state"])).prop("disabled","true");;
               $('#showSchoolForm #showSchoolZipcode').val((data["zipcode"])).prop("disabled","true");;
               $('#showSchoolForm #showSchoolPhoneno').val(data["phone_no"]).prop("disabled","true");;
           },
           error: function (jqXHR, textStatus, errorThrown) {

           }
       });
   },

    handleListClassrooms: function(){
        console.log("listing classrooms");
        $("#showSchoolForm .listClassrooms").unbind('click');
        $("#showSchoolForm .listClassrooms").click(function (e) {
            var listingClassroom = new SM.ListingClassroom();
        })
    },
    handleListTeachers: function(){
        console.log("listing teachers");
        $("#showSchoolForm .listTeachers").unbind('click');
        $("#showSchoolForm .listTeachers").click(function (e) {
            console.log("1");
            console.log($("#showSchoolForm #school_id").val());
            var listingTeacher = new SM.ListingTeacher();
        })
    }
}