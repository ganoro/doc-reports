<?php
/**
 * Reports API
 */

/**
 * Generate report API
 *
 * @param unknown_type $req        	
 * @param unknown_type $res        	
 * @param unknown_type $isMonthly        	
 * @param unknown_type $timeUnit        	
 * @param unknown_type $uid        	
 */
function generate_report($req, $res, $isMonthly = true, $timeUnit = null, $uid = 1) {
	if ($isMonthly) {
		if (is_null ( $timeUnit ) || ! is_numeric ( $timeUnit ) || $timeUnit > 12 || $timeUnit < 1) {
			$timeUnit = date ( 'M' );
		}
	} else {
		if (is_null ( $timeUnit )) {
			$timeUnit = date ( 'Y' );
		}
	}
	
	require_once 'PHPExcel/PHPExcel.php';
	$objPHPExcel = new PHPExcel ();
	
	header ( 'Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' );
	header ( 'Content-Disposition: attachment;filename="report_' . ($isMonthly ? 'monthly' : 'yearly') . date ( 'YMDhm' ) . '.xlsx"' );
	header ( 'Cache-Control: max-age=0' );
	
	// Set properties
	$objPHPExcel->getProperties ()->setCreator ( "Roy Ganor" )->setTitle ( "Doctors Report" )->setSubject ( "Doctors Report" )->setDescription ( "Doctors Report" );
	
	writeSurgeries ( $req, $res, $uid, $objPHPExcel );
	writeShifts ( $req, $res, $uid, $objPHPExcel );
	writeSessions ( $req, $res, $uid, $objPHPExcel );
	writeSurgeons ( $req, $res, $uid, $objPHPExcel );
	writeOperations ( $req, $res, $uid, $objPHPExcel );
	
	$objPHPExcel->setActiveSheetIndex ( 0 );
	
	$objWriter = PHPExcel_IOFactory::createWriter ( $objPHPExcel, 'Excel2007' );
	$objWriter->save ( 'php://output' );
}

/**
 *
 * @param
 *        	req
 * @param
 *        	res
 * @param
 *        	uid
 * @param
 *        	objPHPExcel
 */
function writeSurgeries($req, $res, $uid, $objPHPExcel) {
	$objPHPExcel->getActiveSheet ()->setTitle ( 'Surgeries' );
	$objPHPExcel->getActiveSheet ()->setCellValue ( 'A1', 'ID' );
	$objPHPExcel->getActiveSheet ()->setCellValue ( 'B1', 'Date' );
	$objPHPExcel->getActiveSheet ()->setCellValue ( 'C1', 'Operation' );
	$objPHPExcel->getActiveSheet ()->setCellValue ( 'D1', 'Surgeon First' );
	$objPHPExcel->getActiveSheet ()->setCellValue ( 'E1', 'Surgeon Second' );
	$objPHPExcel->getActiveSheet ()->setCellValue ( 'F1', 'Patient ID' );
	$objPHPExcel->getActiveSheet ()->setCellValue ( 'G1', 'Patient Name' );
	$objPHPExcel->getActiveSheet ()->setCellValue ( 'H1', 'Pathology' );
	$objPHPExcel->getActiveSheet ()->setCellValue ( 'I1', 'Comments' );
	$objPHPExcel->getActiveSheet ()->setCellValue ( 'J1', 'UID' );
	$surgeries = surgeries_read ( $req, $res, $uid );
	printArray ( $objPHPExcel, $surgeries );
	
	updateVLOOKUP ( $objPHPExcel, 'C', 'operationsList', 2 );
	updateVLOOKUP ( $objPHPExcel, 'D', 'surgeonsList', 2 );
	updateVLOOKUP ( $objPHPExcel, 'E', 'SurgeonsList', 2 );
}

/**
 *
 * @param unknown_type $req        	
 * @param unknown_type $res        	
 * @param unknown_type $uid        	
 * @param PHPExcel $objPHPExcel        	
 */
function writeShifts($req, $res, $uid, $objPHPExcel) {
	$objPHPExcel->createSheet ( 1 );
	$objPHPExcel->setActiveSheetIndex ( 1 );
	$objPHPExcel->getActiveSheet ()->setTitle ( 'Shifts' );
	
	$objPHPExcel->getActiveSheet ()->setCellValue ( 'A1', 'ID' );
	$objPHPExcel->getActiveSheet ()->setCellValue ( 'B1', 'Date' );
	$objPHPExcel->getActiveSheet ()->setCellValue ( 'C1', 'Comments' );
	$objPHPExcel->getActiveSheet ()->setCellValue ( 'D1', 'UID' );
	$shifts = shifts_read ( $req, $res, $uid );
	printArray ( $objPHPExcel, $shifts );
}

