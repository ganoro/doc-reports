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
	
	/**
	 *
	 * @var name of the instruction
	 */
	const NAME = 'router';
	const ERROR_SERVICE_NOT_FOUND = 'error-service-not-found';
	private $router = array();
	
	/**
	 * parameters
	 */
	const PARAM_URL = 'url';
	const PARAM_METHOD = 'method';
	const PARAM_CALLABLE = 'callable';
	
	/**
	 * constructs a new router service instruction
	 *
	 * @param array $metadata        	
	 */
	public function __construct() {
		parent::__construct ( Router::NAME );
	}
	protected function internalRun(Request $req, Response $response, ServiceEvent $event) {
		
		$routes = $this->getInstructionMetadata ( $event );
		foreach ( $routes as $route ) {
			$this->addRoute ( $route );
		}
		
		$method = $req->getMethod();
		if (isset($this->router[$method])) {
			$router = $this->router[$method];
			$routeMatch = $router->match ( $req );
		}
		
		if (! $routeMatch instanceof RouteMatch) {
			// TODO handle error
			$event->setError ( Router::ERROR_SERVICE_NOT_FOUND );
		} else {
			$event->setRouteMatch ( $routeMatch );
		}
	}
	
	/**
	 *
	 * @param
	 *        	config
	 * @param
	 *        	route
	 */
	private function addRoute($config) {
		if (is_array ( $config ) && sizeof ( $config ) > 0) {
			$this->addConfig($config);
		}
	}
	
	private function addConfig($data) {
		$name = $data['url'];
		if ($name == null) {
			throw new \InvalidArgumentException("url parameter must be provided"); 
		}
		$method = $data['method'];
		if ($method == null) {
			throw new \InvalidArgumentException("method parameter must be provided"); 
		}

		if (preg_match ( "/\\:/", $name )) {
			$r = new Segment ( $name, array (), $data);
		} else {
			$r = new Literal ( $name, $data );
		}
		
		if (!isset($this->router[$method])) {
			$this->router[$method] = new SimpleRouteStack (); 
		}
		$this->router[$method]->addRoute ( $name, $r, $priority = null );
	}
	
}
