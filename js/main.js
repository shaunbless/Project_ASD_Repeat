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
				console.log(data);
				$.mobile.changePage($('#account'));
			} 
		});
	})
}); // ending #signup page load
	
var storeData = function (myData) {
	    localStorage.setItem('signup_data', myData);
	    alert("Your information has saved!");
	};
	
// mobile Dom loader ($) for #edit page mobile method
$('#editFormPage').live('pageshow', function(){
	var formEdit = $('#editForm');
	var	errorLink = $('#errlnk');
	var sbtForm = $('#editSub');
	console.log("this works too bitch");
	// save form function
	sbtForm.on('click', function(){
		console.log("works");
		// form validation in jqm
		formEdit.validate({
			invalidHandler: function(form, validator){
				errorLink.click();
				var html = '';
				for(var key in validator.submitted){
					var label = $('label[for^="' + key +'"]').not('[generated]');
					var legend = label.closest('fieldset').find('.ui-controlgroup-label');
					var fieldname = legend.length ? legend.text() : label.text();
					html += '<li>' + fieldname + '</li>';
				}
				$("#editErr ul").html(html);
			},
			submitHandler: function(){
				var data = formEdit.serializeArray();
				storeData(data);
				console.log(data);
				$.mobile.changePage($('#account'));
			} // ending function for submitHandler
		}); // ending function for rbform.validate
	}); // ending function for formSave
	var storeData = function (myData) {
	    // setItem from signup_data
	    localStorage.setItem('signup_data', myData);
	    alert("Your information has saved!");
	}; // ending storeData function
});

$('#account').live('pageinit', function () {
	var displayLink = $('#display');
	displayLink.on('click', function(){
		for (var i = 0; i < localStorage.length; i++) {
			var data = localStorage.getItem(localStorage.key(i));
			var hot = data.value;
			var fav = data.value;
			var comments = data.value;
			var email = data.value;
			console.log(data);
			$('<div class="individual">'+
				'<ul class="inner">'+
					'<li>Hotness: '+ hot +'</li>'+
					'<li>Is this your favorite: '+ fav +'</li>'+
					'<li>Comments: '+ comments +'</li>'+
					'<li>Email: '+ email +'</li>'+
		        '</ul>'+
		        '</div>' 
	        	  
	        	).appendTo('#dataPlay');
		};
	});
});

// JSON List
$('#jsondata').bind('click', function(){
	$('#data').empty();
	$('<p>').html('JSON Data Imported').appendTo('#data');
	$.ajax({
		url: 'xhr/data.json',
		type: 'GET',
		dataType: 'json',
		success: function(answer){
        	for (var i=0, j=answer.contacts.length; i<j; i++){
				var jdata = answer.contacts[i];
				$(''+
					'<div class="datainfo">'+
						'<p>Hotness rating: '+ jdata.hot +'</p>'+
						'<p>Is this hairstyle your favorite: '+ jdata.fav +'</p>'+
						'<p>Comments: '+ jdata.comments +'</p>'+
						'<p>Email: '+ jdata.email +'</p>'+
					'</div>'
				).appendTo('#data');
				console.log(answer);
			}
		}
	});
	return false;
});

// XML List
$('#xmldata').on('click', function(){
	$('#data').empty();
	$('<p>').html('XML Data Imported').appendTo('#data');
	$.ajax({
		url: 'xhr/data.xml',
		type: 'GET',
		dataType: 'xml',
		success: function(xml){
			$(xml).find("rate").each(function(){
   				console.log($(xml).find("rate"));
   				var hot = $(this).find('hot').text();
   				var fav = $(this).find('fav').text();
   				var comments = $(this).find('comments').text();
   				var email = $(this).find('email').text();
    			$(''+
					'<div class="datainfo">'+
						'<p>Hotness rating: '+ hot +'</p>'+
						'<p>Is this hairstyle your favorite: '+ fav +'</p>'+
						'<p>Comments: '+ comments +'</p>'+
						'<p>Email: '+ email +'</p>'+
					'</div>'
				).appendTo('#data');
				console.log(xml);
			});
		}
	});
	return false;
});


//CSV List
$('#csvdata').on('click', function(){
	$('#data').empty();
	$('<p>').html('CSV Data Imported').appendTo('#data');
	 $.ajax({
        type: "GET",
        url: "xhr/data.csv",
        dataType: "text",
        success: function(data) {
        	var allInfo = data.split(/\r\n|\n/);
    		var headers = allInfo[0].split(',');
    		var info = []; 

			for (var i=1; i<allInfo.length; i++) {
				var data = allInfo[i].split(',');
				if (data.length == headers.length) {
					var forminfo = []; 

					for (var j=0; j<headers.length; j++) {
						forminfo.push(data[j]); 
					}
					info.push(forminfo); 
				}

			}

			for (var m=0; m<info.length; m++){
				var adata = info[m];
			$(''+
					'<div class="datainfo">'+
						'<p>Hotness rating: '+ adata[0] +'</p>'+
						'<p>Is this your favorite:'+ adata[1] +'</p>'+
						'<p>Comments: '+ adata[2] +'</p>'+
						'<p>Email: '+ adata[3] +'</p>'+

					'</div>'
				).appendTo('#data');
			console.log(info);	
			}
        }
	});
	return false;
});

