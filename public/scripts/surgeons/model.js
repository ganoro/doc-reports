define([ 'jquery', 'underscore', 'backbone' ], function($, _, Backbone) {
	var SurgeonModel = Backbone.Model.extend({

		defaults : {
			name : "empty surgeon name...",
			title : "Dr.",
			uid : "1",
		},

		initialize : function() {
			this.setCounter(0);
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
		
		normalize : function() {
			var n = this.toJSON();
			if (this.get('id') == undefined) {
				n.id = this.cid;
			}
			return n;
		},

		clear : function() {
			this.destroy();
		},

		setId : function(id) {
			this.set({
				"id" : id
			});
		},

		setCounter: function(i) {
			this.set({
				"counter" : i
			});
		},
		
		increment : function(diff) {
			this.setCounter(this.get('counter') + diff);
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
