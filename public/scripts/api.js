define([ "../lib/gateway-min" ], function(Gateway) {

	Gateful.init({
		url : "/doc-reports"
	});

	loginUsers = function(id, name, _success, _error) {
		Gateful.api("/users/login", {
			params : {
				'id' : id,
				'name' : name
			}
		}, _success, _error);
	};

	createOperations = function(name, uid, _success, _error) {
		Gateful.api("/operations/create", {
			params : {
				'name' : name,
				'uid' : uid
			},
			method : 'POST'
		}, _success, _error);
	};

	readOperations = function(uid, _success, _error) {
		Gateful.api("/operations/read", {
			params : {
				'uid' : uid
			}
		}, _success, _error);
	};

	updateOperations = function(id, name, _success, _error) {
		Gateful.api("/operations/update", {
			params : {
				'id' : id,
				'name' : name
			},
			method : 'POST'
		}, _success, _error);
	};

	deleteOperations = function(id, _success, _error) {
		Gateful.api("/operations/delete", {
			params : {
				'id' : id
			},
			method : 'POST'
		}, _success, _error);
	};

	createSurgeons = function(name, title, uid, _success, _error) {
		Gateful.api("/surgeons/create", {
			params : {
				'name' : name,
				'title' : title,
				'uid' : uid
			},
			method : 'POST'
		}, _success, _error);
	};

	readSurgeons = function(uid, _success, _error) {
		Gateful.api("/surgeons/read", {
			params : {
				'uid' : uid
			}
		}, _success, _error);
	};

	updateSurgeons = function(id, name, title, _success, _error) {
		Gateful.api("/surgeons/update", {
			params : {
				'id' : id,
				'name' : name,
				'title' : title
			},
			method : 'POST'
		}, _success, _error);
	},

	deleteSurgeons = function(id, _success, _error) {
		Gateful.api("/surgeons/delete", {
			params : {
				'id' : id
			},
			method : 'POST'
		}, _success, _error);
	};

	createShifts = function(date, comments, uid, _success, _error) {
		Gateful.api("/shifts/create", {
			params : {
				'date' : date,
				'comments' : comments,
				'uid' : uid
			},
			method : 'POST'
		}, _success, _error);
	};

	readShifts = function(uid, _success, _error) {
		Gateful.api("/shifts/read", {
			params : {
				'uid' : uid
			}
		}, _success, _error);
	};

	updateShifts = function(id, date, comments, _success, _error) {
		Gateful.api("/shifts/update", {
			params : {
				'id' : id,
				'date' : date,
				'comments' : comments
			},
			method : 'POST'
		}, _success, _error);
	};

	deleteShifts = function(id, _success, _error) {
		Gateful.api("/shifts/delete", {
			params : {
				'id' : id
			},
			method : 'POST'
		}, _success, _error);
	};

	createSessions = function(date, comments, uid, _success, _error) {
		Gateful.api("/sessions/create", {
			params : {
				'date' : date,
				'comments' : comments,
				'uid' : uid
			},
			method : 'POST'
		}, _success, _error);
	};

	readSessions = function(uid, _success, _error) {
		Gateful.api("/sessions/read", {
			params : {
				'uid' : uid
			}
		}, _success, _error);
	};

	updateSessions = function(id, date, comments, _success, _error) {
		Gateful.api("/sessions/update", {
			params : {
				'id' : id,
				'date' : date,
				'comments' : comments
			},
			method : 'POST'
		}, _success, _error);
	};

	deleteSessions = function(id, _success, _error) {
		Gateful.api("/sessions/delete", {
			params : {
				'id' : id
			},
			method : 'POST'
		}, _success, _error);
	};

	createSurgeries = function(date, op_type, first, second, third, patient_id,
			patient_name, comments, uid, _success, _error) {
		Gateful.api("/surgeries/create", {
			params : {
				'date' : date,
				'op_type' : op_type,
				'first' : first,
				'second' : second,
				'third' : third,
				'patient_id' : patient_id,
				'patient_name' : patient_name,
				'comments' : comments,
				'uid' : uid
			},
			method : 'POST'
		}, _success, _error);
	};

	readSurgeries = function(uid, _success, _error) {
		Gateful.api("/surgeries/read", {
			params : {
				'uid' : uid
			}
		}, _success, _error);
	};

	updateSurgeries = function(id, date, op_type, first, second, third,
			patient_id, patient_name, comments, _success, _error) {
		Gateful.api("/surgeries/update", {
			params : {
				'id' : id,
				'date' : date,
				'op_type' : op_type,
				'first' : first,
				'second' : second,
				'third' : third,
				'patient_id' : patient_id,
				'patient_name' : patient_name,
				'comments' : comments,
			},
			method : 'POST'
		}, _success, _error);
	};

	deleteSurgeries = function(id, _success, _error) {
		Gateful.api("/surgeries/delete", {
			params : {
				'id' : id
			},
			method : 'POST'
		}, _success, _error);
	};
});
