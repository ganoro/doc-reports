<?php
/**
 * Surgeries API
 */

/**
 *
 * @param Request $req        	
 * @param Response $res        	
 * @param string $date        	
 * @param string $op_type        	
 * @param string $first        	
 * @param string $second        	
 * @param string $third        	
 * @param string $patient_id        	
 * @param string $patient_name        	
 * @param string $comments        	
 * @param string $uid        	
 * @return array
 */
function surgeries_create($req, $res, $date, $op_type, $first, $second, $patient_id, $patient_name, $comments, $uid) {
	$date = formatDate ( $date );
	$query = 'INSERT INTO surgeries (`date`, `op_type`, `first`, `second`, `patient_id`, `patient_name`, `comments`, `uid`) VALUES (\'' . $date . '\', \'' . $op_type . '\',\'' . $first . '\', \'' . $second . '\', \'' . $patient_id . '\', \'' . $patient_name . '\', \'' . $comments . '\', \'' . $uid . '\')';
	$result = runQuery ( $query );
	return array (
			"id" => $result 
	);
}

/**
 *
 * @param Request $req        	
 * @param Response $res        	
 * @param string $id        	
 * @param string $date        	
 * @param string $op_type        	
 * @param string $first        	
 * @param string $second        	
 * @param string $third        	
 * @param string $patient_id        	
 * @param string $patient_name        	
 * @param string $comments        	
 * @return string
 */
function surgeries_update($req, $res, $id, $date, $op_type, $first, $second, $third, $patient_id, $patient_name, $comments) {
	$date = formatDate ( $date );
	$query = 'UPDATE surgeries SET `date` = \'' . $date . '\', `op_type` = \'' . $op_type . '\', `first` = \'' . $first . '\', `second` = \'' . $second . '\', `third` = \'' . $third . '\', `patient_id` = \'' . $patient_id . '\', `patient_name` = \'' . $patient_name . '\', `comments` = \'' . $comments . '\' WHERE `surgeries`.`id` = ' . $id;
	$result = runQuery ( $query );
	return array (
			'id' => $id 
	);
}

/**
 *
 * @param unknown_type $req        	
 * @param unknown_type $res        	
 * @param unknown_type $id        	
 * @return multitype:unknown
 */
function surgeries_delete($req, $res, $id) {
	$query = 'DELETE FROM surgeries WHERE `id` =' . $id;
	$result = runQuery ( $query );
	return array (
			'id' => $id 
	);
}

/**
 *
 * @param unknown_type $req        	
 * @param unknown_type $res        	
 * @param unknown_type $uid        	
 * @return multitype:
 */
function surgeries_read($req, $res, $uid) {
	$query = 'SELECT * from surgeries WHERE `uid` =' . $uid;
	return runQuery ( $query );
}

