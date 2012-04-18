define([ 'jquery', 'underscore', 'backbone' ], function($, _, Backbone) {
	var OperationModel = Backbone.Model.extend({

		defaults : {
			name : "empty operation name...",
			uid : "1",
		},

		initialize : function() {
			if (!this.get("name")) {
				setName(this.defaults.name);
			}
			if (!this.get("uid")) {
				setUid(this.defaults.uid);
			}
		},

		validate : function(attribs) {
			if (attribs.name === undefined || attribs.name.length == 0) {
				return "Remember to set a name to the operation";
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

		setName : function(name) {
			this.set({
				"name" : name
			});
		},

		setUid : function(uid) {
			this.set({
				"uid" : uid
			});
		}

	});
	return OperationModel;
});
