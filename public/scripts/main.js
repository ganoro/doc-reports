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

require([ 'jquery', 'mobile', 'app.operations', 'app.surgeons', 'app.sessions',
		'app.shifts', 'app.surgeries', 'form.shifts', 'form.sessions',
		'form.surgeries' ], function($, mobile, AppOperationView,
		AppSurgeonView, AppSessions, AppShifts, AppSurgeries, ShiftFormView,
		SessionFormView, SurgeryFormView) {

	$.mobile.hashListeningEnabled = false;

	var opView = new AppOperationView;
	var srView = new AppSurgeonView;
	var ssView = new AppSessions;
	var sfView = new AppShifts;
	var sfView = new AppSurgeries;
	var sfFormView = new ShiftFormView;
	var ssFormView = new SessionFormView;
	var srFormView = new SurgeryFormView;

});
