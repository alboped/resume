require.config({
	baseUrl: 'js/app',
	paths: {
		'jquery': '../lib/jquery-1.11.2.min',
		'jqm': '../lib/jquery.mobile-1.4.5.min',
		'iscroll': '../lib/iscroll',
		'dlist': '../lib/datelist',
		'common': '../common',
		'base': '../base'
	},
	shim: {
		'jqm': ['jquery'],
		'dlist': ['jquery', 'iscroll'],
		'common': ['jquery'],
		'base': ['jquery']
	}
});
require(['jquery', 'jqm'], function($){

	/**
	 * 全局事件
	 */
	//全局ajax事件
	$(document).ajaxSuccess(function(evt, request, settings){
		if(request.responseText[0] != "<" && $.parseJSON(request.responseText).status.errCode == "login_error"){
			alert("该帐号已在其他地方登录，请重新登录！");
			location.href = "login.html";
		}
	});

	$('.page').css("visibility", "inherit");
	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

	//导航切换事件
	$('#main_footer a').click(function(){
		var icon = $(this).attr('data-icon');
			title = $(this).text();
		$.mobile.loading('show');
		var active_menu = $('#main_footer .active_menu');
		if(active_menu.size()){
			var icon_str = active_menu.attr('data-icon');
			active_menu.removeClass('ui-icon-' + icon_str + '-link').removeClass('active_menu').addClass('ui-icon-' + icon_str);
		}
		$(this).removeClass('ui-icon-' + icon).addClass('ui-icon-' + icon + '-link').addClass('active_menu');

		require([$(this).data('menu')], function(module){
			module.init(function(){
				$('#main_title').text(title);
				$.mobile.loading('hide');
			});
		})		
	});

	$(document).ready(function(){
		$('#startPage').click();
	});

	$(document).on({
		'pagebeforeshow': function(){
			$.mobile.loading('show');
		},
		'pageshow': function(){
			$.mobile.loading('hide');
		}
	}, '#main_page');

	$(document).on({
		'pagebeforeshow': function(){
			$.mobile.loading('show');
			require(['student_order'], function(so_module){
				so_module.init(function(){
					$.mobile.loading('hide');
				});
			})
		}
	}, '#student_order');
});

