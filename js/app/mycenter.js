define(['jquery', 'jqm'], function($) {
	var userInfo = {
		name: '周杰伦',
		userNumber: '1592650238',
		mobile: '1894873736',
		departmentName: '教练部',
		job: '教练',
		drivingSchool: '东方时尚',
		tel: '010-88888888',
		img: 'img/person_center/default_photo.png'
	}
	var userInfoScroll;
	function init (callback) {
		if(userInfoScroll){
			userInfoScroll.destroy();
		}
		$('#main_content').html(
			'<div id="listWrapper">'+
			'	<div class="userInfoWrapper">'+
			'		<div class="photo_box">'+
			'			<img src="http://' + pp.userData.drivingSchool.imgIp + '/DST' + pp.userData.user.imgUrl + '" alt="头像" />'+
			'		</div>'+
			'		<ul data-role="listview" class="user_info"></ul>'+
			'	</div>'+
			'</div>'
		).trigger("create");

		$('.user_info').append(
			'<li>' +
			'	<p>'+
			'		<span class="mc_icon name_icon"></span>'+
			'		<span class="mc_key">姓名</span>'+
			'		<span class="mc_value">' + pp.userData.user.trueName + '</span>'+
			'	</p>' +
			'</li>'+
			'<li>' +
			'	<p>'+
			'		<span class="mc_icon job_number_icon"></span>'+
			'		<span class="mc_key">工号</span>'+
			'		<span class="mc_value">' + pp.userData.user.name + '</span>'+
			'	</p>' +
			'</li>'+
			'<li>' +
			'	<p>'+
			'		<span class="mc_icon mobile_icon"></span>'+
			'		<span class="mc_key">手机号</span>'+
			'		<span class="mc_value">' + pp.userData.user.mobile + '</span>'+
			'	</p>' +
			'</li>'+
			'<li>' +
			'	<p>'+
			'		<span class="mc_icon dept_icon"></span>'+
			'		<span class="mc_key">部门</span>'+
			'		<span class="mc_value">' + pp.userData.user.departmentName + '</span>'+
			'	</p>' +
			'</li>'+
			'<li>' +
			'	<p>'+
			'		<span class="mc_icon job_icon"></span>'+
			'		<span class="mc_key">职务</span>'+
			'		<span class="mc_value">' + pp.userData.user.station + '</span>'+
			'	</p>' +
			'</li>'+
			'<li>' +
			'	<p>'+
			'		<span class="mc_icon driving_school_icon"></span>'+
			'		<span class="mc_key">任职驾校</span>'+
			'		<span class="mc_value">' + pp.userData.drivingSchool.name + '</span>'+
			'	</p>' +
			'</li>'+
			'<li>' +
			'	<p class="text-center">'+
			'		<a href="tel:' + pp.userData.drivingSchool.mobile + '" class="mc_icon tel_icon"></a>'+
			'		<span class="mc_value">' + pp.userData.drivingSchool.mobile + '</span>'+
			'	</p>'+
			'</li>'
		).listview('refresh');

		callback();

		userInfoScroll = new iScroll('listWrapper');
	}

	return {
		init: init
	}
});