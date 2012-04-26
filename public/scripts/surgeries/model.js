define([ 'jquery', 'underscore', 'backbone', 'surgeons/collection',
		'operations/collection', 'moment' ], function($, _, Backbone, Surgeons,
		Operations) {
	var SurgeryModel = Backbone.Model.extend({

		defaults : {
			date : moment().format("MMM DD, YYYY"),
			uid : "1",
		},

		urlRoot : '/doc-reports/surgeries',

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
			if (attribs.patient_id === undefined
					|| attribs.patient_id.length == 0) {
				return "Remember to set a patient id to the surgery";
			}
			if (attribs.patient_name === undefined
					|| attribs.patient_name.length == 0) {
				return "Remember to set a patient name to the surgery";
			}
			if (attribs.op_type === undefined || attribs.op_type.length == 0) {
				return "Remember to set a operation type to the surgery";
			}
		},
		
		normalize : function() {
			var n = this.toJSON();
			n.date = moment(this.get("date")).format("LLLL");
			n.first = this.surgeonName(this.get("first"));
			n.second = this.surgeonName(this.get("second"));
			n.op_type = this.operationName(this.get("op_type"));
			return n;
		},
		
		surgeonName : function (id) {
			var m = Surgeons.get(id);
			return m != undefined ? m.get("name") : "Unknonwn";
		},

		operationName : function (id) {
			var m = Operations.get(id);
			return m != undefined ? m.get("name") : "Unknonwn";
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
