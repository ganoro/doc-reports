<?php

use Zend\Stdlib\Parameters;

use Zend\Http\PhpEnvironment\Request;

require_once 'PHPUnit\Framework\TestCase.php';

/**
 * test case.
 */
class RouteTest extends PHPUnit_Framework_TestCase {
	function __construct() {
		$this->backupGlobals = false;
		$this->backupStaticAttributes = true;
	}
	public function testOperations() {
		global $gateful;
		
		$gateful->initialize ( function (Request $req, $res, $e) {
			$req->setQuery ( new Parameters ( array (
					'uid' => 1 
			) ) );
			$req->setPost ( new Parameters ( array (
					'uid' => 1 
			) ) );
			$req->setUri ( '/doc-reports/operations' );
			$req->setMethod ( Request::METHOD_POST );
		} );
		
		$gateful->router ( array (
				'method' => 'POST',
				'url' => '/doc-reports/operations',
				'callable' => array (
						$this,
						'operations' 
				) 
		) );
		
		$gateful->get ( '/doc-reports/operations', function ($req, $res, $uid) {
			echo "hello";
		} );
		
		$res = $gateful->run ();
		
		$this->assertNotNull ( $res );
	}
	public function testPut() {
		global $gateful;
		
		$gateful->initialize ( function (Request $req, $res, $e) {
			$req->setContent("uid=1");
			$req->setUri ( '/doc-reports/operations' );
			$req->setMethod ( Request::METHOD_PUT);
		} );
		
		$gateful->router ( array (
				'method' => 'PUT',
				'url' => '/doc-reports/operations',
				'callable' => array (
						$this,
						'operations' 
				) 
		) );
		$res = $gateful->run ();
		$this->assertNotNull ( $res );
	}
	function operations($req, $res, $uid) {
		echo "hello world!";
	}
}

