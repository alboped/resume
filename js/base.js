/**
 * 解析url参数
 * @param {Object} url
 */
function parserUrl(url){
	var paramstr = url.split("?")[1];
	var paramarr = paramstr.split("&");
	var obj = {};
	$(paramarr).each(function(){
		obj[this.split("=")[0]] = this.split("=")[1];
	});
	return obj;
}

/**
 * 阿拉伯数字转汉字
 */
function numberTo_Chinese (n) {
	if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n))
		return "数据非法";
	var unit = "千百拾亿千百拾万千百拾元角分", str = "";
		n += "00";
	var p = n.indexOf('.');
	if (p >= 0)
		n = n.substring(0, p) + n.substr(p+1, 2);
	unit = unit.substr(unit.length - n.length);
	for (var i=0; i < n.length; i++)
		str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);
	return str.replace(/零(千|百|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(/(亿)万|壹(拾)/g, "$1$2").replace(/^元零?|零分/g, "").replace(/元$/g, "元整");
}

/**
 * 将数值四舍五入(保留2位小数)后格式化成金额形式
 *
 * @param num 数值(Number或者String)
 * @return 金额格式的字符串,如'1,234,567.45'
 * @type String
 */
function formatCurrency(num) {
    num = num.toString().replace(/\$|\,/g,'');
    if(isNaN(num))
    num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num*100+0.50000000001);
    cents = num%100;
    num = Math.floor(num/100).toString();
    if(cents<10)
    cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
    num = num.substring(0,num.length-(4*i+3))+','+
    num.substring(num.length-(4*i+3));
    return (((sign)?'':'-') + num + '.' + cents);
}

/**
 * 保留指定数字位数
 * @param  {number} number [待处理的数字]
 * @param  {number} intNum  [整数位数]
 * @param  {number} doubleNum  [小数位数]
 */
function digitNumber (number, intNum, doubleNum) {
	var retNumber = Math.pow(10, intNum) + number;
	return retNumber.toString().substr(1, retNumber.toString().length);
}

/**
 * 比较时间段大小（格式： hh:ii）
 */
function comparing_time(startTime, endTime){
	var startarr = startTime.split(":");
	var endarr = endTime.split(":");
	console.log(Number(startarr[0]) > Number(endarr[0]));
	if(startTime == endTime ||
		Number(startarr[0]) > Number(endarr[0]) || 
			(Number(startarr[0]) == Number(endarr[0]) && 
				Number(startarr[1]) > Number(endarr[1]))
	){
		return false;
	}
	return true;
}

//计算时间段差值（小时数）
function sub_time(startTime, endTime){
	var atartArr = startTime.split(":"),
		endArr = endTime.split(":");

	return (endArr[0] - atartArr[0]) + (endArr[1] - atartArr[1])/60;
}

function getIdcard_info(UUserCard,num){
	if(num == 1){
		//获取出生日期
		birth=UUserCard.substring(6, 10) + "-" + UUserCard.substring(10, 12) + "-" + UUserCard.substring(12, 14);
		return birth;
	}
	if(num == 2){
		//获取性别
		if (parseInt(UUserCard.substr(16, 1)) % 2 == 1) {
			//男
			return "男";
		} else {
			//女
			return "女";
		}
	}
	if(num == 3){
		//获取年龄
		var myDate = new Date();
		var month = myDate.getMonth() + 1;
		var day = myDate.getDate();
		var age = myDate.getFullYear() - UUserCard.substring(6, 10) - 1;
		if (UUserCard.substring(10, 12) < month || UUserCard.substring(10, 12) == month && UUserCard.substring(12, 14) <= day) {
			age++;
		}
		return age;
	}
}

//复制对象
function cloneObj(fromObj, toObj){   
	for(var i in fromObj){   
		if(typeof fromObj == "object"){   
			toObj={};   
			cloneObj(fromObj,toObj);   
			continue;   
		}   
		toObj = fromObj;   
	}   
}

