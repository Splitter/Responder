

(function($){    

	$(document).ready(function() {

		//Cufon Replacement
		Cufon.replace('h1:not(.no_cufon),h2:not(.no_cufon),h3:not(.no_cufon),h4:not(.no_cufon),h5:not(.no_cufon),h6:not(.no_cufon)',{hover:true}); 
		//Refresh Cufon apon browser resize
		$.svResponder(function(){
			Cufon.replace('h1:not(.no_cufon),h2:not(.no_cufon),h3:not(.no_cufon),h4:not(.no_cufon),h5:not(.no_cufon),h6:not(.no_cufon)',{hover:true}); 
		},20);


		//Sliding Dropdown Menu
		$("#header ul li").svDropdownMenu();


		//expanding 'more' links
		var opts={
				changes:{'padding-right':'45px'},
				speed:200
			};
		$('div.more a').svAnimateHover(opts);



		$('select.dropdown').svSelectReplace();


		$('input.checkbox').svCheckboxReplace();

		$('input.radio').svRadioReplace();







	});
})(jQuery);

