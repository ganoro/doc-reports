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

use Zend\Http\PhpEnvironment\Response;
use Zend\Http\PhpEnvironment\Request;
use Zend\EventManager\EventDescription;
use Gateful\Runtime\RuntimeException;
use Gateful\Runtime\Instruction;
use Gateful\Service\ServiceEvent;

/**
 * Service instruction
 */
abstract class ServiceInstruction extends Instruction {
	
	public function __construct($name, array $metadata = array()) {
		parent::__construct ( $name, array (
				$this,
				'run' 
		), $metadata );
	}
	
	/**
	 * Executes a step in the dispatch cycle with the request, response and
	 * event deatils
	 *
	 * @param Request $req        	
	 * @param Response $response        	
	 * @param ServiceEvent $event        	
	 * @return boolean true if next instructions should be processed
	 */
	protected abstract function internalRun(Request $req, Response $response, ServiceEvent $event);
	
	/**
	 *
	 * @param ServiceEvent $event        	
	 * @throws RuntimeException
	 */
	public function run(ServiceEvent $event) {
		$message = $this->valid ( $event );
		if ($message == null) {
			$this->internalRun ( $event->getRequest (), $event->getResponse (), $event );
		} else {
			throw new RuntimeException ( $message );
		}
	}
	
	/**
	 * Validates and filters the event params
	 *
	 * @param Gateful\Service\ServiceEvent $event        	
	 * @return boolean true if valid and filtered correctly
	 */
	public function valid(ServiceEvent $event) {
	}
	
	/**
	 *
	 * @param ServiceEvent $event        	
	 */
	protected function getInstructionMetadata(ServiceEvent $event) {
		$data = $event->getMetadata ( $this->getName () );
		return $data;
	}

}
