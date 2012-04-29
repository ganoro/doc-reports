define([ 'jquery', 'underscore', 'backbone', 'sessions/collection',
		'sessions/view' ], function($, _, Backbone, Sessions,
		SessionView) { 
	var AppSessionView = Backbone.View.extend({

		// Instead of generating a new element, bind to the existing skeleton of
		// the App already present in the HTML.
		el : $("#page6"),
		
		lista: $("#sessions-divider"),

		listview: $("#report-list"),

		// At initialization we bind to the relevant events on the `Operations`
		// collection, when items are added or changed. Kick things off by
		// loading any preexisting operations that might be saved in
		// *localStorage*.
		initialize : function() {
			_.bindAll(this, 'addOne', 'addAll', 'render');

			Sessions.bind('add', this.addOne);
			Sessions.bind('reset', this.addAll);
			Sessions.bind('all', this.render);

			Sessions.fetch({
				data : $.param({
					uid : uid
				})
			});
		},

		render : function() {
		},

		// Add a single todo item to the list by creating a view for it, and
		// appending its element to the `<ul>`.
		addOne : function(session) {
			var view = new SessionView({
				model : session
			});
			var el = view.render().el;
			this._internalAddOne(el);
		},

		// Add all items in the **Operations** collection at once.
		addAll : function() {
			Sessions.each(this.addOne);
		},
		
		_internalAddOne: function(el) {
			this.lista.after(el);
			if (this.listview.hasClass('ui-listview')) {
				this.listview.listview('refresh');
	        } else {
	        	this.listview.trigger('create');
	        }			
		},

	});
	return AppSessionView;
});