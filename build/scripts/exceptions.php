<?php
set_error_handler ( 'my_error_handler' );
set_exception_handler ( 'my_exception_handler' );
function my_exception_handler($e) {
	global $appLocation;
	file_put_contents ( $appLocation . '/public/installing.html', 'Huston! We have a problem: ' . $e );
}
function my_error_handler($no, $str, $file, $line) {
	$e = new ErrorException ( $str, $no, 0, $file, $line );
	my_exception_handler ( $e );
	/*
	 * Do not throw, simply call error handler with exception object
	 */
}

