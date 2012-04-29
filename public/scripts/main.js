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

	(function() {
    	var e = document.createElement('script');
    	e.async = true;
    	e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
    	document.getElementById('fb-root').appendChild(e);
    }());

    window.fbAsyncInit = function() {
    	FB.init({
    		appId : '329484390424505',
    		channelUrl : "http://royganor54.my.phpcloud.com/doc-reports/channel.php",
    		status : true,
    		cookie : true,
    		xfbml : true,
    		oauth : true
    	});

    	FB.getLoginStatus(function(response) {
    		if (response.status === 'connected') {
    			window.uid = response.authResponse.userID;
    			document.getElementById('surgeon-uid').value = uid;
    			document.getElementById('operation-uid').value = uid;
    			document.getElementById('shift-uid').value = uid;
    			document.getElementById('session-uid').value = uid;
    			document.getElementById('surgery-uid').value = uid;
    			document.getElementById('reports-link').href = 'reports?uid=' + uid;
    			
    			var opView = new AppOperationView;
    			var srView = new AppSurgeonView;
    			var ssView = new AppSessions;
    			var sfView = new AppShifts;
    			var sfView = new AppSurgeries;
    			var sfFormView = new ShiftFormView;
    			var ssFormView = new SessionFormView;
    			var srFormView = new SurgeryFormView;
    			
    		} else if (response.status === 'not_authorized') {
    			alert("not auth");
    		} else {
    			alert("not logged");
    			FB.login(function(response) {
    				alert(response);
    			}, {
    				scope : 'email'
    			});
    		}
    	});
    };	
	
});
