Gateful.init({
	url : "/doc-reports"
});	

function createOperations(name, uid, _success, _error) {
	Gateful.api("/operations/create", { params : { 'name' : name, 'uid' : uid}}, _success, _error);
}

function listOperations(uid, _success, _error) {
	Gateful.api("/operations/list", { params : { 'uid' : uid}}, _success, _error);
}

function editOperations(id, name, _success, _error) {
	Gateful.api("/operations/edit", { params : { 'id' : id, 'name' : name}}, _success, _error);
}

function removeOperations(id, _success, _error) {
	Gateful.api("/operations/remove", { params : { 'id' : id}}, _success, _error);
}

function createSurgeons(name, title, uid, _success, _error) {
	Gateful.api("/surgeons/create", { params : { 'name' : name, 'title' : title, 'uid' : uid}}, _success, _error);
}

function listSurgeons(uid, _success, _error) {
	Gateful.api("/surgeons/list", { params : { 'uid' : uid}}, _success, _error);
}

function editSurgeons(id, name, title, _success, _error) {
	Gateful.api("/surgeons/edit", { params : { 'id' : id, 'name' : name, 'title' : title}}, _success, _error);
}

function removeSurgeons(id, _success, _error) {
	Gateful.api("/surgeons/remove", { params : { 'id' : id}}, _success, _error);
}

function loginUsers(id, name, _success, _error) {
	Gateful.api("/users/login", { params : { 'id' : id, 'name' : name}}, _success, _error);
}
