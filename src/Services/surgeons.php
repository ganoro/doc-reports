<?php
/**
 * Surgeons API
 */

/**
 * Create a new surgeon
 *
 * @param Request $req        	
 * @param Response $res        	
 * @param string $name
 *        	Surgeon's name
 * @param string $title
 *        	Dr. or Prof.
 * @return multitype:unknown
 */
function surgeons_create($req, $res, $name, $title, $uid) {
	$title = getTitle ( $title );
	$query = 'INSERT INTO surgeons (`name`, `title`, `uid`) VALUES (\'' . $name . '\', \'' . $title . '\', \'' . $uid . '\')';
	$result = runQuery ( $query );
	return array (
			"id" => $result 
	);
}

/**
 * update surgeons details
 *
 * @param Request $req        	
 * @param Response $res        	
 * @param string $id
 *        	surgeon id
 */
function surgeons_update($req, $res, $id, $name, $title) {
	$title = getTitle ( $title );
	$query = 'UPDATE surgeons SET `name` = \'' . $name . '\', `title` = \'' . $title . '\' WHERE `surgeons`.`id` = ' . $id;
	$result = runQuery ( $query );
	return array (
			"id" => $id 
	);
}

/**
 * Removes the surgeons from the list
 *
 * @param Request $req        	
 * @param Response $res        	
 * @param string $id
 *        	surgeon to remove
 * @return string
 */
function surgeons_delete($req, $res, $id) {
	$query = 'DELETE FROM surgeons WHERE `id` =' . $id;
	$result = runQuery ( $query );
	return array (
			'id' => $id 
	);
}

/**
 * List all surgeons
 *
 * @param Request $req        	
 * @param Response $res        	
 * @return array
 */
function surgeons_read($req, $res, $uid = 1) {
	$query = 'SELECT * from surgeons WHERE `uid` =' . $uid;
	return runQuery ( $query );
}

/**
 *
 * @param
 *        	title
 */
function getTitle($title) {
	if ($title == 1 || $title == 'Prof.') {
		$title = 'Prof.';
	} else {
		$title = 'Dr.';
	}
	return $title;
}

