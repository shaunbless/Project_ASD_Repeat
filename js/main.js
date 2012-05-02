//mobile DOM loader ($) mobile method
$('#info').live('pageinit', function(){
	var rbform = $('#appform');
	var	rberrorslink = $('#rberrorslink');
	var formSave = $('#submit');
	
	// save form function
	formSave.on('click', function(){
		// form validation in jqm
		rbform.validate({
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
				var data = rbform.serializeArray();
				storeData(data);
				$.mobile.changePage($('#account'));
			} 
		}); 
	}); 
	var storeData = function (myData) {
	    localStorage.setItem('signup_data', myData);
	    alert("Your information has saved!");
	};
	
var clearLink = $('#clear');
	var data = localStorage.getItem('signup_data');
	var editLink = $('#edit');
	var clearData = function (myData) {
		localStorage.clear('signup_data');
	}; //ending clearData function
	console.log("this page is working!");
	// clearData function
	clearLink.on('click', function(){

		clearData(data);
		alert("Data has been cleared");
		$.mobile.changePage($('#account'));
	
	}); // ending clearLink function
	
	// change page to edit page
	editLink.on('click', function (){
		$.mobile.changePage($('#info'));
		data;
	});
	
});

