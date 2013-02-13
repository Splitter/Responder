/*
*
*	Copyright (c) SplitV a.k.a. M.Pippin
*	site: Split-Visionz.net.
*
*	All plugins and scripts in this file are licenced freely under the MIT license.
*
*
*/






/*
*	$.svSelectReplace
*	@ no params 
*	
*	----------------------------------------------------
*	Replace select elements with a link & list that can be styled via CSS
*
*/
(function($){ 
    $.fn.extend({         
        svSelectReplace: function() {        
            return this.each(function() {
            		
				var wrap = $('<div class="select_wrap"/>');
				var link = $('<a class="select" href="#">'+$(this).val()+'</a>');
	            $(this).wrap('<div class="clearfix"/>')
				$('option',$(this)).each(function(){
	                if($(this).val()==link.text()){
	                    link.text($(this).text());
	                }
	            })
				var list = $('<ul/>');				
				link.appendTo(wrap).attr("tabindex",-1);
				list.appendTo(wrap);
				$(this).parent().append(wrap);
				$(this).addClass('elementHide');
				if($(this).is(':disabled')){
					link.addClass('disabled');
				}


			    $(this).focus(function(){
			    	$(this).parent().find('a.select').trigger('click');
			    });
    
				$('option',$(this)).each(function(){
					var opt = $('<li/>');
					var nl = $('<a href ="#" data-value="'+$(this).val()+'">'+$(this).text()+'</a>');
					opt.append(nl);
					if($(this).attr('selected')){
						nl.addClass('active');
					}
					nl.click(function(e){
							list.stop(true, false);
							e.preventDefault();
							e.stopPropagation();
							list.find('a').each(function(){
								$(this).removeClass('active');
							});
							$(this).addClass('active');
							link.text($(this).text());
							list.parent().parent().find('select.dropdown').val($(this).attr('data-value'));
		                   	list.hide();
						
					});
					opt.appendTo(list);
				});
				list.hide();
				link.click(function(e){
						e.preventDefault();
					if(!link.hasClass('disabled')){
						$(this).focus();
						list.slideToggle(300);
					}
				});
				link.focusout(function(){
					list.delay(300).slideUp(300);
					return true;
				});		
            });
        }

    });    
     
})(jQuery);





/*
*	$.svCheckboxReplace
*	@ no params 
*	
*	----------------------------------------------------
*	Replace checkbox elements with a div that can be styled via CSS
*
*/
(function($){ 
    $.fn.extend({         
        svCheckboxReplace: function() {        
            return this.each(function() {            	
				var wrap = $('<div class="checkbox"/>');
				$this = $(this);
				wrap.insertBefore($this);
				if($this.is(':checked')){
					wrap.addClass('checked');
				}
				if($this.is(':disabled')){
					wrap.addClass('disabled');
				}
				$this.addClass('elementHide');
			    $this.focus(function(){
			                $(this).parent().children('div.checkbox').trigger('click');
			    });
    
				wrap.click(function(e){
					e.preventDefault();
					if(!$(this).hasClass('disabled')){
						if($(this).hasClass('checked')){
							$(this).removeClass('checked');
							$(this).parent().children('input[type=checkbox]').removeAttr("checked");
						}
						else{
							$(this).addClass('checked');
							$(this).parent().children('input[type=checkbox]').attr("checked","checked");
						}
					}
				});


			});
        }

    });  
     
})(jQuery);








/*
*	$.svRadioReplace
*	@ no params 
*	
*	----------------------------------------------------
*	Replace radio elements with a div that can be styled via CSS
*
*/
(function($){ 
    $.fn.extend({         
        svRadioReplace: function() {        
            return this.each(function() {            	
				var wrap = $('<div class="radio"/>');
				$this = $(this);
				wrap.insertBefore($this);
				if($this.is(':checked')){
					wrap.addClass('checked');
				}
				if($this.is(':disabled')){
					wrap.addClass('disabled');
				}
				$this.addClass('elementHide');

			    $this.focus(function(){
			                $(this).parent().children('div.radio').trigger('click');
			    });

				wrap.click(function(e){
					e.preventDefault();
					if(!$(this).hasClass('disabled')){
						$("input.radio").removeAttr('checked');
						$("input.radio").each(function(){
							$(this).parent().children('div.radio').removeClass('checked');
						});
						$(this).addClass('checked');
						$(this).parent().children('input[type=radio]').attr("checked","checked");
					}
					
				});


			});
        }

    });  
     
})(jQuery);













