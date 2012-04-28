define([ 'jquery', 'underscore', 'backbone', 'surgeries/model' ], function($,
		_, Backbone, Surgery) {

	var SurgeriesCollection = Backbone.Collection.extend({

		// Reference to this collection's model.
		model : Surgery,

		url : '/doc-reports/surgeries',

		// Filter down the list of all todo items that are finished.
		forUser : function(uid) {
			return this.filter(function(shift) {
				return shift.get('uid') == uid;
			});
		},

		countOperations : function(id) {
			var operations = this.where({
				op_type : id
			});
			return operations.length;
		},

		countSurgeons : function(id) {
			var first = this.where({
				first : id
			});
			var second = this.where({
				second : id
			});
			return first.length + second.length;
		},

	});
	return new SurgeriesCollection;
});