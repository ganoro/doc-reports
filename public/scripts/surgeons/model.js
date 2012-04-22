define([ 'jquery', 'underscore', 'backbone' ], function($, _, Backbone) {
	var SurgeonModel = Backbone.Model.extend({

		defaults : {
			name : "empty surgeon name...",
			title : "Dr.",
			uid : "1",
		},

		initialize : function() {
			if (!this.get("name")) {
				setName(this.defaults.name);
			}
			if (!this.get("title")) {
				setName(this.defaults.title);
			}
			if (!this.get("uid")) {
				setUid(this.defaults.uid);
			}
		},

		validate : function(attribs) {
			if (attribs.name === undefined || attribs.name.length == 0) {
				return "Remember to set a name to the surgeon";
			}
			if (attribs.title === undefined || attribs.title.length == 0) {
				return "Remember to set a title to the surgeon";
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

		setTitle : function(title) {
			this.set({
				"title" : title
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
	return SurgeonModel;
});