$(function(){
	/**
	 * 根据name封装表单内所有参数
	 */
	window.ParamData = function(element, object){
		this.jsonObj = {};
		var obj = this;
		if(element != undefined){
			$("select[name],input[name]", element).each(function(){
				obj.jsonObj[this.name] = this.value;
			});
		}
		if(object != undefined){
			 extend(this.jsonObj, object);
		}
		return this.jsonObj;
	}
	/**
	 * 系统提示公共方法
	 * @param {Object} message
	 * @param {Object} size
	 */
	window.$alert = function(message, size){
		bootbox.alert({
			size: size || "small",
			buttons: {  
				ok: {  
					label: '确 定'  
				}  
			},  
			message: message,
			className: "mydialog-modal alert_dialog",
			title: "系统提示"
		});
	}
	/**
	 * 确认窗口公共方法
	 */
	window.$confirm = function(message, callback, callback2, size){
		bootbox.confirm({
			size: size || "small",
			title: " ",
			message: message,
			className: "mydialog-modal confirm_dialog",
			buttons: {  
				confirm: {  
					label: '确 认'
				},  
	            cancel: {  
					label: '取 消'
				}   
			}, 
			callback: function(result){
				if(result){
					!callback || callback();
				} else {
					!callback2 || callback2();
				}
			}
		});
	}

	/**
	 * 扩展Date对象方法
	 * @param {Object} format
	 */
	Date.prototype.format = function(format, add, sub){ 
		if(add){
			this.setDate(this.getDate() + add);
		} else if(sub) {
			this.setDate(this.getDate() - sub);
		}
		var o = { 
			"MM" : (this.getMonth()+1).toString().length == 1 ? ("0" + (this.getMonth()+1).toString()) : (this.getMonth()+1), //month 
			"MM_cn": ((this.getMonth()+1).toString().length == 1 ? ("0" + (this.getMonth()+1).toString()) : (this.getMonth()+1)) + "月",
			"dd" : this.getDate().toString().length == 1 ? ("0" + "" + this.getDate().toString()) : this.getDate(), //day
			"dd_cn": (this.getDate().toString().length == 1 ? ("0" + "" + this.getDate().toString()) : this.getDate()) + "日",
			"yyyy" : this.getFullYear(), //year
			"hh" : this.getHours().toString().length == 1 ? ("0" + "" + this.getHours().toString()) : this.getHours(), //hour 
			"mm" : this.getMinutes().toString().length == 1 ? ("0" + "" + this.getMinutes().toString()) : this.getMinutes(), //minute 
			"ss" : this.getSeconds().toString().length == 1 ? ("0" + "" + this.getSeconds().toString()) : this.getSeconds(), //second 
			"q" : this.getDay(), //quarter 
			"S" : this.getMilliseconds() //millisecond 
		}
		var quarter = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
		var fa = format.split(" ");

		var formatStr = "";//格式化后的时间字符串
		$(fa).each(function(){
			if(this.indexOf('-') > 0){
				var formatArr = this.split("-");
				$(formatArr).each(function(){
					formatStr += o[this] + "-";
				});
				formatStr = formatStr.substr(0, formatStr.length - 1) + ' ';
			} else if(this.indexOf(":") > 0){
				var formatArr = this.split(":");
				$(formatArr).each(function(){
					formatStr += o[this] + ":";
				});
				formatStr = formatStr.substr(0, formatStr.length - 1) + ' ';
			} else if(this.indexOf(".") > 0){
				var formatArr = this.split(".");
				$(formatArr).each(function(){
					formatStr += o[this] + ".";
				});
				formatStr = formatStr.substr(0, formatStr.length - 1) + ' ';
			} else if(this == 'q'){
				formatStr += quarter[o[this]] + " ";
			} else {
				formatStr += o[this] + " ";
			}
		});

		formatStr = formatStr.substr(0, formatStr.length - 1);
		return formatStr; 
	}
	//获取农历日期
	Date.prototype.format_CN = function() {
		
	}

	//为checkbox添加单选效果
	$(document).on({
		click: function(){
			$(".radios").not(this).attr("checked", false);
		}
	}, ".radios");

	//为需要本地存储的输入框绑定事件
	$(document).on({
		keyup: function(){
			localStorage[$(this).attr('localSave')] = $(this).val();
		}
	}, "input[type=text][localSave]");

	//为需要本地存储的下拉列表绑定事件
	$(document).on({
		change: function(){
			localStorage[$(this).attr('localSave')] = $(this).val();
		}
	}, "select[localSave]");

	//为需要本地存储的下拉列表绑定事件
	$(document).on({
		click: function(){
			localStorage[$(this).attr('localSave')] = $(this).is(':checked');
		}
	}, "input[type=checkbox][localSave]");
})

