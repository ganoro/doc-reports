<?php
require_once 'Zend/Loader/AutoloaderFactory.php';
use Zend\Loader\AutoloaderFactory;
AutoloaderFactory::factory(
		array(
				'Zend\Loader\StandardAutoloader' => array(
						'namespaces' => array(
								'Gateful' => dirname(__FILE__)))));
										
$gateful = new Gateful\Service\ServiceRuntime();
