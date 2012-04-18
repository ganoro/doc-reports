define([
// Load the original jQuery source file
'order!http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js' ],
		function() {
			// Tell Require.js that this module returns a reference to jQuery
			return $;
		});