/**
 * 预览input[type=file]选中的图片
 */
function previewInputImg(inputObj, previewObj) {
	previewObj.src = window.URL.createObjectURL(inputObj.files.item(0));
	/*if (!!window.ActiveXObject || "ActiveXObject" in window) { // IE 
		previewObj.src = inputObj.value; 
	} else { // 其他
		previewObj.src = window.URL.createObjectURL(inputObj.files.item(0)); 
	}*/
} 

/** 
* 将本地图片 显示到浏览器上 
*/ 
function preImg(sourceId, targetId) { 
	var url = getFileUrl(sourceId); 
	var imgPre = document.getElementById(targetId); 
	imgPre.src = url; 
}

(function($){
	/**
	 * 同步ajax请求
	 */
	$.ajaxSync = function(url, param, callback, dataType, type){
		$.ajax({
			type: type || "post",
			url: url,
			data: param,
			async: false,
			dataType: dataType || "json",
			success: function(data){
				callback(data);
			}
		});
	}

	/**
	 * 合并table中指定列的单元格
	 * @param { index_arr } 列下标数组
	 */
	$.fn.mergeCell = function(index_arr){
		var $tab = this;
		$(index_arr).each(function(){
			var mer_list = $("td:nth-child(" + this + ")", $tab);
			var mer_num = 1,
				mer_val = "",
				cell_obj = mer_list.eq(0);
			mer_list.each(function(i){
				var this_mer_val = $(".merge", this).val();
				if(i < mer_list.size() - 1){
					if(mer_val == this_mer_val){
						mer_num += 1;
						$(this).hide();
					} else {
						cell_obj.attr("rowspan", mer_num);
						cell_obj = $(this);
						mer_num = 1;
					}
				} else if(i == mer_list.size() - 1){
					if(mer_val == this_mer_val){
						cell_obj.attr("rowspan", mer_num + 1);
						$(this).hide();
					} else {
						cell_obj.attr("rowspan", mer_num);
					}
				}
				mer_val = this_mer_val;
			});
		});
		return this;
	}

	//覆盖元素
	$.fn.cover = function(){
		this.css("position", "relative").append(
			'<div style="'+
			'	position: absolute;'+
			'	top: 0;'+
			'	left: 0;'+
			'	width: 100%;'+
			'	height: 100%;'+
			'"></div>'
		);
		return this;
	}

	//将本地存储的数据填充到表单项中
	$.fn.localRead = function(){
		$('input[type=text][localSave]', this).each(function(){
			var value = localStorage[$(this).attr('localSave')];
			$(this).val(value);
		});

		$('input[type=checkbox][localSave]', this).each(function(){
			var value = localStorage[$(this).attr('localSave')];
			$(this).prop('checked', Boolean(value));
		});
		
		$('select[localSave]', this).each(function(){
			var value = localStorage[$(this).attr('localSave')];
			$('option[value="' + value + '"]', this).attr('selected', true);
		});
		return this;
	}

	//将本地存储的数据清空
	$.fn.localClear = function(){
		$('[localSave]', this).each(function(){
			localStorage.removeItem($(this).attr('localSave'));
		});
	}
})(jQuery);