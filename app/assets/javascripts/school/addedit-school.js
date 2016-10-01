/**
 * Created by garimadadheech on 9/23/16.
 */

var SM = SM || {};

SM.AddEditSchool = function () {
    this.initialize();
}

SM.AddEditSchool.prototype= {
    initialize:function() {
        var commonDomManuplation=new SM.CommonDomManuplation();
        $('#addEditSchoolForm').removeClass("hidden");
        $('#addEditSchoolForm #schoolAdd').removeClass("hidden");
        $('#addEditSchoolForm #schoolUpdate').addClass("hidden");
        this.handleBackButton();
        this.clearClassroomForm();
        this.schoolFormValidate();
        this.createSchool();
        this.populateSchool();
        this.updateSchool();
    },
    handleBackButton :function(){
        $("#back-link-go-back .back-link-title").unbind();
        $("#back-link-go-back .back-link-title").click(function(){
            var listingSchool=new SM.ListingSchool();
        });
    },
    clearClassroomForm :function(){
        $('#addEditSchoolForm #schoolName').val("");
        $('#addEditSchoolForm #schoolCity').val("");
        $('#addEditSchoolForm #schoolState').val("");
        $('#addEditSchoolForm #schoolZipcode').val("");
        $('#addEditSchoolForm #schoolPhoneno').val("");
    },
    schoolFormValidate :function(){
        console.log("schoolform");
       $("#addEditSchoolForm #schoolForm").validate ({
           rules: {
                    school_name: {
                        required: true
                    },
                    school_city: {
                        required: true
                    },
                    school_state: {
                        required: true
                    },
                    school_zipcode: {
                        required: true,
                        number: true
                    },
                    school_phone_no: {
                        required: true,
                        minlength: 10,
                        number: true
                    }
                },
                messages : {
                    school_name : {
                        required: 'School Name Required'
                    },
                    school_city: {
                        required: 'School city Required'
                    },
                    school_state: {
                        required: 'School state Required'
                    },
                    school_zipcode: {
                        required: 'School zipcode Required'
                    },
                    school_phoneno: {
                        required: "School phone no Required"
                    }
                }
            });
    },
    createSchool :function(){
        var self=this;
        $('#addEditSchoolForm #schoolAdd').unbind();
        $('#addEditSchoolForm #schoolAdd').click(function(e){
            e.preventDefault();
            if($('#addEditSchoolForm #schoolForm').valid())
            {
                var school={};
                school["name"]=$("#addEditSchoolForm  #schoolName").val();
                school["city"]=$("#addEditSchoolForm #schoolCity").val();
                school["state"]=$("#addEditSchoolForm #schoolState").val();
                school["zipcode"]=$("#addEditSchoolForm #schoolZipcode").val();
                school["phone_no"]=$("#addEditSchoolForm #schoolPhoneno").val();
                $.ajax({
                    url: '/schools',
                    type: 'POST',
                    data: {school:school},
                    format: 'JSON',
                    async: false,
                    success: function (data, textStatus, jqXHR) {
                        //window.location.assign('/classroom_dashboard/show_classroom_dashboard');
                        console.log(data);
                        $('#addEditSchoolForm #school_id').val(data.id);
                        var addEditClassroom=new SM.AddEditClassroom();
                       //var classroomDashboard =new SM.ClassroomDashboard();
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        //alert(JSON.parse(jqXHR.responseText)["error"]);
                    }
                });
            }


        });

    },
    populateSchool :function(){
        var self = this;
        var school_created=$('#addEditSchoolForm #school_id').val() == "" ? false :true;
        if(school_created){
            console.log("Populating school");
            var school_id=$('#addEditSchoolForm #school_id').val();
            $('#addEditSchoolForm #schoolAdd').addClass("hidden");
            $('#addEditSchoolForm #schoolUpdate').removeClass("hidden");
            $.ajax({
                url: '/schools/'+school_id,
                   type: 'GET',
                   format: 'JSON',
                   async: false,
                   success: function (data, textStatus, jqXHR) {
                        console.log(data);
                       $("#addEditSchoolForm #school_id").val(data.id);
                       $('#addEditSchoolForm #schoolName').val((data["name"]));
                       $('#addEditSchoolForm #schoolCity').val((data["city"]));
                       $('#addEditSchoolForm #schoolState').val((data["state"]));
                       $('#addEditSchoolForm #schoolZipcode').val((data["zipcode"]));
                       $('#addEditSchoolForm #schoolPhoneno').val((data["phone_no"]));
                   },
                   error: function (jqXHR, textStatus, errorThrown) {

                   }
            });
        }

    },
    updateSchool :function(){
        $('#addEditSchoolForm #schoolUpdate').unbind();
        $('#addEditSchoolForm #schoolUpdate').click(function(e){
            e.preventDefault();
            if($('#addEditSchoolForm #schoolForm').valid()) {
                var school = {};
                school["name"] = $("#addEditSchoolForm  #schoolName").val();
                school["city"] = $("#addEditSchoolForm #schoolCity").val();
                school["state"] = $("#addEditSchoolForm #schoolState").val();
                school["zipcode"] = $("#addEditSchoolForm #schoolZipcode").val();
                school["phone_no"] = $("#addEditSchoolForm #schoolPhoneno").val();
                var school_id = $("#addEditSchoolForm #school_id").val();
                $.ajax({
                    url: '/schools/' + school_id,
                    type: 'PUT',
                    format: 'JSON',
                    data: {school: school},
                    async: false,
                    success: function (data, textStatus, jqXHR) {
                        console.log(data);
                        var listingSchool = new SM.ListingSchool();

                    },
                    error: function (jqXHR, textStatus, errorThrown) {

                    }
                });
            }
        })
    }
}