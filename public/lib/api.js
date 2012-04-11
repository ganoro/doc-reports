Gateful.init({
	url : "/doc-reports"
});

function loginUsers(id, name, _success, _error) {
	Gateful.api("/users/login", {
		params : {
			'id' : id,
			'name' : name
		}
	}, _success, _error);
}

function createOperations(name, uid, _success, _error) {
	Gateful.api("/operations/create", {
		params : {
			'name' : name,
			'uid' : uid
		}
	}, _success, _error);
}

function listOperations(uid, _success, _error) {
	Gateful.api("/operations/list", {
		params : {
			'uid' : uid
		}
	}, _success, _error);
}

function editOperations(id, name, _success, _error) {
	Gateful.api("/operations/edit", {
		params : {
			'id' : id,
			'name' : name
		}
	}, _success, _error);
}

function removeOperations(id, _success, _error) {
	Gateful.api("/operations/remove", {
		params : {
			'id' : id
		}
	}, _success, _error);
}

function createSurgeons(name, title, uid, _success, _error) {
	Gateful.api("/surgeons/create", {
		params : {
			'name' : name,
			'title' : title,
			'uid' : uid
		}
	}, _success, _error);
}

function listSurgeons(uid, _success, _error) {
	Gateful.api("/surgeons/list", {
		params : {
			'uid' : uid
		}
	}, _success, _error);
}

function editSurgeons(id, name, title, _success, _error) {
	Gateful.api("/surgeons/edit", {
		params : {
			'id' : id,
			'name' : name,
			'title' : title
		}
	}, _success, _error);
}

function removeSurgeons(id, _success, _error) {
	Gateful.api("/surgeons/remove", {
		params : {
			'id' : id
		}
	}, _success, _error);
}

function createShifts(date, comments, uid, _success, _error) {
	Gateful.api("/shifts/create", {
		params : {
			'date' : date,
			'comments' : comments,
			'uid' : uid
		}
	}, _success, _error);
}

function listShifts(uid, _success, _error) {
	Gateful.api("/shifts/list", {
		params : {
			'uid' : uid
		}
	}, _success, _error);
}

function editShifts(id, date, comments, _success, _error) {
	Gateful.api("/shifts/edit", {
		params : {
			'id' : id,
			'date' : date,
			'comments' : comments
		}
	}, _success, _error);
}

function removeShifts(id, _success, _error) {
	Gateful.api("/shifts/remove", {
		params : {
			'id' : id
		}
	}, _success, _error);
}

function createSessions(date, comments, uid, _success, _error) {
	Gateful.api("/sessions/create", {
		params : {
			'date' : date,
			'comments' : comments,
			'uid' : uid
		}
	}, _success, _error);
}

function listSessions(uid, _success, _error) {
	Gateful.api("/sessions/list", {
		params : {
			'uid' : uid
		}
	}, _success, _error);
}

function editSessions(id, date, comments, _success, _error) {
	Gateful.api("/sessions/edit", {
		params : {
			'id' : id,
			'date' : date,
			'comments' : comments
		}
	}, _success, _error);
}

function removeSessions(id, _success, _error) {
	Gateful.api("/sessions/remove", {
		params : {
			'id' : id
		}
	}, _success, _error);
}

function createSurgeries(date, op_type, first, second, third, patient_id, patient_name, comments, uid, _success, _error) {
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
		}
	}, _success, _error);
}

function listSurgeries(uid, _success, _error) {
	Gateful.api("/surgeries/list", {
		params : {
			'uid' : uid
		}
	}, _success, _error);
}

function editSurgeries(id, date, op_type, first, second, third, patient_id, patient_name, comments, _success, _error) {
	Gateful.api("/surgeries/edit", {
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
		}
	}, _success, _error);
}

function removeSurgeries(id, _success, _error) {
	Gateful.api("/surgeries/remove", {
		params : {
			'id' : id
		}
	}, _success, _error);
}

