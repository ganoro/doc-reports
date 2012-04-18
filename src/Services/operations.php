<?php
/**
 * Operations API
 */

/**
 * Create a new operation
 *
 * @param Request $req        	
 * @param Response $res        	
 * @param string $name
 *        	operation's name
 * @return array - id of the newly created record
 */
function operations_create($req, $res, $name, $uid) {
	$query = 'INSERT INTO operations (`name`, `uid`) VALUES (\'' . $name . '\', \'' . $uid . '\')';
	$result = runQuery ( $query );
	return array (
			'id' => $result 
	);
}

/**
 * update operation details
 *
 * @param Request $req        	
 * @param Response $res        	
 * @param string $id
 *        	operations id
 */
function operations_update($req, $res, $id, $name) {
	$query = 'UPDATE operations SET `name` = \'' . $name . '\' WHERE `operations`.`id` = ' . $id;
	$result = runQuery ( $query );
	return array (
			'id' => $id 
	);
}

/**
 * Removes the operations from the list
 *
 * @param Request $req        	
 * @param Response $res        	
 * @param string $id
 *        	operations to remove
 * @return string
 */
function operations_delete($req, $res, $id) {
	$query = 'DELETE FROM operations WHERE `id` =' . $id;
	$result = runQuery ( $query );
	return array (
			'id' => $id 
	);
}

/**
 * List all operations
 *
 * @param Request $req        	
 * @param Response $res        	
 * @return array
 */
function operations_read($req, $res, $uid = 1) {
	$query = 'SELECT * from operations WHERE `uid` = ' . $uid;
	return runQuery ( $query );
}