/*
*	$.svResponder
*	@params 
*		- callback function
*		- interval for timer
*	----------------------------------------------------
*	Utility function designed for responsive layout
*	fires callback function when user stops resizing window
*
*/
(function($){ 

	$.svResponder = function(func, interval){
		var last =  null;
		var timer = null;

		$(window).resize(function(){

			if(timer === null){
				timer = setTimeout(check, interval);
			}

		});

		var check = function(){
			if( last != null && last == parseInt( $(document).width() ) ){

				last = null;
				clearTimeout(timer);
				timer = null;
				func.call();

			}
			else{

				timer = setTimeout(check, interval);
				last = parseInt($(document).width());

			}
		};

	}

} )(jQuery);





/*
*	$.svDropdownMenu
*	@params 
*		- width(in pixels) to disable dropdown
*	----------------------------------------------------
*
*	Dropdown menu plugin that allows you to disable the dropdown on small resolutions(small mobile handsets)
*
*/
(function($){ 

    $.fn.extend({         
        svDropdownMenu: function(widthToDisable) {   
	        
            widthToDisable = widthToDisable ? widthToDisable : 479;

            return this.each(function() {

						var submenu = jQuery(this).find('ul:first');
						
						jQuery(this).hover(function()
						{	
							if(parseInt($(document).width()) > widthToDisable){

								submenu.stop().css({overflow:"hidden", height:"auto", display:"none"}).slideDown(400, function()
								{
									jQuery(this).css({overflow:"visible", height:"auto"});
								});	

							}
						},

						function()
						{	
							if(parseInt($(document).width()) > widthToDisable){

								submenu.stop().slideUp(400, function()
								{	
									jQuery(this).css({overflow:"hidden", display:"none"});
								});

							}
						});	

            });

        }

    });    
     
})(jQuery);





/*
*	$.svAnimateHover
*	@params 
*		- options object 
*			- changes - CSS changes to make
*			- speed - Speed of the animation
*			- selector - OPTIONAL selector for child of element being hovered over
*			- easing - OPTIONAL easing function
*			- onstart - OPTIONAL on start callback function
*			- onend - OPTIONAL on end callback function
*	----------------------------------------------------
*
*	a universal hover animation plugin meant to reduce the size of the code used, be it 
*	the amount of plugins needed or custom code created, to implement hover animation effects.
*
*/
(function($){
	$.fn.svAnimateHover = function(opts) {
		var defaults = {changes:{},easing:'linear',speed:600,onstart:null,onend:null}, 
			st = {};
		opts = $.extend(defaults, opts); 		
		return this.each(function() {
			var $this=$(this);
			for (var i in opts.changes) {
				if(opts.selector){		
					st[i] = $this.find(opts.selector).css(i);
				}
				else{
					st[i] = $this.css(i);
				}
			}
			$this.hover(
				function(){
					svAnimateHoverAni.call(this,true);
				},
				function(){		
					svAnimateHoverAni.call(this,false);
				}
			);
			var svAnimateHoverAni = function(o){	
					var $this=this;
					if(o && opts.onstart){						
						opts.onstart.call($this);
					}
					var p=(!o)?st:opts.changes;					
					if(opts.selector){
						$($this).find(opts.selector).stop(true).animate(p,
														opts.speed,
														opts.easing,
														function(){
															if(!o && opts.onend){
																opts.onend.call($this);
															}
														});
					}
					else{
						$($this).stop(true).animate(p,
										opts.speed,
										opts.easing,
										function(){
											if(!o && opts.onend){
												opts.onend.call($this);
											}											
										});
					}
			}
		});
	};	
})(jQuery);