/**
 *
 * @param unknown_type $req        	
 * @param unknown_type $res        	
 * @param unknown_type $uid        	
 * @param PHPExcel $objPHPExcel        	
 */
function writeSessions($req, $res, $uid, $objPHPExcel) {
	$objPHPExcel->createSheet ( 2 );
	$objPHPExcel->setActiveSheetIndex ( 2 );
	$objPHPExcel->getActiveSheet ()->setTitle ( 'Sessions' );
	
	$objPHPExcel->getActiveSheet ()->setCellValue ( 'A1', 'ID' );
	$objPHPExcel->getActiveSheet ()->setCellValue ( 'B1', 'Date' );
	$objPHPExcel->getActiveSheet ()->setCellValue ( 'C1', 'Comments' );
	$objPHPExcel->getActiveSheet ()->setCellValue ( 'D1', 'UID' );
	$sessions = sessions_read ( $req, $res, $uid );
	printArray ( $objPHPExcel, $sessions );
}
/**
 *
 * @param unknown_type $req        	
 * @param unknown_type $res        	
 * @param unknown_type $uid        	
 * @param PHPExcel $objPHPExcel        	
 */
function writeSurgeons($req, $res, $uid, $objPHPExcel) {
	$objPHPExcel->createSheet ( 3 );
	$objPHPExcel->setActiveSheetIndex ( 3 );
	$objPHPExcel->getActiveSheet ()->setTitle ( 'Surgeons' );
	
	$objPHPExcel->getActiveSheet ()->setCellValue ( 'A1', 'ID' );
	$objPHPExcel->getActiveSheet ()->setCellValue ( 'B1', 'Name' );
	$objPHPExcel->getActiveSheet ()->setCellValue ( 'C1', 'Title' );
	$objPHPExcel->getActiveSheet ()->setCellValue ( 'D1', 'UID' );
	$sessions = surgeons_read ( $req, $res, $uid );
	$row = printArray ( $objPHPExcel, $sessions );
	
	$objPHPExcel->addNamedRange(new PHPExcel_NamedRange('surgeonsList', $objPHPExcel->getActiveSheet (), 'A1:C' . strval($row) ));
}
/**
 *
 * @param unknown_type $req        	
 * @param unknown_type $res        	
 * @param unknown_type $uid        	
 * @param unknown_type $objPHPExcel        	
 */
function writeOperations($req, $res, $uid, $objPHPExcel) {
	$objPHPExcel->createSheet ( 4 );
	$objPHPExcel->setActiveSheetIndex ( 4 );
	$objPHPExcel->getActiveSheet ()->setTitle ( 'Operations' );
	
	$objPHPExcel->getActiveSheet ()->setCellValue ( 'A1', 'ID' );
	$objPHPExcel->getActiveSheet ()->setCellValue ( 'B1', 'Name' );
	$objPHPExcel->getActiveSheet ()->setCellValue ( 'C1', 'UID' );
	$sessions = operations_read ( $req, $res, $uid );
	$row = printArray ( $objPHPExcel, $sessions );
	
	$objPHPExcel->addNamedRange(new PHPExcel_NamedRange('operationsList', $objPHPExcel->getActiveSheet (), 'A1:C' . strval($row) ));	
}

/**
 *
 * @param
 *        	objPHPExcel
 * @param
 *        	arrayContent
 */
function printArray($objPHPExcel, $arrayContent) {
	$row = 2;
	foreach ( $arrayContent as $record ) {
		$col = ord ( 'A' );
		foreach ( $record as $value ) {
			$objPHPExcel->getActiveSheet ()->setCellValue ( chr ( $col ) . strval ( $row ), $value );
			$col ++;
		}
		$row ++;
	}
	return $row;
}

/**
 * // =VLOOKUP(2, Operations!A2:B3, 2, FALSE)
 * update VLOOKUP table
 *
 * @param PHPExcel $objPHPExcel        	
 * @param char $col        	
 * @param string $range        	
 * @param int $offset        	
 */
function updateVLOOKUP($objPHPExcel, $col, $range, $offset) {
	$row = 2;
	$val = $objPHPExcel->getActiveSheet ()->getCell ( $col . strval ( $row ) )->getValue ();
	while ( ! empty ( $val ) ) {
		$objPHPExcel->getActiveSheet ()->setCellValue ( $col . strval ( $row ), '=VLOOKUP(' . $val . ',' . $range . ', ' . strval ( $offset ) .  ', FALSE)' );
		$row ++;
		$val = $objPHPExcel->getActiveSheet ()->getCell ( $col . strval ( $row ) )->getValue ();
	}
}

