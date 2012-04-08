<?php
/*******************************************************************************
 * Copyright (c) 2012, 2012 Zend Technologies.
* All rights reserved. This program and the accompanying materials
* are the copyright of Zend Technologies and is protected under
* copyright laws of the United States.
* You must not copy, adapt or redistribute this document for
* any use.
*******************************************************************************/
namespace Gateful\Runtime;

use Zend\Stdlib\CallbackHandler;

/**
 * Represents an instruction to execute
 */
class Instruction extends CallbackHandler {
	
	const INSTRUCTION_NAME_METADATA = 'instruction_name';
	
	/**
	 *
	 * @param string $name
	 *        	instruction name
	 * @param string|array|object $callback
	 *        	PHP callback
	 * @param array $options
	 *        	Options used by the callback handler (e.g., priority)
	 *        	
	 */
	public function __construct($name, $callback, array $metadata = array()) {
		parent::__construct ( $callback, array_merge ( array (
				Instruction::INSTRUCTION_NAME_METADATA => $name 
		), $metadata ) );
	}
	
	/**
	 *
	 * @return string name of the instruction
	 */
	public function getName() {
		return $this->getMetadatum(Instruction::INSTRUCTION_NAME_METADATA);
	}

}
