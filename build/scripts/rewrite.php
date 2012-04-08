<?php
/**
 * modify htaccess with baseURL
 * @param string $appLocation
 */
function handleRewrite($appLocation) {
	$htaccess_file = $appLocation . '/public/.htaccess';
	$explode = explode ( '/', $appLocation );
	$appname = $explode [sizeof ( $explode ) - 2];
	$content = file_get_contents ( $htaccess_file );
	$content = str_replace ( '<application-name>', $appname, $content );
	file_put_contents ( $htaccess_file, $content );
}

