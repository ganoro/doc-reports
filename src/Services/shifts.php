<?php
/**
 * Shifts API
 */

/**
 * Create a new shift
 *
 * @param Request $req        	
 * @param Response $res        	
 * @param string $date        	
 * @param string $comments        	
 * @param string $uid        	
 * @return array added id
 */
function shifts_create($req, $res, $date, $comments, $uid) {
	$date = formatDate ( $date );
	$query = 'INSERT INTO shifts (`date`, `comments`, `uid`) VALUES (\'' . $date . '\', \'' . $comments . '\', \'' . $uid . '\')';
	$result = runQuery ( $query );
	return array (
			"id" => $result 
	);
}

/**
 * update shifts details
 *
 * @param Request $req        	
 * @param Response $res        	
 * @param string $id
 *        	shift id
 */
function shifts_update($req, $res, $id, $date, $comments) {
	$date = formatDate ( $date );
	$query = 'UPDATE shifts SET `date` = \'' . $date . '\', `comments` = \'' . $comments . '\' WHERE `shifts`.`id` = ' . $id;
	$result = runQuery ( $query );
	return array (
			'id' => $id 
	);
}

/**
 * Removes the shifts from the list
 *
 * @param Request $req        	
 * @param Response $res        	
 * @param string $id
 *        	shift to remove
 * @return string
 */
function shifts_delete($req, $res, $id) {
	$query = 'DELETE FROM shifts WHERE `id` =' . $id;
	$result = runQuery ( $query );
	return 'removed';
}

/**
 * List all shifts
 *
 * @param Request $req        	
 * @param Response $res        	
 * @return array
 */
function shifts_read($req, $res, $uid = 1) {
	$query = 'SELECT * from shifts WHERE `uid` =' . $uid;
	return runQuery ( $query );
}

