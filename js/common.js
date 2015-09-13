function jsontostr(key, obj){
	return JSON.stringify({key: obj})
}

/**
 * 格式化数据
 */
function formatCurrency(num) {
	var num = num.toString().replace(/\$|\,/g,'');
	if(num==0.00)
		return '-';
	if(isNaN(num))
		num = "0";
	sign = (num == (num = Math.abs(num)));
	num = Math.floor(num * 100 + 0.50000000001);
	num = Math.floor(num/100).toString();
	for (var i = 0; i < Math.floor((num.length - (1 + i))/3); i++)
		num = num.substring(0,num.length - (4 * i + 3)) + ','+
		num.substring(num.length - (4 * i + 3));
	return (((sign)?'': '-') + num + '.00');
}
$(function(){
	pp = {
		// url: "http://192.168.1.107:8080/DST/",
		url: "http://www.zhongxin.cc/",
		userData: JSON.parse(sessionStorage.getItem("data")),
		state: ['结业', '科目一', '科目二', '科目三', '科目四'],
		phase: ['结业', '科目一', '科目二实操', '科目三实操', '科目四']
	}

	subParam = function(obj){//公共参数类
		var thisobj = this;
		thisobj.dbName = pp.userData.drivingSchool.dbSchool;
		thisobj.dbIp = pp.userData.drivingSchool.dbIp;
		if(!!obj){
			$.each(obj, function(key, value){
				thisobj[key] = value;
			});
		}
	}

	/**
	 * 封装参数对象
	 */
	pkgParam = function(key, addobj, form, appendObj){
		var param = {};
		var tempObj = {};
		if(!!form){
			tempObj[key] = $(form).formdata(new subParam(addobj));
		} else {
			var obj = {};
			tempObj[key] = new subParam(addobj);
		}
		
		if(!!appendObj){
			$.each(appendObj, function(i, val) {
				tempObj[i] = val;
			});
		}
		param = {jsonStr: JSON.stringify(tempObj)};
		param.loginCode = pp.userData.user.loginCode;
		param.dbName = pp.userData.drivingSchool.dbSchool;
		param.dbIp = pp.userData.drivingSchool.dbIp;
		return param;
	};
	
	/**
	 * 上传文件公共方法(单个文件)
	 * return 文件路径
	 */
	window.fileUpload = function(fileInput, folder, callback){
		console.log(232424);
		var timeStamp = (new Date()).getTime(),//毫秒数，用于给文件命名
			fd = new FormData();//提交文件的form对象
		
		fd.append("file", fileInput.files[0]);
		fd.append("timeStamp", timeStamp);
		fd.append("folder", folder);
		fd.append("loginCode", public_param.param.user.loginCode);
		fd.append("dbName", public_param.param.drivingSchool.dbSchool);
		fd.append("dbIp", public_param.param.drivingSchool.dbIp);
		fd.append("school", public_param.param.drivingSchool.name);
		$('body').showLoading({'addClass': 'loading-indicator-bars'});
		$.ajax({
			url: imgUrl + "upload.action",
			type: 'post',
			data: fd,
			dataType: "json",
			processData: false,
			contentType: false,
			success: function(data){
				//上传完成后的回调函数
				console.dir(data);
				jQuery('body').hideLoading();
				if(data.status.errCode == 'success'){
					callback(data.imgUrl);
				} else {
					$alert('上传文件失败！');
				}
			}
		});
	}
})

/**
 * 扩展jquery方法
 */
$.fn.extend({
	/**
	 * 根据name封装表单所有参数为json格式字符串
	 * @param {Object} key
	 * @param {Object} addobj
	 */
	formdata: function(addobj){ //data-jsonlist
		var json = {},
			jsonObj = {};
		
		var listObj = $("[data-jsonlist]", this);
		var listInput = $("select[name], input[name], textarea[name]", listObj);
		var eachInput;
		
		if(listObj.size()){
			listObj.each(function(){
				var listName = $(this).attr("data-jsonlist");
				jsonObj[listName] = [];
				$(".jsonitem", this).each(function(){
					var itemObj = {};
					$("select[name], input[name]", this).each(function(){
						if($(this).attr("type") != "checkbox" || $(this).is(":checked")){
							itemObj[this.name] = this.value;
						}
					});
					if(!$.isEmptyObject(itemObj)){
						jsonObj[listName].push(itemObj);
					}
				});
			});
			eachInput = $("select[name], input[name], textarea[name]", this).not(listInput);
		} else {
			eachInput = $("select[name], input[name], textarea[name]", this);
		}
		
		eachInput.each(function(){
			jsonObj[this.name] = this.value;
		});
		if(addobj){
			for(var o in addobj){
				jsonObj[o] = addobj[o];
			}
		}
		return jsonObj;
	},
	objData: function(){
		var obj = {};
		$("select[name], input[name], textarea[name]", this).each(function(){
			obj[this.name] = this.value;
		});
		return obj;
	},
	/**
	 * 禁用元素
	 */
	disabled: function(){
		this.attr("disabled", true);
		return this;
	},
	/**
	 * 启用元素 
	 */
	enabled: function(){
		this.attr("disabled", false);
		return this;
	},

	/**
	 * 查询驾驶本类型，显示在下拉框中
	 */
	driverSelect: function(){
		var _this = this;
		$.getJSON(url + "getDriverByFlag.do", pkgParam("driver", {
			startFlag: "Y"
		}), function(data){
			if(data.status.errCode == 'success'){
				_this.html(
					'<option value="">请选择……</option>'
				);
				$(data.driverList).each(function(){
					_this.append(
						'<option value="' + this.id + '">' + this.type + '</option>'
					);
				});
			} else {
				$alert("查询驾驶证类型失败！");
			}
		});
		return this;
	},

	/**
	 * 查询学员分组，显示在下拉框中
	 */
	groupSelect: function(){
		var _this = this;
		$.getJSON(url + "getModule.do", pkgParam("authority", {
			id: "5EFE473A962B54DB3114342498563661",
			roleId: public_param.param.user.roleId
		}), function(data){
			if(data.status.errCode == 'success'){
				_this.html(
					'<option value="">请选择……</option>'
				);
				$(data.authList).each(function(){
					_this.append(
						'<option value="' + this.menuId + '">' + this.menuName + '</option>'
					);
				});
			} else {
				$alert("查询驾驶证类型失败！");
			}
		})
		return this;
	},

	/**
	 * 时间段标签
	 */
	labelTime: function(param){
		var _this = this;
		var options = {};
		$.extend(options, param);
		$(param.data).each(function(){
			_this.append(
				'<span class="label_time_ed ' + param.data + ' float-left">' +
				'	<input type="hidden" name="startTime" value="' + this.startTime + '" />'+
				'	<input type="hidden" name="endTime" value="' + this.endTime + '" />'+
				'	<input type="hidden" name="timeId" value="' + this.id + '" />'+
				(param.close ? '	<a class="label_time_close transform45"></a>' : '')+
				this.startTime + '-' + this.endTime + '</span>'
			);
		})
		$(".label_time_close", this).click(function(){
			$(this).parent().remove();
		});
	}
});
