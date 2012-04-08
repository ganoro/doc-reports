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

use Zend\Http\PhpEnvironment\Response;
use Zend\Http\PhpEnvironment\Request;
use Gateful\Service\ServiceInstruction;
use Gateful\Service\ServiceEvent;

/**
 * Dispatch request
 */
class Dispatch extends ServiceInstruction {

	/**
	 * constructs a new dispatch service instruction
	 *
	 * @param array $metadata        	
	 */
	public function __construct() {
		parent::__construct('dispatch');
	}

	protected function internalRun(Request $req, Response $res,
			ServiceEvent $event) {
		$routeMatch = $event->getRouteMatch();
		if ($routeMatch != null) {
			$serviceName = $routeMatch->getParam('service', 'not-found');
			$method = $routeMatch->getParam('method', 'not-found');
			$params = $routeMatch->getParams();

			if ($serviceName != 'not-found' && $method != 'not-found') {
				$service = $event->getLocator()->get($serviceName);
				$methodParams = $this
						->getServiceMethodParams($serviceName, $method);
				$target = array($service, $method);
			} else {
				$target = $routeMatch->getParam('call', 'not-found');
				$methodParams = $this->getFunctionParams($target);
			}

			$data = array('req' => $req, 'res' => $res);
			foreach ($methodParams as $param) {
				$name = $param->getName();
				if ($param->isOptional()) {
					$data[$name] = !empty($params[$name]) ? $params[$name]
							: $param->getDefaultValue();
				} else if (!empty($params[$name])) {
					$data[$name] = $params[$name];
				} else {
					if ($req->getMethod() == "GET") {
						$p = $req->query()->get($name, null);
						if (isset($p)) {
							$data[$name] = $p;
						}
					} else if ($req->getMethod() == "POST") {
						$p = $req->post()->get($name, null);
						if (isset($p)) {
							$data[$name] = $p;
						}
					}
				}
			}
			$event->setParam('result', call_user_func_array($target, $data));
		}
	}

	private function getServiceMethodParams($serviceName, $method) {
		$classRef = new \ReflectionClass($serviceName);
		$className = $classRef->getName();
		$methodRef = $classRef->getMethod($method);
		$paramsRef = $methodRef->getParameters();
		return $paramsRef;
	}

	private function getFunctionParams($method) {
		$methodRef = new \ReflectionFunction($method);
		$paramsRef = $methodRef->getParameters();
		return $paramsRef;
	}

}
