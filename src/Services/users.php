<?php
/**
 * Users API
 */

/**
 * Login a user (register if first time visit)
 * 
 * @param Request $req        	
 * @param Response $res        	
 * @param string $id        	
 * @param string $name        	
 * @return array
 */
function users_login($req, $res, $id, $name) {
	$query = 'SELECT `id` from `users` WHERE `id` =' . $id;
	$result = runQuery ( $query );
	
	if (sizeof ( $result ) == 0) {
		// register
		$query = 'INSERT INTO users (`id`, `name`, `last_login`) VALUES (\'' . $id . '\', \'' . $name . '\', \'' . date () . '\')';
		$id = runQuery ( $query );
	} else {
		// modify last date
	}
	return array (
			'id' => $id 
	);
}
