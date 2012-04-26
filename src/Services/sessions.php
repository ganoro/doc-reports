<?php
/**
 * Sessions API
*/

/**
 * Create a new session
 *
 * @param Request $req        	
 * @param Response $res        	
 * @param string $name
 *        	session's name
 * @param string $title
 *        	Dr. or Prof.
 * @return multitype:unknown
 */
function sessions_create($req, $res, $date, $comments, $uid) {
	$date = formatDate ( $date );
	$query = 'INSERT INTO sessions (`date`, `comments`, `uid`) VALUES (\'' . $date . '\', \'' . $comments . '\', \'' . $uid . '\')';
	$result = runQuery ( $query );
	return array (
			"id" => $result 
	);
}

/**
 * update sessions details
 *
 * @param Request $req        	
 * @param Response $res        	
 * @param string $id
 *        	session id
 */
function sessions_update($req, $res, $id, $date, $comments) {
	$date = formatDate ( $date );
	$query = 'UPDATE sessions SET `date` = \'' . $date . '\', `comments` = \'' . $comments . '\' WHERE `sessions`.`id` = ' . $id;
	$result = runQuery ( $query );
	return array (
			"id" => $id 
	);
}

/**
 * Removes the sessions from the list
 *
 * @param Request $req        	
 * @param Response $res        	
 * @param string $id
 *        	session to remove
 * @return string
 */
function sessions_delete($req, $res, $id) {
	$query = 'DELETE FROM sessions WHERE `id` =' . $id;
	$result = runQuery ( $query );
	return 'removed';
}

/**
 * List all sessions
 *
 * @param Request $req        	
 * @param Response $res        	
 * @return array
 */
function sessions_read($req, $res, $uid = 1) {
	$query = 'SELECT * from sessions WHERE `uid` =' . $uid;
	return runQuery ( $query );
}

/**
 *
 * @param
 *        	title
 */
function formatDate($date) {
	return $date;
}
