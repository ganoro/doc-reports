define([ 'jquery', 'underscore', 'backbone', 'moment' ], function($, _, Backbone) {
	var SurgeryModel = Backbone.Model.extend({

		defaults : {
			date : moment().format("MMM DD, YYYY"),
			uid : "1",
		},

		url : '/doc-reports/surgeries',
		
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
				return "Remember to set a date to the shift";
			}
			if (attribs.first === undefined || attribs.first.length == 0) {
				return "Remember to set a first surgeon";
			}
			if (attribs.second === undefined || attribs.second.length == 0) {
				return "Remember to set a second surgeon";
			}
			if (attribs.patient_id === undefined || attribs.patient_id.length == 0) {
				return "Remember to set a patient id to the surgery";
			}
			if (attribs.patient_name === undefined || attribs.patient_name.length == 0) {
				return "Remember to set a patient name to the surgery";
			}
			if (attribs.op_type === undefined || attribs.op_type.length == 0) {
				return "Remember to set a operation type to the surgery";
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
	return SurgeryModel;
});
