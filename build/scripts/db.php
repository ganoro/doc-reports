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
	global $appLocation;
	file_put_contents($appLocation . '/public/install.html', "before connect");
	
	$mysqli = mysqli_connect(getDbHost(), getDbUser(), getDbPassword(), getDbName());
	
	file_put_contents($appLocation . '/public/install.html', "after connect");
	
	/* check connection */
	if (mysqli_connect_errno()) {
		throw new Exception("error connecting db " . mysqli_connect_error());
	}
	
	file_put_contents($appLocation . '/public/install.html', "before query");
	
	/* execute multi query */
	$r = mysqli_multi_query($mysqli, $query);
	if (!$r) {
		throw new Exception('Failed running query ' . mysqli_error_list($mysqli));
	}
	do {
		/* store first result set */
		if ($result = $mysqli->store_result()) {
			while ($row = $result->fetch_row()) {
				printf("%s\n", $row[0]);
			}
			$result->free();
		}
		/* print divider */
		if ($mysqli->more_results()) {
			printf("-----------------\n");
		}
	} while ($mysqli->next_result());	
	
	file_put_contents($appLocation . '/public/install.html', "after query > " . $query . ' < ');
	
	/* close connection */
	mysqli_close($mysqli);
}

