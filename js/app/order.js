define(['jquery', 'jqm', 'dlist'], function($) {
	var planList = [{
		name: '喜洋洋',
		mobile: '15239393939',
		time: '1441181831345',
		state: '2',
		timeList: [{
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
		name: '美羊羊',
		mobile: '15239393939',
		time: '1441180031345',
		state: '1',
		timeList: [{
			startTime: '06:00',
			endTime: '08:00'
		},{
			startTime: '06:00',
			endTime: '08:00'
		}]
	},{
		name: '懒洋洋',
		mobile: '15239393939',
		time: '1441161831345',
		state: '2',
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
		name: '灰太狼',
		mobile: '15239393939',
		time: '1441171831345',
		state: '1',
		timeList: [{
			startTime: '06:00',
			endTime: '08:00'
		}]
	},{
		name: '沸羊羊',
		mobile: '15239393939',
		time: '1441281131345',
		state: '1',
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
		name: '慢羊羊',
		mobile: '15239393939',
		time: '1441380831345',
		state: '1',
		timeList: [{
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

	var stateStr = ['', 'order_state_n', 'order_state_y'];
	var listScroll;
	function init(callback){
		if(listScroll){
			listScroll.destroy();
		}

		$('#main_content').html(
			'<div class="plan_order_box">'+
			'	<nav class="datelist" id="order_datelist"></nav>' +
			'	<div id="listWrapper" class="height100">'+
			'		<ul class="planList"></ul>'+
			'	</div>'+
			'</div>'
		);

		listScroll = new iScroll('listWrapper');
		$('#order_datelist').datelist(function(){
			$('.planList').html('');
			$(planList).each(function(){
				var time = new Date(Number(this.time));
				var labelstr = '<div class="label_box">';
				$(this.timeList).each(function(){
					labelstr += '<span class="timelabel">' + this.startTime + '-' + this.endTime + '</span>';
				});
				labelstr += '</div>';
				$('.planList').append(
					'<li class="order-li">'+
					'	<p class="border-bottom-dashed">' + this.name + '（' + this.mobile + '）<span class="float-right ' + stateStr[this.state] + '"></span></p>' + labelstr + 
					'	<p class="border-top-dashed font-huise">' + time.format('MM') + '月' + time.format('dd') + '日' + '（' + time.format('q') + '）' + time.format('hh:ss') + 
					'		<a href="javascript:;" class="ui-btn ui-corner-all ui-btn-inline float-right cancel_order">取消预约</a>'+
					'	</p>'+
					'</li>'
				);
			});
			setTimeout(function(){
				listScroll.refresh();
			}, 200);
		});
		callback();
	}

	return {
		init: init
	}
});