define([ 'jquery', 'underscore', 'backbone', 'sessions/model' ], function($,
		_, Backbone, Session) {

	var SessionsCollection = Backbone.Collection.extend({

		// Reference to this collection's model.
		model : Session,

		url : '/doc-reports/sessions',

		// Filter down the list of all todo items that are finished.
		forUser : function(uid) {
			return this.filter(function(session) {
				return session.get('uid') == uid;
			});
		},

	});
	return new SessionsCollection;
});