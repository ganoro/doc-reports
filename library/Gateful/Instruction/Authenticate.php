<?php
/*******************************************************************************
 * Copyright (c) 2012, 2012 Zend Technologies.
* All rights reserved. This program and the accompanying materials
* are the copyright of Zend Technologies and is protected under
* copyright laws of the United States.
* You must not copy, adapt or redistribute this document for
* any use.
*******************************************************************************/
namespace Gateful\Instruction;

use Zend\Http\PhpEnvironment\Response;
use Zend\Http\PhpEnvironment\Request;
use Gateful\Service\ServiceInstruction;
use Gateful\Service\ServiceEvent;

/**
 * Authenticate request
 */
class Authenticate extends ServiceInstruction {
	
	/**
	 * constructs a new authentication service instruction
	 *
	 * @param array $metadata        	
	 */
	public function __construct() {
		parent::__construct ( 'authenticate' );
	}
	
	protected function internalRun(Request $req, Response $res, ServiceEvent $event) {
		// do authentication
		//echo 'authenticate';
	}

}
