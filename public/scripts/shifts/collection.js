define([ 'jquery', 'underscore', 'backbone', 'shifts/model' ], function($,
		_, Backbone, Shift) {

	var ShiftsCollection = Backbone.Collection.extend({

		// Reference to this collection's model.
		model : Shift,

		url : '/doc-reports/shifts',

		// Filter down the list of all todo items that are finished.
		forUser : function(uid) {
			return this.filter(function(shift) {
				return shift.get('uid') == uid;
			});
		},

	});
	return new ShiftsCollection;
});