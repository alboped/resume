/**
 * 横向日期列表
 */
(function($){
	$.fn.datelist = function(callback){
		//var nd = new Date();
		var dateArr = [];
		var navScroll;
		var _this = this;

		if(navScroll){
			navScroll.destroy();
		}

		_this.html('<table class="date_label_list" cellspacing="0" cellpadding="0">'+
			'	<tr>'+
			'		<td class="left_td"><span class="pullLeftIcon"></span></td>'+
			'	</tr>'+
			'</div>');

		for(var i = 0; i <= 40; i++){
			var date = new Date();
			date.setDate(date.getDate() + i);

			$('.date_label_list tr').append(
				'<td><a href="javascript:;" class="date_nav" data-time="' + date.getTime() + '">' + 
						date.format('MM-dd') + '&nbsp;' + date.format('q') + '</a></td>'
			);
		}

		$('.date_label_list tr').append(
			'<td class="right_td"><span class="pullRightIcon"></span></td>'
		);

		var _left_pull = $('.left_td');
		var pullLeftOffset = _left_pull[0].offsetWidth;
		var _right_pull = $('.right_td');
		var pullRightOffset = _right_pull[0].offsetWidth;

		//初始化iscroll对象
		navScroll = new iScroll(_this[0], {
			scrollY: false,
			vScroll: false, 
			hScrollbar: false,
			x: -pullLeftOffset,
			// topOffset: pullRightOffset,
			onScrollMove: function () {
				console.log(1);
				if (this.x > 5 && !_left_pull.hasClass('flip')) {
					_left_pull.addClass('flip');
					console.log(5);
				} else if (this.x < 5 && _left_pull.hasClass('flip')) {
					_left_pull.removeClass('flip');
					console.log(6);
				} else if (this.x < (this.maxScrollX - 5) && !_right_pull.hasClass('flip')) {
					_right_pull.addClass('flip');
					console.log(7);
				} else if (this.x > (this.maxScrollX + 5) && _right_pull.hasClass('flip')) {
					_right_pull.removeClass('flip');
					console.log(8);
				}
			},
			onScrollEnd: function(){
				console.log(2);
				if (_left_pull.hasClass('flip')) {
					_left_pull.removeClass('flip').addClass('loading');
					appendLeft();
				} else if (_right_pull.hasClass('flip')) {
					_right_pull.removeClass('flip').addClass('loading');
					appendRight();
				}
			}
		});

		//添加过去时间
		function appendLeft(){
			var left_td = $('.date_label_list .left_td');
			var firstTime = left_td.next().find('.date_nav').attr('data-time');
			for(var i = 1; i <= 7; i++){
				var date = new Date(Number(firstTime));
				date.setDate(date.getDate() - i);

				left_td.after(
					'<td><a href="javascript:;" class="date_nav" data-time="' + date.getTime() + '">' + 
							date.format('MM-dd') + '&nbsp;' + date.format('q') + '</a></td>'
				);
			}
			left_td.removeClass('loading rotate');
			navScroll.refresh();
			//为时间标签绑定事件
			$('.date_nav', _this).unbind().click(function(){
				$('.active').removeClass('active');
				$(this).closest('td').addClass('active');
				callback();
			});
		}

		//添加未来时间
		function appendRight(){
			var right_td = $('.date_label_list .right_td');
			var lastTime = right_td.prev().find('.date_nav').attr('data-time');
			for(var i = 1; i <= 7; i++){
				var date = new Date(Number(lastTime));
				date.setDate(date.getDate() + i);

				right_td.before(
					'<td><a href="javascript:;" class="date_nav" data-time="' + date.getTime() + '">' + 
							date.format('MM-dd') + '&nbsp;' + date.format('q') + '</a></td>'
				);
			}
			right_td.removeClass('loading rotate');
			navScroll.refresh();
			//为时间标签绑定事件
			$('.date_nav', _this).unbind().click(function(){
				$('.active').removeClass('active');
				$(this).closest('td').addClass('active');
				callback();
			});
		}

		//为时间标签绑定事件
		$('.date_nav', _this).unbind().click(function(){
			$('.active').removeClass('active');
			$(this).closest('td').addClass('active');
			callback();
		});

		$('.date_nav:first', _this).click();

		return _this;
	}

	$.fn.getActiveTime = function(){
		return $('td.active .date_nav', this).attr('data-time');
	}
})(jQuery)