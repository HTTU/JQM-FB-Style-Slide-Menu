$(document).on("pageinit",":jqmData(role='page')", function(){
	
	//add by Wei for fixing the bug when the slidemenu is opened and user clicks the physic back button
	document.addEventListener("backbutton", function(e){
		$(":jqmData(slidemenu)").each(function(){
			var smb = $(this);
			var sm = $(smb.data('slidemenu'));
			var smw = $(smb.data('slidemenu')+"_wrapper");
			if(smb.data('slideopen')){
				slidemenu(sm, smb, smw, only_close);
			}
		});
	}, false);
	
	$(":jqmData(slidemenu)").each(function(){
		var smb = $(this);
		smb.addClass('slidemenu_btn');
		var sm = $(smb.data('slidemenu'));
		sm.addClass('slidemenu');
		var smw = $(smb.data('slidemenu')+"_wrapper");
		smw.addClass('slidemenu-wrapper');
		var scroller;
		
		if(smb.data('swipetrigger') === "true"){
			smb.parent(":jqmData(role='header')").parent(":jqmData(role='page')").on("swipeleft", function(event){
				event.stopImmediatePropagation();
				only_close = true;
				slidemenu(sm, smb, smw, only_close);
			});
			
			smb.parent(":jqmData(role='header')").parent(":jqmData(role='page')").on("swiperight", function(event){
				event.stopImmediatePropagation();
				slidemenu(sm, smb, smw);
			});
		}
		
		smb.on("click", function(event) {
			event.stopImmediatePropagation();
			slidemenu(sm, smb, smw);
			if(typeof scroller === "undefined") { scroller = new iScroll(sm.attr('id')); }
		});
		
	});
	
	$(document).on("click", "a:not(:jqmData(slidemenu))", function(e) {
		var smb = $(".ui-page-active").children(":jqmData(role='header')").first().children(".slidemenu_btn").first();
		var sm = $(smb.data('slidemenu'));
		var smw = $(smb.data('slidemenu') + "_wrapper");
		only_close = true;
		slidemenu(sm, smb, smw, only_close);
	});

	/*
	$(window).on('resize', function(){
		if ($(".ui-page-active").children(":jqmData(role='header')").first().children(":jqmData(slidemenu)").first().data('slideopen')) {
			var sm = $($(".ui-page-active").children(":jqmData(role='header')").first().children(":jqmData(slidemenu)").first().data('slidemenu'));
			var smw = $($(".ui-page-active").children(":jqmData(role='header')").first().children(":jqmData(slidemenu)").first().data('slidemenu') + "_wrapper");
			var w = '240px';

			sm.css('width', w);
			sm.height(viewport().height);

			$(".ui-page-active").css('left', w);
		}

	});
	*/

});

function slidemenu(sm, context, smw, only_close) {

	sm.height(viewport().height);
	if (!context.data('slideopen') && !only_close) {
		//add by Wei for fixing the slidemenu position bug when content scroll down and the header position is fixed 
		var top = $(".ui-page-active").children(":jqmData(role='header')").first().offset().top;
		sm.css('top', top + 'px');
		
		sm.show();
		var w = '240px';
		//sm.animate({width: w, avoidTransforms: false, useTranslate3d: true}, 'fast');
		//modified by Wei, to fix the animation bug after click the carousel image
		sm.css('width', w);
		$(".ui-page-active").css('left', w);
		context.data('slideopen', true);
		
		if ($(".ui-page-active").children(":jqmData(role='header')").first().data('position') === 'fixed') {
			context.css('margin-left', parseInt(w.split('px')[0]) + 10 + 'px');
			//add by Wei to hide the other buttons in header for avoiding buttons overlap problem
			$(".ui-page-active").children(":jqmData(role='header')").first().children('a').not('.slidemenu_btn').hide();
			$(".ui-page-active").children(":jqmData(role='header')").first().children('.ui-title').css('opacity', '0');
		} else {
			context.css('margin-left', '10px');
		}

	} else {
		var w = '0px';
		//sm.animate({width: w, avoidTransforms: false, useTranslate3d: true}, 'fast', function(){sm.hide()});
		//modified by Wei, to fix the animation bug after click the carousel image
		sm.css('width', w);
		sm.hide();
		$(".ui-page-active").css('left', w);
		context.data('slideopen', false);
		context.css('margin-left', '0px');
		//add by Wei to show the other buttons in header for avoiding buttons overlap problem
		$(".ui-page-active").children(":jqmData(role='header')").first().children('a').not('.slidemenu_btn').show();
		$(".ui-page-active").children(":jqmData(role='header')").first().children('.ui-title').css('opacity', '1');
	}
}

function viewport(){
	var e = window;
	var a = 'inner';
	if (!('innerWidth' in window)) {
		a = 'client';
		e = document.documentElement || document.body;
	}
	return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
}
