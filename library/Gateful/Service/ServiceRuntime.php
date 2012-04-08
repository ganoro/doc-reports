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

use Gateful\Runtime\RuntimeException;
use Zend\Http\PhpEnvironment\Request;
use Zend\EventManager\EventDescription;
use Gateful\Runtime\Runtime;
use Gateful\Service\ServiceEvent;

/**
 * Service Runtime
 * 
 */
class ServiceRuntime extends Runtime {

	/**
	 * Definition array, holds all configs provided by @see #on($event, $config)
	 * method
	 * 
	 * @var array
	 */
	public $metadata = array();

	function __construct(Procedure $procedure = null) {
		parent::__construct(
				$procedure == null ? new ServiceProcedure($this->getLocator())
						: $procedure);
	}

	/**
	 *
	 * @see Runtime#init
	 */
	protected function createEvent() {
		$event = new ServiceEvent($this->metadata, $this->getLocator(),
				$this->getRouter());
		return $event;
	}

	/**
	 * Decorates the events with metadata
	 * 
	 * @param string $event name of the metadata event        	
	 * @param array $config        	
	 */
	public function on($event, $config) {
		// TODO: validate input
		array_push($this->metadata, array($event => $config));
	}

	/**
	 * @param string $name
	 * @param array $arguments
	 */
	public function __call($name, $arguments) {
		if (sizeof($arguments) == 1) {
			$this->on($name, $arguments[0]);
		} else {
			throw new \InvalidArgumentException('Assign metadata with arrays');
		}
	}

	/**
	 *
	 * @see Runtime#processException
	 */
	protected function processException(\Exception $e) {
	}

	/**
	 * @return Gateful\Service\ServiceEvent
	 * @see Runtime#result
	 */
	protected function result(EventDescription $event) {
		return $event;
	}

	

}
