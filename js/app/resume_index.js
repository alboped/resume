define(['jquery', 'jq_mouse'], function($) {
	function init() {
		$('.section_li').mousewheel(function(e, d) {
			var next_time = 400;
			$('.section_li').unbind('mousewheel');
			var li_height = $(this).height();
			var box_height = $('#container').scrollTop();
			console.log(li_height);
			$('#container').animate({
				scrollTop: d < 0 ? box_height + li_height : box_height - li_height
			}, next_time, function() {
				init();
			});
		});
	}

	return {
		init: init
	}
})