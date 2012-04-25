define([ 'jquery', 'underscore', 'backbone', 'shifts/collection',
		'shifts/view' ], function($, _, Backbone, Shifts,
		ShiftView) { 
	var AppShiftView = Backbone.View.extend({

		// Instead of generating a new element, bind to the existing skeleton of
		// the App already present in the HTML.
		el : $("#page6"),
		
		lista: $("#shifts-divider"),

		listview: $("#report-list"),

		// At initialization we bind to the relevant events on the `Operations`
		// collection, when items are added or changed. Kick things off by
		// loading any preexisting operations that might be saved in
		// *localStorage*.
		initialize : function() {
			_.bindAll(this, 'addOne', 'addAll', 'render');

			Shifts.bind('add', this.addOne);
			Shifts.bind('reset', this.addAll);
			Shifts.bind('all', this.render);

			Shifts.fetch();
		},

		render : function() {
		},

		// Add a single todo item to the list by creating a view for it, and
		// appending its element to the `<ul>`.
		addOne : function(shift) {
			var view = new ShiftView({
				model : shift
			});
			var el = view.render().el;
			this._internalAddOne(el);
		},

		// Add all items in the **Operations** collection at once.
		addAll : function() {
			Shifts.each(this.addOne);
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
	return AppShiftView;
});