define([ 'jquery', 'underscore', 'backbone'],
	function($, _, Backbone) {
		var OperationModel = Backbone.Model.extend({

			defaults : {
				name : "empty operation name...",
				uid : "1",
			},

			initialize : function() {
				this.setCounter(0);
				if (!this.get("name")) {
					this.setName(this.defaults.name);
				}
				if (!this.get("uid")) {
					this.setUid(this.defaults.uid);
				}
			},

			validate : function(attribs) {
				if (attribs.name === undefined
						|| attribs.name.length == 0) {
					return "Remember to set a name to the operation";
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

			setName : function(name) {
				this.set({
					"name" : name
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

			setUid : function(uid) {
				this.set({
					"uid" : uid
				});
			}

			});
		return OperationModel;
	});
