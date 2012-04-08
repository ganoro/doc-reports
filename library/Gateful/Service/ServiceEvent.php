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

use Zend\Di\Di;

use Zend\Di\Locator;

use Zend\Mvc\Router\Http\RouteMatch;

use Zend\Mvc\Router\RouteStack;

use Gateful\Runtime\RuntimeException;
use Zend\Http\PhpEnvironment\Response;
use Zend\Http\PhpEnvironment\Request;
use Zend\EventManager\Event;

/**
 * A basic service events
 */
class ServiceEvent extends Event {

	const REQUEST_NAME = 'request';
	const RESPONSE_NAME = 'response';
	const METADATA_NAME = 'metadata';

	private $locator;
	protected $router;
	protected $routeMatch;

	/**
	 * constructs a new service event
	 */
	public function __construct(array $metadata = array(),
			Locator $locator = null, RouteStack $router = null) {
		parent::__construct(__CLASS__);
		$req = new Request();
		$res = new Response();
		$this->setParam(ServiceEvent::REQUEST_NAME, $req)
				->setParam(ServiceEvent::RESPONSE_NAME, $res)
				->setParam(ServiceEvent::METADATA_NAME, $metadata);
		$this->setLocator($locator);
		if ($router != null)
			$this->setRouter($router);
	}

	/**
	 * @return the $locator
	 */
	public function getLocator() {
		if (!$this->locator instanceof Locator) {
			$this->locator = new Di();
		}
		return $this->locator;
	}

	/**
	 * @param field_type $locator
	 */
	public function setLocator($locator) {
		$this->locator = $locator;
	}

	public function getRouter() {
		return $this->getParam('router');
	}

	public function setRouter(RouteStack $router) {
		$this->setParam('router', $router);
		$this->router = $router;
	}

	public function getRouteMatch() {
		return $this->getParam('route-match');
	}

	public function setRouteMatch(RouteMatch $matches) {
		$this->setParam('route-match', $matches);
		$this->routeMatch = $matches;
		return $this;
	}

	/**
	 *
	 * @return Request
	 */
	public function getRequest() {
		return $this->getParam(ServiceEvent::REQUEST_NAME);
	}

	/**
	 *
	 * @return Response
	 */
	public function getResponse() {
		return $this->getParam(ServiceEvent::RESPONSE_NAME);
	}

	/**
	 *
	 * @return array
	 */
	public function getMetadata($element = null) {

		$data = $this->getParam(ServiceEvent::METADATA_NAME);
		if ($element == null) {
			return $data;
		}
		$result = array();
		foreach ($data as $key => $value) {
			if ($key === $element) {
				array_push($result, $value);
			} else if (is_array($value)) {
				foreach ($value as $k => $v) {
					if ($k === $element) {
						array_push($result, $v);
					} else if (is_array($v)) {
						//$k may be a priority
						foreach ($v as $k2 => $v2) {
							if ($k2 === $element)
								array_push($result, $value);
						}
					}
				}
			}
		}
		return $result;
	}

	public function isError() {
		return $this->getParam('error', false);
	}

	public function setError($message) {
		$this->setParam('error', $message);
		return $this;
	}

	public function getError() {
		return $this->getParam('error', '');
	}
}

