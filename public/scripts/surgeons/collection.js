define([ 'jquery', 'underscore', 'backbone', 'surgeons/model' ], function($,
		_, Backbone, Surgeon) {

	var SurgeonsCollection = Backbone.Collection.extend({

		// Reference to this collection's model.
		model : Surgeon,

		url : '/doc-reports/surgeons',

		// Filter down the list of all todo items that are finished.
		forUser : function(uid) {
			return this.filter(function(surgeon) {
				return surgeon.get('uid') == uid;
			});
		},

	});
	return new SurgeonsCollection;
});