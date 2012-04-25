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
		'form.shifts', 'form.sessions', 'form.surgeries', 'app.sessions', 'app.shifts', 'app.surgeries' ], function($, mobile, AppOperationView,
		AppSurgeonView, ShiftFormView, SessionFormView, SurgeryFormView, AppSessions, AppShifts, AppSurgeries) {
	
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
