$(document).on("pageinit",":jqmData(role='page')", function(){
	$(":jqmData(slidemenu)").each(function(){
		var smb = $(this);
		smb.addClass('slidemenu_btn');
		var sm = $(smb.data('slidemenu'));
	        sm.addClass('slidemenu');
		
		console.log(smb.parent(":jqmData(role='header')").parent(":jqmData(role='page')").attr("id"));
		
		smb.parent(":jqmData(role='header')").parent(":jqmData(role='page')").on("swipeleft", function(event){
			console.log("left");
			event.stopImmediatePropagation();
			only_close = true;
			slidemenu(sm, smb, only_close);
		});
		
		smb.parent(":jqmData(role='header')").parent(":jqmData(role='page')").on("swiperight", function(event){
			console.log("right");
			event.stopImmediatePropagation();
			slidemenu(sm, smb);
		});
		
		smb.on("click", function(event) {
			event.stopImmediatePropagation();
			slidemenu(sm, smb);
		});
	});
	
	$(document).on("click", "a:not(:jqmData(slidemenu))", function(e) {
		var smb = $(".ui-page-active").children(":jqmData(role='header')").first().children(".slidemenu_btn").first();
		var sm = $(smb.data('slidemenu'));
		console.log("close :" + sm.attr('id'));
		only_close = true;
		slidemenu(sm, smb, only_close);
	});

	$(window).on('resize', function(){
		if ($(".ui-page-active").children(":jqmData(role='header')").first().children(":jqmData(slidemenu)").first().data('slideopen')) {
			var sm = $($(".ui-page-active").children(":jqmData(role='header')").first().children(":jqmData(slidemenu)").first().data('slidemenu'));
			var w = '240px';

			sm.css('width', w);
			sm.height(viewport().height);

			$(".ui-page-active").css('left', w);
		}

	});

});

function slidemenu(sm, context, only_close) {

	sm.height(viewport().height);

	if (!context.data('slideopen') && !only_close) {
		console.log("slideopen=false");
		sm.show();
		var w = '240px';
		sm.animate({width: w, avoidTransforms: false, useTranslate3d: true}, 'fast');
		$(".ui-page-active").css('left', w);
		context.data('slideopen', true);
		
		if ($(".ui-page-active").children(":jqmData(role='header')").first().data('position') === 'fixed') {
			console.log("fixed header");
			console.log(parseInt(w.split('px')[0]) + 10 + 'px');
			context.css('margin-left', parseInt(w.split('px')[0]) + 10 + 'px');
		} else {
			context.css('margin-left', '10px');
		}

	} else {
		console.log("slideopen=true");
		var w = '0px';
		sm.animate({width: w, avoidTransforms: false, useTranslate3d: true}, 'fast', function(){sm.hide()});
		$(".ui-page-active").css('left', w);
		context.data('slideopen', false);
		context.css('margin-left', '0px');
	}
}

function viewport(){
	var e = window;
	var a = 'inner';
	if (!('innerWidth' in window)) {
		a = 'client';
		e = document.documentElement || document.body;
	}
	return { width : e[ a+'Width' ] , height : e[ a+'Height' ] }
}
