<?php
/**
 * @return string the container db host
 */
function getDbHost() {
	return get_cfg_var ( 'zend_developer_cloud.db.host' );
}

/**
 *
 * @return string the container db name
 */
function getDbName() {
	return get_cfg_var ( 'zend_developer_cloud.db.name' );
}

/**
 *
 * @return string the container db user
 */
function getDbUser() {
	return get_cfg_var ( 'zend_developer_cloud.db.username' );
}

/**
 *
 * @return string the container db password
 */
function getDbPassword() {
	return get_cfg_var ( 'zend_developer_cloud.db.password' );
}

/**
 * @param string $query
 * @throws Exception
 * @return array
 */
function runQuery($query) {
	global $appLocation;
	$mysqli = mysqli_connect ( getDbHost (), getDbUser (), getDbPassword (), getDbName () );
	
	/* check connection */
	if (mysqli_connect_errno ()) {
		throw new Exception ( "error connecting db " . mysqli_connect_error () );
	}
	
	$result = mysqli_query ( $mysqli, $query );
	if (! $result) {
		throw new Exception ( 'Failed running query ' . mysqli_error_list ( $mysqli ) );
	}
	
	if (substr($query, 0, 6) == 'INSERT') {
		$r = mysqli_insert_id($mysqli);
	} else {
		while ($out = mysqli_fetch_array ( $result, MYSQLI_ASSOC )) {
			$r[] = $out;
		}
	}
	
	/* Select queries return a resultset */
	
	/* free result set */
	mysqli_free_result ( $result );
	
	/* close connection */
	mysqli_close ( $mysqli );
	
	return $r;
}
