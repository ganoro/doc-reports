// Filename: libs/underscore/underscore
// As above lets load the original underscore source code
define(
		[ 'order!http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.3.3/underscore-min.js' ],
		function() {
			// Tell Require.js that this module returns a reference to
			// Underscore
			return _;
		});