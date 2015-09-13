define(['jquery', 'jqm', 'dlist', 'iscroll', 'common', 'base'], function($) {
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
		$('#main_content').html(
			'<div class="plan_order_box">'+
			'	<nav class="datelist" id="plan_datalist"></nav>' +
			'	<div id="listWrapper" class="height100">'+
			'		<ul class="planList"></ul>'+
			'	</div>'+
			'</div>'
		);
		
		listScroll = new iScroll('listWrapper');
		$('#plan_datalist').datelist(function(){
			queryPlanList();
			
		}).trigger("create");
		callback();
	}

	//查询车辆计划
	function queryPlanList(){
		var activeTime = new Date(Number($('.datelist').getActiveTime())).format('yyyy-MM-dd');
		var param = pkgParam('carPlaning', {
			time: activeTime,
			userId: pp.userData.user.id,
			carPhase: '',
			driverId: '',
			disable: ''
		});
		console.dir(param);
		$('.planList').html('<li class="loading-li"><p class="text-center loading"><span class="rotate"></span></p></li>');
		$.post(pp.url + 'gePhonetCarPlaning.do', param, function(data){
			console.dir(data);
			if(data.status.errCode == 'success'){
				if(data.carList.length){
					$('.planList').html('');
					$(data.carList).each(function(){
						var labelstr = '<div class="label_box">';
						$(this.carPlaningTimeList).each(function(){
							labelstr += '<span class="timelabel">' + this.startTime + '-' + this.endTime + '</span>';
						});
						labelstr += '</div>';
						$('.planList').append(
							'<li><p class="border-bottom-dashed">' + this.insideNumber + '&nbsp;&nbsp;&nbsp;' + 
									this.carName + '&nbsp;&nbsp;&nbsp;' + this.driverName + pp.phase[this.phase] + '</p>' + labelstr + '</li>'
						);
					});
					setTimeout(function(){
						listScroll.refresh();
					}, 200);
				} else {
					$('.planList').html('<li class="loading-li"><p class="text-center loading">暂无计划！</p></li>');	
				}
			} else {
				$('.planList').html('<li class="loading-li"><p class="text-center loading">查询计划失败！</p></li>');
			}
		}, 'json');
	}

	return {
		init: init
	}
});