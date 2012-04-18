require([ "./qunit", "../scripts/api", "./tests" ], function() {

	module('Operations');
	test('createOperations test', 2, function() {
		var done = false;

		createOperations("Roy", "1", function(req, res, data) {
			ok(true, "createOperations response received with id:" + res.id);
			deleteOperations(res.id, function() {
				ok(true, "deleted");
				start();
				done = true;
			});
		});

		setTimeout(function() {
			if (done)
				return;
			ok(false, "createOperations response not received");
			start();
		}, 3000);
		stop();

	});

	test('readOperations test', 3, function() {
		var done = false;

		createOperations("Roy", "1", function(req, res, data) {
			id = res.id;
			ok(true, "createOperations response received with id:" + res.id);
			readOperations("1", function(req, res, data) {
				ok(true, "readOperations response received with # records "
						+ res.length);
				deleteOperations(id, function() {
					ok(true, "deleted");
					start();
					done = true;
				});
			});
		});

		setTimeout(function() {
			if (done)
				return;
			ok(false, "createOperations response not received");
			start();
		}, 5000);
		stop();
	});

	test('updateOperations test', 3, function() {
		var done = false;

		createOperations("Roy", "1", function(req, res, data) {
			ok(true, "createOperations response received with id:" + res.id);
			updateOperations(res.id, "Royal", function(req, res, data) {
				ok(true, "updateed record id: " + res.id);
				deleteOperations(res.id, function() {
					ok(true, "deleted");
					start();
					done = true;
				});
			});
		});

		setTimeout(function() {
			if (done)
				return;
			ok(false, "createOperations response not received");
			start();
		}, 4000);
		stop();

	});

	module('Surgeons');
	test('createSurgeons test', 2, function() {
		var done = false;

		createSurgeons("Roy", "Dr.", "1", function(req, res, data) {
			ok(true, "createSurgeons response received with id:" + res.id);
			deleteSurgeons(res.id, function() {
				ok(true, "deleted");
				start();
				done = true;
			});
		});

		setTimeout(function() {
			if (done)
				return;
			ok(false, "createSurgeons response not received");
			start();
		}, 3000);
		stop();

	});

	test('readSurgeons test', 3, function() {
		var done = false;

		createSurgeons("Roy", "Prof.", "1", function(req, res, data) {
			id = res.id;
			ok(true, "createSurgeons response received with id:" + res.id);
			readSurgeons("1", function(req, res, data) {
				ok(true, "readSurgeons received with # records " + res.length);
				deleteSurgeons(id, function() {
					ok(true, "deleted");
					start();
					done = true;
				});
			});
		});

		setTimeout(function() {
			if (done)
				return;
			ok(false, "readSurgeons response not received");
			start();
		}, 5000);
		stop();

	});

	test('updateSurgeons test', 3, function() {
		var done = false;

		createSurgeons("Roy", "Prof.", "1", function(req, res, data) {
			ok(true, "createSurgeons response received with id:" + res.id);
			updateSurgeons(res.id, "Royal", "Dr.", function(req, res, data) {
				ok(true, "updateed record id: " + res.id);
				deleteSurgeons(res.id, function() {
					ok(true, "deleted");
					start();
					done = true;
				});
			});
		});

		setTimeout(function() {
			if (done)
				return;
			ok(false, "updateSurgeons response not received");
			start();
		}, 4000);
		stop();

	});

	module('Users');
	test('usersLogin test', 1, function() {
		var done = false;

		loginUsers("1", "Roy", function(req, res, data) {
			ok(true, "loginUsers response received with id:" + res.id);
			start();
			done = true;
		});

		setTimeout(function() {
			if (done)
				return;
			ok(false, "usersLogin response not received");
			start();
		}, 3000);
		stop();

	});

	module('Shifts');
	test('createShifts test', 2, function() {
		var done = false;

		createShifts("01-01-2012", "Comments", "1", function(req, res, data) {
			ok(true, "createShifts  response received with id:" + res.id);
			deleteShifts(res.id, function() {
				ok(true, "deleted");
				start();
				done = true;
			});
		});

		setTimeout(function() {
			if (done)
				return;
			ok(false, "createShifts response not received");
			start();
		}, 3000);
		stop();

	});

	test('readShifts test', 3, function() {
		var done = false;

		createShifts("01-01-2012", "Comments", "1", function(req, res, data) {
			id = res.id;
			ok(true, "createShifts response received with id:" + res.id);
			readShifts("1", function(req, res, data) {
				ok(true, "readShifts received with # records " + res.length);
				deleteShifts(id, function() {
					ok(true, "deleted");
					start();
					done = true;
				});
			});
		});

		setTimeout(function() {
			if (done)
				return;
			ok(false, "readShifts response not received");
			start();
		}, 5000);
		stop();

	});

	test('updateShifts test', 3, function() {
		var done = false;

		createShifts("01-01-2012", "Comments", "1", function(req, res, data) {
			ok(true, "createShifts response received with id:" + res.id);
			updateShifts(res.id, "02-02-2012", "Commentss", function(req, res,
					data) {
				ok(true, "updateed record id: " + res.id);
				deleteShifts(res.id, function() {
					ok(true, "deleted");
					start();
					done = true;
				});
			});
		});

		setTimeout(function() {
			if (done)
				return;
			ok(false, "updateShifts response not received");
			start();
		}, 4000);
		stop();

	});

	module('Sessions');
	test('createSessions test', 2, function() {
		var done = false;

		createSessions("01-01-2012", "Comments", "1", function(req, res, data) {
			ok(true, "createSessions response received with id:" + res.id);
			deleteSessions(res.id, function() {
				ok(true, "deleted");
				start();
				done = true;
			});
		});

		setTimeout(function() {
			if (done)
				return;
			ok(false, "createSessions response not received");
			start();
		}, 3000);
		stop();

	});

	test('readSessions test', 3, function() {
		var done = false;

		createSessions("01-01-2012", "Comments", "1", function(req, res, data) {
			id = res.id;
			ok(true, "createSessions response received with id:" + res.id);
			readSessions("1", function(req, res, data) {
				ok(true, "readSessions received with # records " + res.length);
				deleteSessions(id, function() {
					ok(true, "deleted");
					start();
					done = true;
				});
			});
		});

		setTimeout(function() {
			if (done)
				return;
			ok(false, "readSessions response not received");
			start();
		}, 5000);
		stop();

	});

	test('updateSessions test', 3, function() {
		var done = false;

		createSessions("01-01-2012", "Comments", "1", function(req, res, data) {
			ok(true, "createSessions response received with id:" + res.id);
			updateSessions(res.id, "02-02-2012", "Commentss", function(req,
					res, data) {
				ok(true, "updateed record id: " + res.id);
				deleteSessions(res.id, function() {
					ok(true, "deleted");
					start();
					done = true;
				});
			});
		});

		setTimeout(function() {
			if (done)
				return;
			ok(false, "updateSessions response not received");
			start();
		}, 4000);
		stop();

	});

	module('Surgeries');
	test('createSurgeries test', 2, function() {
		var done = false;

		createSurgeries("01-01-2012", "1", "1", "2", "extra name", "123456789",
				"Roy", "Comments", "1", function(req, res, data) {
					ok(true, "createSurgeries response received with id:"
							+ res.id);
					deleteSurgeries(res.id, function() {
						ok(true, "deleted");
						start();
						done = true;
					});
				});

		setTimeout(function() {
			if (done)
				return;
			ok(false, "createSurgeries response not received");
			start();
		}, 3000);
		stop();

	});

	test('readSurgeries test', 3, function() {
		var done = false;

		createSurgeries("01-01-2012", "1", "1", "2", "extra name", "123456789",
				"Roy", "Comments", "1", function(req, res, data) {
					id = res.id;
					ok(true, "createSurgeries response received with id:"
							+ res.id);
					readSurgeries("1", function(req, res, data) {
						ok(true, "readSurgeries received with # records "
								+ res.length);
						deleteSurgeries(id, function() {
							ok(true, "deleted");
							start();
							done = true;
						});
					});
				});

		setTimeout(function() {
			if (done)
				return;
			ok(false, "readSurgeries response not received");
			start();
		}, 5000);
		stop();

	});

	test('updateSurgeries test', 3, function() {
		var done = false;

		createSurgeries("01-01-2012", "1", "1", "2", "extra name", "123456789",
				"Roy", "Comments", "1", function(req, res, data) {
					ok(true, "createSurgeries response received with id:"
							+ res.id);
					updateSurgeries(res.id, "02-02-2012", "2", "2", "3",
							"extra name name", "012345678", "Roy Gam",
							"Comments1", function(req, res, data) {
								ok(true, "updateed record id: " + res.id);
								deleteSurgeries(res.id, function() {
									ok(true, "deleted");
									start();
									done = true;
								});
							});
				});

		setTimeout(function() {
			if (done)
				return;
			ok(false, "updateSurgeries response not received");
			start();
		}, 4000);
		stop();

	});

});