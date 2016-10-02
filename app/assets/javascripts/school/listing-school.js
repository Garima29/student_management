/**
 * Created by garimadadheech on 9/23/16.
 */

var SM = SM || {};


SM.ListingSchool = function () {
	this.initialize();
}

SM.ListingSchool.prototype= {
	initialize:function() {
		var commonDomManuplation=new SM.CommonDomManuplation();
		$('#schoolContainer #listSchools').removeClass("hidden");
		$('#addEditSchoolForm #school_id').val('');
		this.listSchoolElements();
		this.handleAddSchoolClick();
	},

	listSchoolElements : function () {
		var self = this;
		var table = $('#listSchools #schoolTable').DataTable();
		table.clear();
		$.ajax({
			url: '/schools/non_archive_index',
			type: 'GET',
			format: 'JSON',
			success: function (data, textStatus, jqXHR) {
				//console.log(data);
                var show_school = "<button class='row-show btn btn-primary btn-sm' button-type='edit'><span class='label label-pill blue'>Show</span></button>";
				var edit_school = "<button class='row-edit btn btn-primary btn-sm' button-type='edit'><span class='label label-pill blue'>Edit</span></button>";
				var delete_school = "<button class='row-delete btn btn-danger btn-sm' button-type='delete'><span class='label label-pill blue'>Delete</span></button>";
				$.each(data,function(i,item){
					table.row.add( $(
						'<tr>'+
						'<td>'+item.name+'</td>'+
						'<td>'+item.city+'</td>'+
						'<td>'+item.state+'</td>'+
						'<td>'+item.zipcode+'</td>'+
						'<td>'+item.phone_no+'</td>'+
                        '<td school-id='+item.id+'>'+show_school+'</td>'+
						'<td school-id='+item.id+'>'+edit_school+'</td>'+
						'<td school-id='+item.id+'>'+delete_school+'</td>'+
						'<tr>'
					)).draw();
				})
				$('#listSchools #schoolTable').unbind('click');
				self.handleShowClick();
				self.handleEditClick();
				self.handleDeleteClick();

			},
			error: function (jqXHR, textStatus, errorThrown) {

			}
		});
	},
    handleShowClick :function(){
        $('#listSchools #schoolTable').on('click','.row-show',function(e){
            var school_id = ($(this).parent().attr("school-id"));
            $('#addEditSchoolForm #school_id').val(school_id);
            console.log(school_id);
            $.ajax({
                url: '/schools/'+school_id,
                type: 'GET',
                format: 'JSON',
                async: false,
                success: function (data, textStatus, jqXHR) {
                    var showSchoolDashboard=new SM.ShowSchoolDashboard();
                },
                error: function (jqXHR, textStatus, errorThrown) {

                }
            });
        });
    },
	handleEditClick :function(){
		console.log("handelEditDeleteClick");

		$('#listSchools #schoolTable').on('click','.row-edit',function(e){
			var self=this;
			var school_id = ($(this).parent().attr("school-id"));
            console.log(school_id);
            $('#addEditSchoolForm #school_id').val(school_id);
			var addEditSchool = new SM.AddEditSchool();
		})
	},
	handleDeleteClick :function(){
		console.log("handelDeleteClick");
		$('#listSchools #schoolTable').on('click','.row-delete',function(e){
			var self=this;
			var school_id = ($(this).parent().attr("school-id"));
			var parent = $(this).closest('tr');
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
		});
	},

	handleAddSchoolClick :function(){
		$('#listSchools .addNewSchool').unbind();
		$('#listSchools .addNewSchool').click(function(e){
			var addEditSchool = new SM.AddEditSchool();
		})
	}
}