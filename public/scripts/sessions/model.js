define([ 'jquery', 'underscore', 'backbone', 'moment' ], function($, _, Backbone) {
	var SessionModel = Backbone.Model.extend({

		defaults : {
			date : moment().format("MMM DD, YYYY"),
			uid : "1",
		},

		url : '/doc-reports/sessions',
		
		initialize : function() {
			if (!this.get("date")) {
				this.setDate(this.defaults.date);
			}
			if (!this.get("uid")) {
				this.setUid(this.defaults.uid);
			}
		},

		validate : function(attribs) {
			if (attribs.date === undefined || attribs.date.length == 0) {
				return "Remember to set a date to the session";
			}
		},

		clear : function() {
			this.destroy();
		},

		setId : function(id) {
			this.set({
				"id" : id
			});
		},

		setComments : function(comments) {
			this.set({
				"comments" : comments
			});
		},
		
		setDate : function(date) {
			this.set({
				"date" : date
			});
		}
	});
	return SessionModel;
});
