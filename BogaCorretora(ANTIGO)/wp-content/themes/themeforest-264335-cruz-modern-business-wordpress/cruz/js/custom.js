// -- CUSTOM FUNCTIONS AND EFFECTS --

// -- NO CONFLICT MODE

var $s = jQuery.noConflict();

$s(function(){

	// -- IMAGE PRELOADER --
	target = $s(".foldify, .cycle_slider li");
	images = target.find("img");
	counter = 0;
	i=0;
	loaded = [];
	nextDelay = 0;
	images.each(function(){
		if( $s(this).parent().length == 0 )
			$s(this).wrap("<span class='preload' />");
		else
			$s(this).parent().addClass("preload");
		loaded[i++] = false;
	});
	images = $s.makeArray(images);

	timer = setInterval(function() {
		if( counter >= loaded.length )
		{
			clearInterval(timer);
			return;
		}
		for( i=0; i<images.length; i++ )
		{
			if( images[i].complete )
			{
				if( loaded[i] == false )
				{
					loaded[i] = true;
					counter++;
					nextDelay = nextDelay + 100;
				}
				$s(images[i]).css("visibility","visible").delay(nextDelay).animate({opacity:1}, 300,
				function(){
					$s(this).parent().removeClass("preload");
				});
			}
			else
			{
				$s(images[i]).css( {"visibility":"hidden", opacity:0} );
			}
		}
	}, 100 );
});

$s(document).ready(function(){

	// -- NAVIGATION MENU

	$s('.nav1 ul, .nav2 ul').css({display: "none"});
	$s('.nav1 li:has(ul), .nav2 li:has(ul)').addClass('has_child');
	$s('.nav1 li, .nav2 li').hover(function(){
		$s(this).find('ul:first').css({visibility: "visible",display: "none"}).fadeIn(300);
	},
	function(){
		$s(this).find('ul:first').css({visibility: "visible",display: "none"});
	});

	$s(".nav1 ul li:has(ul), .nav2 ul li:has(ul)").removeClass('has_child').addClass("arrow");

	$s(".nav1 ul li a, .nav2 ul li a").hover(
		function(){
			$s(this).animate({paddingLeft:"12px"},160);
		},
		function() {
			$s(this).animate({paddingLeft:"5px"},160);
		}
	);


	// -- ACCORDION

	$s('h5.handle').click(function() {
		$s(this).next().slideToggle(300);
		$s(this).toggleClass("activehandle");
		return false;
	}).next().hide();


	// -- FAQ

	$s('h5.question').click(function() {
		$s(this).next().slideToggle(300);
		$s(this).toggleClass("activeques");
		return false;
	}).next().hide();


	// -- TOGGLE

	$s('h5.toggle').click(function() {
		$s(this).next().slideToggle(300);
		$s(this).toggleClass("activetoggle");
		return false;
	}).next().hide();


	// Change the HTML5 data-rel attribute to rel

	$s('a[data-rel]').each(function() {
		$s(this).attr('rel', $s(this).data('rel'));
	});

	// -- PRETTYPHOTO INIT

	$s("a[rel^='prettyPhoto[group1]'], a[rel^='prettyPhoto[group2]'], a[rel^='prettyPhoto[inline]']").prettyPhoto({
		animation_speed: 'fast',
		slideshow: 5000,
		autoplay_slideshow: false,
		opacity: 0.80,
		show_title: false,
		theme: 'pp_default', /* light_rounded / dark_rounded / light_square / dark_square / facebook */
		overlay_gallery: false,
		social_tools: false
	});



	// -- TOP OF PAGE

	$s('.top').click(function(){
		$s('html, body').animate({scrollTop:0}, 500 );
		return false;
	});


	// Box Close Button

	$s(".box").each(function(){
		$s(this).append('<span class="hide_box"></span>');
			$s(this).find('.hide_box').click(function(){
			$s(this).parent().hide();
		});
	});

}) // END DOCUMENT.READY

$s(window).load( function() {

	// -- CYCLE SLIDER INIT

	$s('.cycle_slider').cycle({
		fx:     'fade',
		speed:  400,
		timeout: 4000,
		next: '.sl_next',
		prev: '.sl_prev',
		sync: 1,
		pause: 1,
		cleartype: true,
		pager:  '.cycle_nav',
		pagerAnchorBuilder: function(idx, slide) {
			return '<li><a href="#"></a></li>';
		}
	});


	// -- SHOW/HIDE SLIDER CONTROLS

	$s('.show_desc').fadeIn();
	$s('.controls').hide();
	$s('.slider').hover(function(){
		$s('.controls').show();
	}, function() {
		$s('.controls').hide();
	});

	// -- Foldify Images

	$s(".foldify").append('<span class="fold_wrap"><span class="fold"></span></span>');
	$s(".fold_wrap").css({right:"-50px", bottom:"-50px"});
	$s(".fold").css({top:"-25px", left:"-25px"});
	$s(".foldify").each(function(){
		$s(this).hover(function(){
			$s(this).find(".fold_wrap").stop().animate({right:"0px", bottom:"0px"}, 300);
			$s(this).find(".fold").stop().animate({top:"0px", left:"0px"}, 300);
		}, function(){
			$s(this).find(".fold_wrap").stop().animate({right:"-50px", bottom:"-50px"}, 400);
			$s(this).find(".fold").stop().animate({top:"-25px", left:"-25px"}, 400);
		});
	});
})