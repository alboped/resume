define(['jquery', 'jqm', 'iscroll'], function($) {
	var studentScroll,//iscroll 对象
		nowPage = 0,//当前页；
		pageSize = 20;//每页显示条数

	function init (callback) {
		if(studentScroll){
			studentScroll.destroy();
		}
		$('#main_content').html(
			'<div id="listWrapper" class="height100">'+
			'	<div id="stuWrapper">'+
			'		<div class="loading-refresh text-center">'+
			'			<span class="refresh_icon"></span>'+
			'			<span class="refresh_text">下拉刷新</span>'+
			'		</div>'+
			'		<form class="search_form_stu">'+
			'			<input type="search" id="search-stu" placeholder="搜索学员姓名/手机号">'+
			'		</form>'+
			'		<ul data-role="listview" id="stu_list"></ul>'+
			'		<div class="loading-pageing text-center">'+
			'			<span class="pageing_icon"></span>'+
			'			<span class="pageing_text">加载中……</span>'+
			'		</div>'+
			'	</div>'+
			'</div>'
		).trigger("create");

		var _top_pull = $('#stuWrapper .loading-refresh'),
			_bottom_pull = $('#stuWrapper .loading-pageing'),
			pullTopOffset = _top_pull[0].offsetHeight,
			top_icon = $('span.refresh_icon', _top_pull),
			top_text = $('span.refresh_text', _top_pull),
			bottom_icon = $('span.pageing_icon', _bottom_pull),
			bottom_text = $('span.pageing_text', _bottom_pull);

		//初始化iscroll
		studentScroll = new iScroll('listWrapper', {
			topOffset: pullTopOffset,
			onScrollMove: function () {
				console.log(this.y + '----- start -----' + this.maxScrollY);
				if (this.y > 5 && !top_icon.hasClass('flip')) {
					top_icon.addClass('flip');
					top_text.text('放开刷新');
					this.minScrollY = 0;
				} else if (this.y < 5 && top_icon.hasClass('flip')) {
					top_icon.removeClass('flip');
					top_text.text('下拉刷新');
					this.minScrollY = -pullTopOffset;
				} else if (this.y < (this.maxScrollY - 5) && !bottom_icon.hasClass('flip') && !_bottom_pull.hasClass('none_page')) {
					bottom_icon.addClass('flip');
					bottom_text.text('松开加载更多');
					this.maxScrollY = this.maxScrollY;
				} else if (this.y > (this.maxScrollY + 5) && bottom_icon.hasClass('flip')) {
					bottom_icon.removeClass('flip');
					bottom_text.text('上拉加载更多');
					this.maxScrollY = pullTopOffset;
				}
			},
			onScrollEnd: function(){
				if (top_icon.hasClass('flip')) {
					top_icon.removeClass('flip');
					top_text.text('刷新中……');
					nowPage = 0;
					$('#stu_list').html('');
					queryStudentList();
				} else if(bottom_icon.hasClass('flip')) {
					bottom_icon.removeClass('flip');
					bottom_text.text('加载中……');
					queryStudentList();
				}
			},
			onBeforeScrollStart: function (e) {}
		});
		
		//搜索框提交事件
		$('.search_form_stu').submit(function(e){
			e.preventDefault();
			nowPage = 0;
			$('#stu_list').html('');
			queryStudentList();
		});

		//查询学员
		queryStudentList();

		//执行回调函数
		callback();
	}

	//查询学员信息
	function queryStudentList () {
		$('#stu_list .loading-li').remove();

		var param = pkgParam('student', {
			name: $('#search-stu').val(),
			coach: pp.userData.user.id,
			startPage: nowPage,
			pageSize: pageSize
		});
		$.post(pp.url + 'getPhoneMyStudent.do', param, function(data){
			console.dir(data);
			if(data.status.errCode == 'success'){
				$('#stuWrapper .loading-refresh span.refresh_text').text('下拉刷新');

				if(data.studentList.length){
					var bottom_pull = $('#stuWrapper .loading-pageing');
					if(data.count > pageSize){
						$('span.pageing_text', bottom_pull).text('上拉刷新');
					} else {
						bottom_pull.addClass('none_page').find('span.pageing_text').text('');
					}

					$('#stu_list .loading-li').remove();
					$(data.studentList).each(function(){
						$('#stu_list').append(
							'<li>'+
							'	<a href="#student_order" data-transition="slide" class="stu_item">' +
							'		<h2>' + this.name + '</h2>' +
							'		<p>' + this.driverName + '&nbsp;&nbsp;' + pp.state[this.state] + '</p>' +
							'		<p class="ui-li-aside stu_mobile">' + this.mobile + '</p>'+
							'	</a>'+
							'</li>'
						);
					});

					$('#stu_list').listview('refresh');

					$('.stu_item').unbind('click').click(function(){
						
					});

					nowPage += 1;

					setTimeout(function(){
						studentScroll.refresh();
					}, 100);
				} else {
					bottom_pull.addClass('none_page').find('span.pageing_text').text('未查询到学员！');
				}
			} else {
				bottom_pull.addClass('none_page').find('span.pageing_text').text('查询失败！');
			}
		}, 'json');
	}

	return {
		init: init
	}
});