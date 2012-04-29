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

use Zend\Stdlib\CallbackHandler;
use Zend\Http\PhpEnvironment\Response;
use Zend\Http\PhpEnvironment\Request;
use Gateful\Service\ServiceInstruction;
use Gateful\Service\ServiceEvent;

/**
 * Dispatch request
 */
class Dispatch extends ServiceInstruction {
	const ERROR_SERVICE_NOT_FOUND = "Service or callable not found";
	
	/**
	 * constructs a new dispatch service instruction
	 *
	 * @param array $metadata        	
	 */
	public function __construct() {
		parent::__construct ( 'dispatch' );
	}
	protected function internalRun(Request $req, Response $res, ServiceEvent $event) {
		$routeMatch = $event->getRouteMatch ();
		
		if ($routeMatch != null) {
			
			// find callable
			$url = $routeMatch->getParam ( 'url', 'not-found' );
			$callable = $routeMatch->getParam ( 'callable', 'not-found' );
			if ($url != 'not-found' && $callable != 'not-found') {
				$target = new CallbackHandler ( $callable );
			} else {
				// TODO Error
				$event->setError ( self::ERROR_SERVICE_NOT_FOUND );
			}
			
			// bind request parameters to callback
			$data = array (
					'req' => $req,
					'res' => $res 
			);
			$requestParameters = $this->getRequestParameters ( $req );
			
			$params = $routeMatch->getParams ();
			$methodParams = $this->getMethodParams ( $target->getCallback () );
			if ($methodParams == null) {
				// TODO Error
				$event->setError ( self::ERROR_SERVICE_NOT_FOUND );
			}
			foreach ( $methodParams as $param ) {
				$name = $param->getName ();
				if ($param->isOptional ()) {
					$data [$name] = ! empty ( $requestParameters [$name] ) ? $requestParameters [$name] : $param->getDefaultValue ();
				} else if (! empty ( $params [$name] )) {
					$data [$name] = $params [$name];
				} else {
					$p = $requestParameters [$name];
					if (isset ( $p )) {
						$data [$name] = $p;
					}
				}
			}
			
			// dispatch
			$event->setParam ( 'result', call_user_func_array ( $target, $data ) );
		}
	}
	
	/**
	 * Resolve the request parameters according to its content type
	 *
	 * @param
	 *        	$req
	 * @return array
	 */
	private function getRequestParameters($req) {
		
		$requestParameters = array ();
		
		// GET and POST paraneters
		if ($req->isGet ()) {
			$requestParameters = $req->query ()->toArray ();
		} else if ($req->isPost ()) {
			$requestParameters = $req->post ()->toArray ();
		}
		
		// json parameters can be provided in the body as well
		$contentHeader = $req->headers ()->get ( "content-type" );
		if (! empty ( $contentHeader ) && strpos ( $contentHeader->getFieldValue (), "application/json" ) !== false) {
			$content = file_get_contents ( "php://input" );
			if (! empty ( $content )) {
				$decoded = json_decode ( $content );
				$requestParameters = array_merge($requestParameters, get_object_vars ( $decoded ));
			}
		} 
		
		return $requestParameters;
	}
	private function getServiceMethodParams($serviceName, $method) {
		$classRef = new \ReflectionClass ( $serviceName );
		$className = $classRef->getName ();
		$methodRef = $classRef->getMethod ( $method );
		$paramsRef = $methodRef->getParameters ();
		return $paramsRef;
	}
	private function getObjectMethodParams($object, $method) {
		$classRef = new \ReflectionObject ( $object );
		$methodRef = $classRef->getMethod ( $method );
		$paramsRef = $methodRef->getParameters ();
		return $paramsRef;
	}
	private function getFunctionParams($method) {
		$methodRef = new \ReflectionFunction ( $method );
		$paramsRef = $methodRef->getParameters ();
		return $paramsRef;
	}
	private function getMethodParams($callback) {
		if (is_string ( $callback ) || $callback instanceof \Closure) {
			return $this->getFunctionParams ( $callback );
		} else if (is_array ( $callback ) && count ( $callback ) == 2) {
			$dispatcher = $callback [0];
			$dispatch = $callback [1];
			if (is_object ( $dispatcher )) {
				return $this->getObjectMethodParams ( $dispatcher, $dispatch );
			} else if (is_string ( $dispatcher )) {
				return $this->getServiceMethodParams ( $dispatcher, $dispatch );
			}
		}
		return null;
	}
}
