define([
// Load the original jQuery source file
'order!http://code.jquery.com/mobile/1.1.0/jquery.mobile-1.1.0.min.js' ],
		function() {
			// Tell Require.js that this module returns a reference to jQuery
			return $.mobile;
		}); 