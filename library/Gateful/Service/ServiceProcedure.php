<?php
/*******************************************************************************
 * Copyright (c) 2012, 2012 Zend Technologies.
* All rights reserved. This program and the accompanying materials
* are the copyright of Zend Technologies and is protected under
* copyright laws of the United States.
* You must not copy, adapt or redistribute this document for
* any use.
*******************************************************************************/
namespace Gateful\Service;

use Zend\Di\Locator;
use Zend\Di\Di;

use Gateful\Runtime\Procedure;

/**
 * The Gateful Service procedure
 */
class ServiceProcedure extends Procedure {
	
	public $instructions = array (
			'Gateful\Instruction\Initialize',
			'Gateful\Instruction\Router',
			'Gateful\Instruction\Authenticate',
			'Gateful\Instruction\Dispatch',
			'Gateful\Instruction\Render'
	);
	
	function __construct(Locator $locator = null) {
		parent::__construct ();
		if ($locator == null) {
			$locator = new Di ();
		}
		foreach ( $this->instructions as $class ) {
			$instruction = $locator->get ( $class );
			$this->next ( $instruction );
		}
	}
}
