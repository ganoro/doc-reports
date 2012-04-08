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

use Zend\Di\Di;

use Zend\Di\Locator;

use Zend\Mvc\Router\SimpleRouteStack;

use Zend\Mvc\Router\RouteStack;

use Zend\EventManager\EventDescription;
use Gateful\Runtime\Procedure;

/**
 * Runtime main class
 *
 */
abstract class Runtime {

	/**
	 *
	 * @var $procedure Zend\Runtime\Procedure
	 */
	protected $procedure;

	private $router;

	private $locator;
	
	/**
	 * process a given procedure
	 *
	 * @param Procedure $procedure
	 */
	function __construct(Procedure $procedure) {
		if (null == $procedure) {
			throw new \InvalidArgumentException();
		}
		$this->procedure = $procedure;
	}

	/**
	 * @return the $locator
	 */
	protected function getLocator() {
		if(!$this->locator instanceof Locator){
			$this->locator = new Di();
		}
		return $this->locator;
	}

	/**
	 * @param field_type $locator
	 */
	protected function setLocator($locator) {
		$this->locator = $locator;
	}


	protected function setRouter(RouteStack $router) {
		$this->router = $router;
		return $this;
	}

	protected function getRouter() {
		if (!$this->router instanceof RouteStack) {
			$this->setRouter(new SimpleRouteStack());
		}
		return $this->router;
	}

	public function run() {
		$event = $this->createEvent();
		try {
			$this->procedure->process($event);
		} catch (\Exception $e) {
			$this->processException($e);
			throw new RuntimeException($e);
		}
		return $this->result($event);
	}
	
	/**
	 * @return
	 * @see Runtime#result
	 */
	public function send() {
		$response = $this->run()->getResponse();
		if ($response != null) {
			return $response->send();
		} else {
			throw new RuntimeException('internal error - null response');
		}
	}

	/**
	 * @param string $name
	 * @param CallbackHandler $callback
	 */
	public function hookBefore($name, $callback) {
		$this->procedure()
				->attach($name, $callback, Procedure::EVENT_ORDER_BEFORE);
		return $this;
	}

	/**
	 * @param string $name
	 * @param CallbackHandler $callback
	 */
	public function hookAfter($name, $callback) {
		$this->procedure()
				->attach($name, $callback, Procedure::EVENT_ORDER_AFTER);
		return $this;
	}

	/**
	 * @return \Gateful\Runtime\Procedure
	 */
	protected function procedure() {
		return $this->procedure;
	}

	/**
	 *
	 * @param \Exception $e        	
	 */
	protected abstract function processException(\Exception $e);

	/**
	 * prepares the event to run
	 * @return EventDescription $event
	 */
	protected abstract function createEvent();

	/**
	 *
	 * @return result of the procedure
	 */
	protected abstract function result(EventDescription $event);
	
}
