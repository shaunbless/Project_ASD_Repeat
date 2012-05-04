//mobile DOM loader ($) for #rate page mobile method
$('#rate').live('pageinit', function () {
	var rateForm = $('#rateForm');
	var	rberrorslink = $('#rberrorslink');
	var formSave = $('#submit');
	var d = new Date();
	var key = (d.getTime());
	
	console.log("hi");
	// save form function
	formSave.on('click', function(){
		// form validation in jqm
		rateForm.validate({
			invalidHandler: function(form, validator){
				rberrorslink.click();
				var html = '';
				for(var key in validator.submitted){
					var label = $('label[for^="' + key +'"]').not('[generated]');
					var legend = label.closest('fieldset').find('.ui-controlgroup-label');
					var fieldname = legend.length ? legend.text() : label.text();
					html += '<li>' + fieldname + '</li>';
				}
				$("#signuperrors ul").html(html);
			},
			submitHandler: function(){
				var data = rateForm.serializeArray();
				storeData(data);
				$.mobile.changePage($('#account'));
			} 
		});
	})
}); // ending #signup page load
	
var storeData = function (myData) {
	    localStorage.setItem('signup_data', myData);
	    alert("Your information has saved!");
	};


