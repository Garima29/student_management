/**
 * Created by garimadadheech on 9/28/16.
 */
SM.ShowSchoolDashboard = function (school_id) {
    this.school_data_id=school_id;
    this.initialize();
}

SM.ShowSchoolDashboard.prototype= {
    initialize:function() {
        var x=new SM.CommonDomManuplation();
        $('#schoolContainer #showSchoolForm').removeClass("hidden");
        this.populateSchoolData();
        this.handleListClassrooms();
        this.handleListTeachers();
        this.handleBackButton();
    },
    handleBackButton :function(){
        $("#back-link-go-back .back-link-title").unbind();
        $("#back-link-go-back .back-link-title").click(function(){
            var listingSchool=new SM.ListingSchool();
        });
    },
   populateSchoolData: function () {
       console.log("populatechaool");
       console.log(this.school_data_id);
       $.ajax({
           url: '/schools/'+this.school_data_id,
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
        school_id=this.school_data_id;
        $("#showSchoolForm .listClassrooms").unbind();
        $("#showSchoolForm .listClassrooms").click(function (e) {
            $('#addEditSchoolForm #school_id').val(school_id);
            var listingClassroom = new SM.ListingClassroom(school_id);
        })
    },
    handleListTeachers: function(){
        console.log("listing teachers");
        school_id=this.school_data_id;
        $("#showSchoolForm .listTeachers").unbind();
        $("#showSchoolForm .listTeachers").click(function (e) {
            $('#addEditSchoolForm #school_id').val(school_id);
            var listingTeacher = new SM.ListingTeacher(school_id);
        })
    }
}