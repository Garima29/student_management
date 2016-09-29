/**
 * Created by garimadadheech on 9/23/16.
 */

var SM = SM || {};


SM.ListingSchool = function () {
    this.initialize();
}

SM.ListingSchool.prototype= {
    initialize:function() {
        var x=new SM.CommonDomManuplation();
        $('#listSchoolsForm').removeClass("hidden");
        $('#addEditSchoolForm #school_id').val('');
        this.listSchoolElements();
        this.handleEditDeleteClick();
        this.handleAddSchoolClick();
    },

    listSchoolElements : function () {
        this.clearOldList();
        var self = this;
        $.ajax({
            url: '/schools/non_archive_index',
            type: 'GET',
            format: 'JSON',
            success: function (data, textStatus, jqXHR) {
                //console.log(data);
                $.each(data,function(i,item){
                    self.addElementToList(item);
                })

            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });
    },
    clearOldList :function(){
        $('#school-list').children().not('#school-list-template-clone').remove();
    },
    addElementToList : function(school){
        var cloned_school;
        cloned_school=$('#school-list-template-clone').clone(true, true);
        cloned_school.attr("id","schoolListTemplate-"+(school.id));
        cloned_school.attr('school-id', school.id);
        cloned_school.find(".span-school-name").html(school.name);
        cloned_school.find(".span-school-city").html(school.city);
        cloned_school.find(".span-school-state").html(school.state);
        cloned_school.find(".span-school-zipcode").html(school.zipcode);
        cloned_school.find(".span-school-phoneno").html(school.phone_no);
        cloned_school.find('.showSchool').attr("data-li", "schoolListTemplate-"+(school.id));
        cloned_school.find('.editSchool').attr("data-li", "schoolListTemplate-"+(school.id));
        cloned_school.find('.deleteSchool').attr("data-li", "schoolListTemplate-"+(school.id));
        cloned_school.find(".editSchool").attr("id","school-"+(school.id));
        cloned_school.find(".deleteSchool").attr("id","school-"+(school.id));
        cloned_school.find(".showSchool").attr("id","school-"+(school.id));
        cloned_school.removeClass("hidden");
        $('#school-list').append(cloned_school);
    },
    handleEditDeleteClick :function(){
        $('#school-list li button').click(function(e){
            var self=this;
            console.log($(this));
            var button_type = $(this).attr("button-type");
            var parent = $("#"+$(this).attr('data-li'));
            var school_id = ($(parent).attr("school-id"));
            console.log(parent);
            console.log("school id in handle");
            console.log(school_id);
            console.log("school id in handle");
            console.log(button_type);
            if(button_type=="edit") {

                var addEditSchool = new SM.AddEditSchool(school_id);
            }
            if(button_type=="delete"){
                $.ajax({
                    url: '/schools/'+school_id+'/archive',
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
            }
            if(button_type=="show"){
                $.ajax({
                    url: '/schools/'+school_id,
                    type: 'GET',
                    format: 'JSON',
                    async: false,
                    success: function (data, textStatus, jqXHR) {
                        var showSchoolDashboard=new SM.ShowSchoolDashboard(school_id);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {

                    }
                });
            }

        })
    },
    handleAddSchoolClick :function(){
        $('#listSchoolsForm .addNewSchool').unbind();
        $('#listSchoolsForm .addNewSchool').click(function(e){
            var addEditSchool = new SM.AddEditSchool();
        })
    }


}