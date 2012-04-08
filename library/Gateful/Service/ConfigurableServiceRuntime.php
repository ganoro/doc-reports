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

use Zend\Http\PhpEnvironment\Request;
use Zend\EventManager\EventDescription;
use Zend\Config\Config;
use Gateful\Runtime\Runtime;
use Gateful\Service\ServiceEvent;
use Gateful\Service\ServiceRuntime;
/**
 * Service Runtime
 */
class ConfigurableServiceRuntime extends ServiceRuntime {
	
	/**
	 * @var validators element names
	 */
	const VALIDATOR = 'validator';
	const MANDATORY = 'mandatory';
	const DEFAULT_VALUE = 'default-value';
	
	/**
	 * @var filter element names
	 */
	const FILTER = 'filter';
	
	function __construct(Procedure $procedure = null) {
		parent::__construct ( $procedure );
	}
	
	public function getSchema() {
		$schema = array (
				'authenticate' => array (
						'adapter' => array (
								self::MANDATORY,
								self::VALIDATOR => array (
										function ($data) {
											return is_callable ( $data ) || is_string ( $data );
										} 
								) 
						),
						'options' => array (
								self::VALIDATOR => array (
										function ($data) {
											return is_callable ( $data );
										} 
								) 
						) 
				),
				'initialize' => array (
						'dispatch' => array (
								self::MANDATORY,
								self::VALIDATOR => array (
										function ($data) {
											return is_callable ( $data );
										} 
								) 
						) 
				),
				'render' => array (
						'adapter' => array (
								self::MANDATORY,
								self::VALIDATOR => array (
										function ($data) {
											return is_callable ( $data ) || is_string ( $data );
										} 
								) 
						),
						'options' => array (
								self::VALIDATOR => array (
										function ($data) {
											return is_callable ( $data );
										} 
								) 
						) 
				),
				'router' => array (
						'route' => array (
								self::MANDATORY,
								self::VALIDATOR => array (
										'Zend\Validate\Regex' => array (
												'pattern' => '(([a-zA-Z][a-zA-Z0-9_-])*/)*' 
										) 
								) 
						),
						'method' => array (
								self::DEFAULT_VALUE => 'get',
								self::VALIDATOR => array (
										'Zend\Validate\InArray' => array (
												'options' => array (
														'get',
														'post',
														'head',
														'put',
														'delete',
														'trace',
														'connect' 
												) 
										) 
								) 
						),
						'dispatch' => array (
								self::MANDATORY,
								self::VALIDATOR => array (
										function ($data) {
											return is_callable ( $data );
										} 
								) 
						),
						'arguments' => array (
								'id' => array (
										self::MANDATORY,
										self::VALIDATOR => array (
												'Zend\Validate\Int' 
										) 
								),
								'name' => array (
										self::MANDATORY,
										self::VALIDATOR => array (
												'Zend\Validate\StringLength' => array (
														'min' => 1,
														'encoding' => 'UTF-8' 
												) 
										) 
								),
								'optional' => array (
										self::VALIDATOR => array (
												'Zend\Validate\StringLength' => array (
														'min' => 0,
														'encoding' => 'UTF-8' 
												) 
										) 
								) 
						) 
				) 
		);
		return $schema;
	}
	
	public function configure($config = null) {
		if ($config instanceof Config) {
			
		}
	}
}
