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

use Zend\Http\Header\GenericHeader;

use Zend\Http\Header\HeaderDescription;

use Zend\Http\Headers;

use Zend\Server\Reflection\ReflectionClass;

use Zend\Server\Reflection\ReflectionMethod;

use Zend\Stdlib\CallbackHandler;

use Zend\Di\Di;

use Zend\Stdlib\Dispatchable;

use Zend\Http\PhpEnvironment\Response;
use Zend\Http\PhpEnvironment\Request;
use Gateful\Service\ServiceInstruction;
use Gateful\Service\ServiceEvent;

/**
 * Route request
 */
class Render extends ServiceInstruction {
	/**
	 * constructs a new render service instruction
	 *
	 * @param array $metadata        	
	 */
	public function __construct() {
		parent::__construct('render');
	}

	protected function internalRun(Request $req, Response $res,
			ServiceEvent $event) {
		$result = $event->getParam('result');
		if ($result != null) {
			$res->setStatusCode(Response::STATUS_CODE_200);
			$headers = new Headers();
			$headers
					->addHeader(
							GenericHeader::fromString(
									'Content-Type: text/plain'));
			$res->setHeaders($headers);
			if (is_string($result)) {
				$result = array("result" => $result);
			}
			$res->setContent(json_encode($result));

		}
	}

}
