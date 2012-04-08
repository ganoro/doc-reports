<?php
/**
 * @return string the container db host
 */
function getDbHost() {
	return get_cfg_var ( 'zend_developer_cloud.db.host' );
}

/**
 * @return string the container db name
 */
function getDbName() {
	return get_cfg_var ( 'zend_developer_cloud.db.name' );
}

/**
 * @return string the container db user
 */
function getDbUser() {
	return get_cfg_var ( 'zend_developer_cloud.db.username' );
}

/**
 * @return string the container db password
 */
function getDbPassword() {
	return get_cfg_var ( 'zend_developer_cloud.db.password' );
}

function runQuery($query) {
	$link = mysqli_connect(getDbHost(), getDbUser(), getDbPassword(), getDbName());
	
	/* check connection */
	if (mysqli_connect_errno()) {
		throw new Exception("error connecting db " . mysqli_connect_error());
	}
	
	/* execute multi query */
	mysqli_multi_query($link, $query);
	
	/* close connection */
	mysqli_close($link);
}
