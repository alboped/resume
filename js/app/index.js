define(['jquery', 'jqm'], function($) {
	function init () {
		$('#main_footer button').click(function(){
			var icon = $(this).attr('data-icon');
			if(icon.indexOf('_link') == -1){
				$.mobile.loading('show', {  
					text: '加载中...',  //加载器中显示的文字  
					textVisible: true, //是否显示文字  
					theme: 'b',        //加载器主题样式a-e  
					textonly: false,   //是否只显示文字  
					html: ""           //要显示的html内容，如图片等  
				});
				var active_menu = $('#main_footer button[data-icon$=link]');
				if(active_menu.size()){
					var icon_str = active_menu.attr('data-icon');
					active_menu.attr('data-icon', icon_str.replace('_link', ''));
				}
				$(this).attr('data-icon', icon + '_link');
			}
		});
	}

	return {
		init: init
	}
});