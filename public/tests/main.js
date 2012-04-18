require.config({
	paths : {
		'jq' : '../lib/jquery',
		'mobile' : '../lib/mobile',
		'underscore' : '../lib/underscore',
		'backbone' : '../lib/backbone',
	}

});

require([ 'jq', "./qunit", "./swarm", "../lib/gateway-min.js",
		"../scripts/api.js", "./tests" ], function($) {

});
