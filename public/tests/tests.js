module('Operations');
test('createOperations test', 2, function() {
	var done = false;

	createOperations("Roy", "1", function(req, res, data) {
		ok(true, "createOperations response received with id:" + res.id);
		removeOperations(res.id, function() {
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

test('listOperations test', 3, function() {
	var done = false;

	createOperations("Roy", "1", function(req, res, data) {
		id = res.id;
		ok(true, "createOperations response received with id:" + res.id);
		listOperations("1", function(req, res, data) {
			ok(true, "listOperations response received with # records "
					+ res.length);
			removeOperations(id, function() {
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

test('editOperations test', 3, function() {
	var done = false;

	createOperations("Roy", "1", function(req, res, data) {
		ok(true, "createOperations response received with id:" + res.id);
		editOperations(res.id, "Royal", function(req, res, data) {
			ok(true, "edited record id: " + res.id);
			removeOperations(res.id, function() {
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
		removeSurgeons(res.id, function() {
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

test('listSurgeons test', 3, function() {
	var done = false;

	createSurgeons("Roy", "Prof.", "1", function(req, res, data) {
		id = res.id;
		ok(true, "createSurgeons response received with id:" + res.id);
		listSurgeons("1", function(req, res, data) {
			ok(true, "listSurgeons received with # records " + res.length);
			removeSurgeons(id, function() {
				ok(true, "deleted");
				start();
				done = true;
			});
		});
	});

	setTimeout(function() {
		if (done)
			return;
		ok(false, "listSurgeons response not received");
		start();
	}, 5000);
	stop();

});

test('editSurgeons test', 3, function() {
	var done = false;

	createSurgeons("Roy", "Prof.", "1", function(req, res, data) {
		ok(true, "createSurgeons response received with id:" + res.id);
		editSurgeons(res.id, "Royal", "Dr.", function(req, res, data) {
			ok(true, "edited record id: " + res.id);
			removeSurgeons(res.id, function() {
				ok(true, "deleted");
				start();
				done = true;
			});
		});
	});

	setTimeout(function() {
		if (done)
			return;
		ok(false, "editSurgeons response not received");
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

	createShifts ("01-01-2012", "Comments", "1", function(req, res, data) {
		ok(true, "createShifts  response received with id:" + res.id);
		removeShifts (res.id, function() {
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

test('listShifts test', 3, function() {
	var done = false;

	createShifts ("01-01-2012", "Comments", "1", function(req, res, data) {
		id = res.id;
		ok(true, "createShifts response received with id:" + res.id);
		listShifts ("1", function(req, res, data) {
			ok(true, "listShifts received with # records " + res.length);
			removeShifts (id, function() {
				ok(true, "deleted");
				start();
				done = true;
			});
		});
	});

	setTimeout(function() {
		if (done)
			return;
		ok(false, "listShifts response not received");
		start();
	}, 5000);
	stop();

});

test('editShifts test', 3, function() {
	var done = false;

	createShifts ("01-01-2012", "Comments", "1", function(req, res, data) {
		ok(true, "createShifts response received with id:" + res.id);
		editShifts (res.id, "02-02-2012", "Commentss", function(req, res, data) {
			ok(true, "edited record id: " + res.id);
			removeShifts (res.id, function() {
				ok(true, "deleted");
				start();
				done = true;
			});
		});
	});

	setTimeout(function() {
		if (done)
			return;
		ok(false, "editShifts response not received");
		start();
	}, 4000);
	stop();

});

module('Sessions');
test('createSessions test', 2, function() {
	var done = false;
	
	createSessions ("01-01-2012", "Comments", "1", function(req, res, data) {
		ok(true, "createSessions response received with id:" + res.id);
		removeSessions(res.id, function() {
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

test('listSessions test', 3, function() {
	var done = false;
	
	createSessions ("01-01-2012", "Comments", "1", function(req, res, data) {
		id = res.id;
		ok(true, "createSessions response received with id:" + res.id);
		listSessions("1", function(req, res, data) {
			ok(true, "listSessions received with # records " + res.length);
			removeSessions(id, function() {
				ok(true, "deleted");
				start();
				done = true;
			});
		});
	});
	
	setTimeout(function() {
		if (done)
			return;
		ok(false, "listSessions response not received");
		start();
	}, 5000);
	stop();
	
});

test('editSessions test', 3, function() {
	var done = false;
	
	createSessions("01-01-2012", "Comments", "1", function(req, res, data) {
		ok(true, "createSessions response received with id:" + res.id);
		editSessions(res.id, "02-02-2012", "Commentss", function(req, res, data) {
			ok(true, "edited record id: " + res.id);
			removeSessions(res.id, function() {
				ok(true, "deleted");
				start();
				done = true;
			});
		});
	});
	
	setTimeout(function() {
		if (done)
			return;
		ok(false, "editSessions response not received");
		start();
	}, 4000);
	stop();
	
});

module('Surgeries');
test('createSurgeries test', 2, function() {
	var done = false;
	
	createSurgeries("01-01-2012", "1", "1", "2", "extra name", "123456789", "Roy", "Comments", "1", function(req, res, data) {
		ok(true, "createSurgeries response received with id:" + res.id);
		removeSurgeries(res.id, function() {
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

test('listSurgeries test', 3, function() {
	var done = false;
	
	createSurgeries ("01-01-2012", "1", "1", "2", "extra name", "123456789", "Roy", "Comments", "1", function(req, res, data) {
		id = res.id;
		ok(true, "createSurgeries response received with id:" + res.id);
		listSurgeries("1", function(req, res, data) {
			ok(true, "listSurgeries received with # records " + res.length);
			removeSurgeries(id, function() {
				ok(true, "deleted");
				start();
				done = true;
			});
		});
	});
	
	setTimeout(function() {
		if (done)
			return;
		ok(false, "listSurgeries response not received");
		start();
	}, 5000);
	stop();
	
});

test('editSurgeries test', 3, function() {
	var done = false;
	
	createSurgeries("01-01-2012", "1", "1", "2", "extra name", "123456789", "Roy", "Comments", "1", function(req, res, data) {
		ok(true, "createSurgeries response received with id:" + res.id);
		editSurgeries(res.id, "02-02-2012", "2", "2", "3", "extra name name", "012345678", "Roy Gam", "Comments1", function(req, res, data) {
			ok(true, "edited record id: " + res.id);
			removeSurgeries(res.id, function() {
				ok(true, "deleted");
				start();
				done = true;
			});
		});
	});
	
	setTimeout(function() {
		if (done)
			return;
		ok(false, "editSurgeries response not received");
		start();
	}, 4000);
	stop();
	
});


