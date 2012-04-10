<?php
set_include_path ( get_include_path () . PATH_SEPARATOR . '../library' . PATH_SEPARATOR . '../src' );
require_once 'Gateful/Main.php';
require_once 'Services/all.php';

$gateful->router ( array (
		// users
		'/doc-reports/users/login' => 'users_login',
		// sessions
		'/doc-reports/sessions/create' => 'sessions_create',
		'/doc-reports/sessions/edit' => 'sessions_edit',
		'/doc-reports/sessions/remove' => 'sessions_remove',
		'/doc-reports/sessions/list' => 'sessions_list',
		// shifts
		'/doc-reports/shifts/create' => 'shifts_create',
		'/doc-reports/shifts/edit' => 'shifts_edit',
		'/doc-reports/shifts/remove' => 'shifts_remove',
		'/doc-reports/shifts/list' => 'shifts_list',
		// surgeries
		'/doc-reports/surgeries/create' => 'surgeries_create',
		'/doc-reports/surgeries/edit' => 'surgeries_edit',
		'/doc-reports/surgeries/remove' => 'surgeries_remove',
		'/doc-reports/surgeries/list' => 'surgeries_list',
		// doctors
		'/doc-reports/surgeons/create' => 'surgeons_create',
		'/doc-reports/surgeons/edit' => 'surgeons_edit',
		'/doc-reports/surgeons/remove' => 'surgeons_remove',
		'/doc-reports/surgeons/list' => 'surgeons_list',
		// operations
		'/doc-reports/operations/create' => 'operations_create',
		'/doc-reports/operations/edit' => 'operations_edit',
		'/doc-reports/operations/remove' => 'operations_remove',
		'/doc-reports/operations/list' => 'operations_list' 
) );

$gateful->send ();
