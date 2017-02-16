//Nice Scroll - Custom Scrollbar
//滚动条
var nice = $("html").niceScroll({
		cursorborderradius: 0,
		cursorwidth: "8px",
		cursorfixedheight: 150,
		cursorcolor: "#6CB670",
		zindex: 9999,
		cursorborder: 0,
	});

/*	Scroll Up / Back to top */
//还没完成	
$(window).scroll(function() {
	if ($(window).scrollTop() > 400) {
		$("#scrollUp").fadeIn(200);
	} else {
		$("#scrollUp").fadeOut(200);
	}
});

$('#scrollUp').click(function() {
	$('html, body').stop().animate({
		scrollTop : 0
	}, 1500, 'easeInOutExpo');
});

//视觉差
function parallaxInit() {
	$('#counter').parallax("50%", 0.3);
	$('#team-skills').parallax("50%", 0.3);
	$('#twitter-feed').parallax("50%", 0.3);
	$('#testimonial').parallax("50%", 0.3);
}

$(window).bind("load", function () {
    parallaxInit()
});
     