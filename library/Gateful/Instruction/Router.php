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

use Zend\Mvc\Router\Http\Segment;

use Zend\Mvc\Router\RouteMatch;

use Zend\Mvc\Router\Http\Literal;

use Zend\Mvc\Router\SimpleRouteStack;

use Zend\Stdlib\CallbackHandler;

use Zend\Http\PhpEnvironment\Response;
use Zend\Http\PhpEnvironment\Request;
use Gateful\Service\ServiceInstruction;
use Gateful\Service\ServiceEvent;

/**
 * Route request
 */
class Router extends ServiceInstruction {

	const NAME = 'router';
	const ERROR_SERVICE_NOT_FOUND = 'error-service-not-found';
	private $router;

	/**
	 * constructs a new router service instruction
	 *
	 * @param array $metadata        	
	 */
	public function __construct() {
		parent::__construct(Router::NAME);
		$this->router = new SimpleRouteStack();
	}

	protected function internalRun(Request $req, Response $response,
			ServiceEvent $event) {

		//TODO cache router
		$routes = $this->getInstructionMetadata($event);
		foreach ($routes as $route) {
			$this->addRoute($route);
		}

		$routeMatch = $this->router->match($req);

		if (!$routeMatch instanceof RouteMatch) {
			$event->setError(Router::ERROR_SERVICE_NOT_FOUND);
			//TODO handle error
		} else {
			$event->setRouteMatch($routeMatch);
		}
	}

	/**
	 * @param config
	 * @param route
	 */
	private function addRoute($config) {
		if (is_array($config)) {
			foreach ($config as $name => $route) {
				if (is_array($route)) {
					foreach ($route as $service => $method) {
						if (preg_match("/\\:/", $name)) {
							$r = new Segment($name, array(),
									array('service' => $service,
											'method' => $method));
						} else {
							$r = new Literal($name,
									array('service' => $service,
											'method' => $method));
						}
						$this->router->addRoute($name, $r, $priority = null);
					}
				} else if (is_callable($route)) {
					if (preg_match("/\\:/", $name)) {
						$r = new Segment($name, array(),
								array('call' => $route));
					} else {
						$r = new Literal($name, array('call' => $route));
					}
					$this->router->addRoute($name, $r, $priority = null);
				}
			}
		}
	}

}
