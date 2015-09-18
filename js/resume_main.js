require.config({
	baseUrl: 'js/app',
	paths: {
		'jquery':       '../lib/jquery-1.11.2.min',
		'jq_mouse':     '../lib/jquery.mousewheel.min',
		'bs':           '../lib/bootstrap.min'
	},
	shim: {
		'jq_mouse': ['jquery'],
		'bs': ['jquery']
	}
});

require(['resume_index'], function(index){
	index.init();
});

