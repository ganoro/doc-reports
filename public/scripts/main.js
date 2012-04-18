require.config({
	paths : {
		'jquery' : '../lib/require-jquery',
		'mobile' : '../lib/mobile',
		'underscore' : '../lib/underscore',
		'backbone' : '../lib/backbone',
		'swipeButton' : '../lib/jquery.swipeButton.min-1.2'
	}

});

require([ 'jquery', 'mobile', 'app' ], function($, mobile, AppView) {
	$.mobile.hashListeningEnabled = false; 
	var app_view = new AppView;
});
