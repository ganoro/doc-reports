<?php
set_include_path ( get_include_path () . PATH_SEPARATOR . '../library' . PATH_SEPARATOR . '../src' );
require_once 'Gateful/Main.php';
require_once 'Services/all.php';

// users
$gateful->get ( '/doc-reports/users/login', 'users_login' );

// sessions
$gateful->post ( '/doc-reports/sessions/create', 'sessions_create' );
$gateful->post ( '/doc-reports/sessions/update', 'sessions_update' );
$gateful->post ( '/doc-reports/sessions/delete', 'sessions_delete' );
$gateful->get ( '/doc-reports/sessions/read', 'sessions_read' );
// shifts
$gateful->post ( '/doc-reports/shifts/create', 'shifts_create' );
$gateful->post ( '/doc-reports/shifts/update', 'shifts_update' );
$gateful->post ( '/doc-reports/shifts/delete', 'shifts_delete' );
$gateful->get ( '/doc-reports/shifts/read', 'shifts_read' );
// surgeries
$gateful->post ( '/doc-reports/surgeries/create', 'surgeries_create' );
$gateful->post ( '/doc-reports/surgeries/update', 'surgeries_update' );
$gateful->post ( '/doc-reports/surgeries/delete', 'surgeries_delete' );
$gateful->get ( '/doc-reports/surgeries/read', 'surgeries_read' );
// doctors
$gateful->post ( '/doc-reports/surgeons/create', 'surgeons_create' );
$gateful->post ( '/doc-reports/surgeons/update', 'surgeons_update' );
$gateful->post ( '/doc-reports/surgeons/delete', 'surgeons_delete' );
$gateful->get ( '/doc-reports/surgeons/read', 'surgeons_read' );
// operations
$gateful->post ( '/doc-reports/operations/create', 'operations_create' );
$gateful->post ( '/doc-reports/operations/update', 'operations_update' );
$gateful->post ( '/doc-reports/operations/delete', 'operations_delete' );
$gateful->get ( '/doc-reports/operations/read', 'operations_read' );

// backbone - style
$gateful->get ( '/doc-reports/operations', 'operations_read' );
$gateful->get ( '/doc-reports/operations/:id', 'operations_read' );
$gateful->post ( '/doc-reports/operations', 'operations_create' );
$gateful->delete ( '/doc-reports/operations/:id', 'operations_delete' );
$gateful->put ( '/doc-reports/operations/:id', 'operations_update' );

$gateful->send ();

