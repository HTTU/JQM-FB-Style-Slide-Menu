$(document).on("pageinit",":jqmData(role='page')", function(){
	var supportTouch = $.support.touch,
		touchStartEvent = supportTouch ? "touchstart" : "mousedown",
        touchStopEvent = supportTouch ? "touchend" : "mouseup",
		touchMoveEvent = supportTouch ? "touchmove" : "mousemove";
	
	$(":jqmData(slidemenu)").each(function(){
		var smb = $(this);
		smb.addClass('slidemenu_btn');
		var sm = $(smb.data('slidemenu'));
		sm.addClass('slidemenu');
		var smw = $(smb.data('slidemenu')+"_wrapper");
		smw.addClass('slidemenu-wrapper');
		
		smb.parent(":jqmData(role='header')").parent(":jqmData(role='page')").on("swipeleft", function(event){
			event.stopImmediatePropagation();
			only_close = true;
			slidemenu(sm, smb, smw, only_close);
		});
		
		smb.parent(":jqmData(role='header')").parent(":jqmData(role='page')").on("swiperight", function(event){
			event.stopImmediatePropagation();
			slidemenu(sm, smb, smw);
		});
		
		smb.on("click", function(event) {
			event.stopImmediatePropagation();
			slidemenu(sm, smb, smw);
		});
		
		sm.bind(touchStartEvent, function(e){
			
			var data = e.originalEvent.touches ? e.originalEvent.touches[ 0 ] : e,
			start = {
			    time: (new Date).getTime(),
			    coords: [ data.pageX, data.pageY ],
			    origin: $(e.target)
			},
			stop;
            
			function moveHandler(e){
				event.preventDefault();
				
				if (!start) {
				    return;
				}
				
				var data = e.originalEvent.touches ? e.originalEvent.touches[ 0 ] : e;
				
				stop = {
				    time: (new Date).getTime(),
				    coords: [ data.pageX, data.pageY ]
				};
			    
				var delta = stop.coords[1] - start.coords[1];
				var origin = smw.css("top");
				var diff = parseFloat(origin) + delta;
				var diffHeight = sm.height() - smw.height();
				if(delta < 0){
					if(diff < diffHeight){
						if(origin !== diffHeight+"px"){
							smw.css("top", diffHeight+"px");
						}
					}else{
						smw.css("top", diff+"px");
					}
				}else{
					if(diff > 0){
						smw.css("top", "0px");
					}else{
						smw.css("top", diff+"px");
					}
				}
			    
				stop.origin = start.origin;
				start = stop;
			}
            
			sm.bind(touchMoveEvent, moveHandler).one(touchStopEvent, function(e){
				sm.unbind(touchMoveEvent, moveHandler);
				start = stop = undefined;
			});
		});
		
	});
	
	$(document).on("click", "a:not(:jqmData(slidemenu))", function(e) {
		var smb = $(".ui-page-active").children(":jqmData(role='header')").first().children(".slidemenu_btn").first();
		var sm = $(smb.data('slidemenu'));
		var smw = $(smb.data('slidemenu') + "_wrapper");
		only_close = true;
		slidemenu(sm, smb, smw, only_close);
	});

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

});

function slidemenu(sm, context, smw, only_close) {

	sm.height(viewport().height);

	if (!context.data('slideopen') && !only_close) {
		sm.show();
		var w = '240px';
		sm.animate({width: w, avoidTransforms: false, useTranslate3d: true}, 'fast');
		$(".ui-page-active").css('left', w);
		context.data('slideopen', true);
		
		if ($(".ui-page-active").children(":jqmData(role='header')").first().data('position') === 'fixed') {
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
