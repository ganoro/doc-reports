define([ 'jquery', 'underscore', 'backbone', 'surgeries/collection',
		'surgeries/view'], function($, _, Backbone, Surgeries,
		SurgeryView) { 
	var AppSurgeryView = Backbone.View.extend({

		// Instead of generating a new element, bind to the existing skeleton of
		// the App already present in the HTML.
		el : $("#page6"),
		
		lista: $("#surgeries-divider"),

		listview: $("#report-list"),

		// At initialization we bind to the relevant events on the `Operations`
		// collection, when items are added or changed. Kick things off by
		// loading any preexisting operations that might be saved in
		// *localStorage*.
		initialize : function() {
			_.bindAll(this, 'addOne', 'addAll', 'render');

			Surgeries.bind('add', this.addOne);
			Surgeries.bind('reset', this.addAll);
			Surgeries.bind('all', this.render);

			Surgeries.fetch();
		},

		render : function() {
		},

		// Add a single todo item to the list by creating a view for it, and
		// appending its element to the `<ul>`.
		addOne : function(surgery) {
			var view = new SurgeryView({
				model : surgery
			});
			var el = view.render().el;
			this._internalAddOne(el);
		},

		// Add all items in the **Operations** collection at once.
		addAll : function() {
			Surgeries.each(this.addOne);
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
	return AppSurgeryView;
});