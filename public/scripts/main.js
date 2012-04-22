require.config({
	paths : {
		'jquery' : '../lib/require-jquery',
		'mobile' : '../lib/mobile',
		'underscore' : '../lib/underscore',
		'backbone' : '../lib/backbone',
		'moment' : '../lib/moment',
		'swipeButton' : '../lib/jquery.swipeButton-1.2'
	}

});

require([ 'jquery', 'mobile', 'app.operations', 'app.surgeons',
		'app.shifts.form', 'app.sessions.form' ], function($, mobile, AppOperationView,
		AppSurgeonView, ShiftFormView, SessionFormView) {
	$.mobile.hashListeningEnabled = false;
	var opView = new AppOperationView;
	var srView = new AppSurgeonView;
	var sfFormView = new ShiftFormView;
	var ssFormView = new SessionFormView;
});
