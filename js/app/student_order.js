define(['jquery', 'jqm', 'dlist', 'iscroll'], function($) {

	var planList = [{
		name: '1号车',
		type: '宝马',
		timeList: [{
			startTime: '06:00',
			endTime: '08:00'
		},{
			startTime: '06:00',
			endTime: '08:00'
		},{
			startTime: '06:00',
			endTime: '08:00'
		},{
			startTime: '06:00',
			endTime: '08:00'
		}]
	},{
		name: '1号车',
		type: '宝马',
		timeList: [{
			startTime: '06:00',
			endTime: '08:00'
		},{
			startTime: '06:00',
			endTime: '08:00'
		},{
			startTime: '06:00',
			endTime: '08:00'
		},{
			startTime: '06:00',
			endTime: '08:00'
		}]
	},{
		name: '1号车',
		type: '宝马',
		timeList: [{
			startTime: '06:00',
			endTime: '08:00'
		},{
			startTime: '06:00',
			endTime: '08:00'
		},{
			startTime: '06:00',
			endTime: '08:00'
		},{
			startTime: '06:00',
			endTime: '08:00'
		}]
	},{
		name: '1号车',
		type: '宝马',
		timeList: [{
			startTime: '06:00',
			endTime: '08:00'
		},{
			startTime: '06:00',
			endTime: '08:00'
		},{
			startTime: '06:00',
			endTime: '08:00'
		},{
			startTime: '06:00',
			endTime: '08:00'
		}]
	},{
		name: '1号车',
		type: '宝马',
		timeList: [{
			startTime: '06:00',
			endTime: '08:00'
		},{
			startTime: '06:00',
			endTime: '08:00'
		},{
			startTime: '06:00',
			endTime: '08:00'
		},{
			startTime: '06:00',
			endTime: '08:00'
		}]
	},{
		name: '1号车',
		type: '宝马',
		timeList: [{
			startTime: '06:00',
			endTime: '08:00'
		},{
			startTime: '06:00',
			endTime: '08:00'
		},{
			startTime: '06:00',
			endTime: '08:00'
		},{
			startTime: '06:00',
			endTime: '08:00'
		}]
	}]

	var listScroll;

	//初始化计划页面
	function init (callback) {
		if(listScroll){
			listScroll.destroy();
		}
		$('#so_content').html(
			'<div class="plan_order_box">'+
			'	<nav class="datelist"></nav>' +
			'	<div id="soWrapper" class="height100">'+
			'		<ul class="planList"></ul>'+
			'	</div>'+
			'</div>'
		);
		
		listScroll = new iScroll('soWrapper');
		
		$('#so_content .datelist').datelist(function(){
			$('#so_content .planList').html('');
			$(planList).each(function(){
				var labelstr = '<div class="label_box">';
				$(this.timeList).each(function(){
					labelstr += '<span class="timelabel">' + this.startTime + '-' + this.endTime + '</span>';
				});
				labelstr += '</div>';
				$('#so_content .planList').append(
					'<li><p class="border-bottom-dashed">' + this.name + ' ' + this.type + '</p>' + labelstr + '</li>'
				);
			});
			setTimeout(function(){
				listScroll.refresh();
			}, 200);
		}).trigger("create");
		callback();
	}

	return {
		init: init
	}
});