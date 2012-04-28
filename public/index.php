<?php
set_include_path ( get_include_path () . PATH_SEPARATOR . '../library' . PATH_SEPARATOR . '../src' );
require_once 'Gateful/Main.php';
require_once 'Services/all.php';

// bb style - operations
$gateful->get ( '/doc-reports/operations', 'operations_read' );
$gateful->get ( '/doc-reports/operations/:id', 'operations_read' );
$gateful->post ( '/doc-reports/operations', 'operations_create' );
$gateful->delete ( '/doc-reports/operations/:id', 'operations_delete' );
$gateful->put ( '/doc-reports/operations/:id', 'operations_update' );

// bb style - surgeons
$gateful->get ( '/doc-reports/surgeons', 'surgeons_read' );
$gateful->get ( '/doc-reports/surgeons/:id', 'surgeons_read' );
$gateful->post ( '/doc-reports/surgeons', 'surgeons_create' );
$gateful->delete ( '/doc-reports/surgeons/:id', 'surgeons_delete' );
$gateful->put ( '/doc-reports/surgeons/:id', 'surgeons_update' );

// bb style - shifts
$gateful->get ( '/doc-reports/shifts', 'shifts_read' );
$gateful->get ( '/doc-reports/shifts/:id', 'shifts_read' );
$gateful->post ( '/doc-reports/shifts', 'shifts_create' );
$gateful->delete ( '/doc-reports/shifts/:id', 'shifts_delete' );
$gateful->put ( '/doc-reports/shifts/:id', 'shifts_update' );

// bb style - sessions
$gateful->get ( '/doc-reports/sessions', 'sessions_read' );
$gateful->get ( '/doc-reports/sessions/:id', 'sessions_read' );
$gateful->post ( '/doc-reports/sessions', 'sessions_create' );
$gateful->delete ( '/doc-reports/sessions/:id', 'sessions_delete' );
$gateful->put ( '/doc-reports/sessions/:id', 'sessions_update' );

// bb style - surgeries
$gateful->get ( '/doc-reports/surgeries', 'surgeries_read' );
$gateful->get ( '/doc-reports/surgeries/:id', 'surgeries_read' );
$gateful->post ( '/doc-reports/surgeries', 'surgeries_create' );
$gateful->delete ( '/doc-reports/surgeries/:id', 'surgeries_delete' );
$gateful->put ( '/doc-reports/surgeries/:id', 'surgeries_update' );

// bb style - reports
$gateful->get ( '/doc-reports/reports', 'generate_report' );


$gateful->send ();

/*
// users
$gateful->get ( '/doc-reports/users/login', 'users_login' );
*/