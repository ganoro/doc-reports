module('Operations');  
test('createOperations test', 2, function() {  
	var done = false;
	
    createOperations("Roy", "1", function(req, res, data) {
		ok(true, "createOperations response received with id:" + res.id );
		removeOperations(res.id, function() { 
			ok (true, "deleted");
			start();
			done = true;	
		});
	});

	setTimeout(function(){
		if (done) return;
		ok(false, "createOperations response not received");
		start();
	}, 3000);
	stop();
	
});  
  
test('listOperations test', 3, function() {  
	var done = false;
	
    createOperations("Roy", "1", function(req, res, data) {
    	id = res.id;
    	ok(true, "createOperations response received with id:" + res.id );
		listOperations("1", function(req, res, data) {
			ok(true, "listOperations response received with # records " + res.length);
			removeOperations(id, function() { 
				ok (true, "deleted");
				start();
				done = true;	
			});
		});
	});

	setTimeout(function(){
		if (done) return;
		ok(false, "createOperations response not received");
		start();
	}, 5000);
	stop();
}); 

test('editOperations test', 3, function() {  
	var done = false;
	
    createOperations("Roy", "1", function(req, res, data) {
		ok(true, "createOperations response received with id:" + res.id );
		editOperations(res.id, "Royal", function(req, res, data) {
			ok (true, "edited record id: " + res.id);
			removeOperations(res.id, function() { 
				ok (true, "deleted");
				start();
				done = true;	
			});
		});
	});

	setTimeout(function(){
		if (done) return;
		ok(false, "createOperations response not received");
		start();
	}, 4000);
	stop();
	
}); 



module('Surgeons');  
test('createSurgeons test', 2, function() {  
	var done = false;
	
    createSurgeons("Roy", "Dr.", "1", function(req, res, data) {
		ok(true, "createSurgeons response received with id:" + res.id );
		removeSurgeons(res.id, function() { 
			ok (true, "deleted");
			start();
			done = true;	
		});
	});

	setTimeout(function(){
		if (done) return;
		ok(false, "createSurgeons response not received");
		start();
	}, 3000);
	stop();
	
});  

test('listSurgeons test', 3, function() {  
	var done = false;

    createSurgeons("Roy", "Prof.", "1", function(req, res, data) {
    	id = res.id;
		ok(true, "createSurgeons response received with id:" + res.id );
		listSurgeons("1", function(req, res, data) {
			ok (true, "listSurgeons received with # records " + res.length);
			removeSurgeons(id, function() { 
				ok (true, "deleted");
				start();
				done = true;	
			});
		});
	});
    	
	setTimeout(function(){
		if (done) return;
		ok(false, "listSurgeons response not received");
		start();
	}, 5000);
	stop();
	
}); 

test('editSurgeons test', 3, function() {  
	var done = false;
	
    createSurgeons("Roy", "Prof.", "1", function(req, res, data) {
		ok(true, "createSurgeons response received with id:" + res.id );
		editSurgeons(res.id, "Royal", "Dr.", function(req, res, data) {
			ok (true, "edited record id: " + res.id);
			removeSurgeons(res.id, function() { 
				ok (true, "deleted");
				start();
				done = true;	
			});
		});
	});

	setTimeout(function(){
		if (done) return;
		ok(false, "editSurgeons response not received");
		start();
	}, 4000);
	stop();
	
}); 


module('Users');  
test('usersLogin test', 1, function() {  
	var done = false;
	
	loginUsers("1", "Roy", function(req, res, data) {
		ok(true, "loginUsers response received with id:" + res.id );
		start();
		done = true;	
	});
	
	setTimeout(function(){
		if (done) return;
		ok(false, "usersLogin response not received");
		start();
	}, 3000);
	stop();
	
});  

