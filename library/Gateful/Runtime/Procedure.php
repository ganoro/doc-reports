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

use Zend\EventManager\EventDescription;
use Zend\EventManager\EventManager;

/**
 * Dispatch cycle representation
 */
class Procedure {
	
	/**
	 * procedure event to trigger
	 */
	const PROCEDURE_EVENT = 'procedure';
	
	/**
	 * Before / event / after
	 */
	const EVENT_ORDER_BEFORE = 3;
	const EVENT_ORDER_CURRENT = 2;
	const EVENT_ORDER_AFTER = 1;
	
	/**
	 *
	 * @var Zend\EventManager\EventManager instructions handler
	 */
	protected $events;
	
	/**
	 *
	 * @var int $priority holds the next priority to assign
	 */
	protected $priority = 10;
	
	/**
	 * Constructs a new procedure
	 */
	function __construct() {
		$this->events = new EventManager ( array (
				__CLASS__,
				get_class ( $this ) 
		) );
	}
	
	/**
	 *
	 * @return Zend\EventManager\EventManager collection of events to process
	 */
	protected function events() {
		return $this->events;
	}
	
	/**
	 *
	 * @param $callback Zend\Stdlib\CallbackHandle
	 *        	instruction to execute
	 * @return \Gateful\Runtime\Procedure
	 */
	public function next(Instruction $instruction) {
		$priority = $this->priority --;
		
		$events = $this->events ();
		$events->attach ( Procedure::PROCEDURE_EVENT, function ($event) use($events, $instruction) {
			$events->trigger ( $instruction->getName (), $event );
		}, $priority );
		$this->attach ( $instruction->getName (), $instruction );
		
		return $this;
	}
	
	/**
	 *
	 * @param string $name
	 *        	name of the callback
	 * @param CallbackHandler $callback        	
	 * @param int $order        	
	 * @return \Gateful\Runtime\Procedure
	 */
	public function attach($name, $callback, $order = Procedure::EVENT_ORDER_CURRENT) {
		$events = $this->events ();
		$events->attach ( $name, $callback, $order );
		return $this;
	}
	
	/**
	 * Process a procedure by triggering with an event in hand
	 *
	 * @param Event $event        	
	 */
	public function process(EventDescription $event) {
		$events = $this->events ();
		$events->trigger ( Procedure::PROCEDURE_EVENT, $event );
	}
}
