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

use Zend\Stdlib\PriorityQueue;
use Zend\Stdlib\CallbackHandler;
use Zend\Http\PhpEnvironment\Response;
use Zend\Http\PhpEnvironment\Request;
use Gateful\Service\ServiceInstruction;
use Gateful\Service\ServiceEvent;

/**
 * Initialize request
 */
class Initialize extends ServiceInstruction {

	/**
	 * constructs a new intialization service instruction
	 *
	 * @param array $metadata        	
	 */
	public function __construct() {
		parent::__construct('initialize');
	}

	protected function internalRun(Request $req, Response $response,
			ServiceEvent $event) {
		$callable = $this->getInstructionMetadata($event);
		$pq = new PriorityQueue();
		if (is_array($callable)) {
			foreach ($callable as $key => $value) {
				if (is_array($value)) {
					foreach ($value as $key => $value) {
						if (!is_int($key)) {
							$key = 1;
						}
						if (is_callable($value)) {
							$handler = new CallbackHandler($value);
							$pq->insert($handler, $key);
						}
					}
				} else if (is_callable($value)) {
					$handler = new CallbackHandler($value);
					$pq->insert($handler, 1);
				}
			}
		}
		while ($pq->count() > 0) {
			$handler = $pq->top();
			$pq->remove($handler);
			$handler($req, $response, $event);
		}
		return true;
	}

}
