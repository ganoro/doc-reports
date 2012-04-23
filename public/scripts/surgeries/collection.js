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

	});
	return new SurgeriesCollection;
});