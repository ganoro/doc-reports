<?php
require_once 'Gateful/Main.php';

$gateful->router ( array (
		// users
		array (
				'/users/login',
				'users_login' 
		),
		// sessions
		array (
				'/sessions/create',
				'sessions_create' 
		),
		array (
				'/sessions/edit',
				'sessions_edit' 
		),
		array (
				'/sessions/remove',
				'sessions_remove' 
		),
		array (
				'/sessions/list',
				'sessions_list' 
		),
		// shifts
		array (
				'/shifts/create',
				'shifts_create' 
		),
		array (
				'/shifts/edit',
				'shifts_edit' 
		),
		array (
				'/shifts/remove',
				'shifts_remove' 
		),
		array (
				'/shifts/list',
				'shifts_list' 
		),
		// surgeries
		array (
				'/surgeries/create',
				'surgeries_create' 
		),
		array (
				'/surgeries/edit',
				'surgeries_edit' 
		),
		array (
				'/surgeries/remove',
				'surgeries_remove' 
		),
		array (
				'/surgeries/list',
				'surgeries_list' 
		), 
		// doctors
		array (
				'/doctors/create',
				'doctors_create' 
		),
		array (
				'/doctors/edit',
				'doctors_edit' 
		),
		array (
				'/doctors/remove',
				'doctors_remove' 
		),
		array (
				'/doctors/list',
				'doctors_list' 
		), 
		// operations
		array (
				'/operations/create',
				'operations_create' 
		),
		array (
				'/operations/edit',
				'operations_edit' 
		),
		array (
				'/operations/remove',
				'operations_remove' 
		),
		array (
				'/operations/list',
				'operations_list' 
		) 
) );

$gateful->send ();
