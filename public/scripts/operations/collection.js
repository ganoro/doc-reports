define([ 'jquery', 'underscore', 'backbone', 'operations/model' ], function($,
		_, Backbone, Operation) {

	var OperationsCollection = Backbone.Collection.extend({

		// Reference to this collection's model.
		model : Operation,

		url : '/doc-reports/operations',

		// Filter down the list of all todo items that are finished.
		forUser : function(uid) {
			return this.filter(function(operation) {
				return operation.get('uid') == uid;
			});
		},

	});
	return new OperationsCollection;
});