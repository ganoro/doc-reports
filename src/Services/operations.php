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
function operations_create($req, $res, $name) {
	$query = 'INSERT INTO operations (`name`) VALUES (\'' . $name . '\')';
	$result = runQuery ( $query );
	return array (
			"id" => $result 
	);
}

/**
 * Edit operation details
 *
 * @param Request $req        	
 * @param Response $res        	
 * @param string $id
 *        	operations id
 */
function operations_edit($req, $res, $id, $name) {
	$query = 'UPDATE operations SET `name` = \'' . $name . '\' WHERE `operations`.`id` = ' . $id;
	$result = runQuery ( $query );
	return 'edited';
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
function operations_remove($req, $res, $id) {
	$query = 'DELETE FROM operations WHERE `id` =' . $id;
	$result = runQuery ( $query );
	return 'removed';
}

/**
 * List all operations
 *
 * @param Request $req        	
 * @param Response $res        	
 * @return array
 */
function operations_list($req, $res) {
	$query = 'SELECT * from operations';
	return runQuery ( $query );
}
