define([ 'jquery', 'underscore', 'backbone', 'surgeons/collection',
		'surgeons/view' ], function($, _, Backbone, Surgeons, SurgeonsView) {
	var AppSurgeonsView = Backbone.View.extend({

		// Instead of generating a new element, bind to the existing skeleton of
		// the App already present in the HTML.
		el : $("#page2"),
		
		lista: $("#surgeon-list"),

		// Delegated events for creating new items, and clearing completed ones.
		events : {
			"keypress #surgeon-input" : "createOnEnter",
			"keyup #surgeon-input" : "showTooltip"
		},

		// At initialization we bind to the relevant events on the `Surgeons`
		// collection, when items are added or changed. Kick things off by
		// loading any preexisting Surgeons that might be saved in
		// *localStorage*.
		initialize : function() {
			_.bindAll(this, 'addOne', 'addAll', 'render');

			this.input = this.$("#surgeon-input");

			Surgeons.bind('add', this.addOne);
			Surgeons.bind('reset', this.addAll);
			Surgeons.bind('all', this.render);

			Surgeons.fetch();
		},

		// Re-rendering the App just means refreshing the statistics -- the rest
		// of the app doesn't change.
		render : function() {
		},

		// Add a single todo item to the list by creating a view for it, and
		// appending its element to the `<ul>`.
		addOne : function(surgeon) {
			var view = new SurgeonsView({
				model : surgeon
			});
			var el = view.render().el;
			this._internalAddOne(el);
		},

		// Add all items in the **Surgeons** collection at once.
		addAll : function() {
			this.lista.empty();
			Surgeons.each(this.addOne);
		},

		// Generate the attributes for a new Todo item.
		newAttributes : function() {
			var title = this.getTitle(this.$(":checked").val());
			return {
				name : this.input.val(),
				title : title
			};
		},

		_internalAddOne: function(el) {
			this.lista.append(el);
			if (this.lista.hasClass('ui-listview')) {
				this.lista.listview('refresh');
	        } else {
	        	this.lista.trigger('create');
	        }			
		},
		
		// If you hit return in the main input field, create new **Todo** model,
		// persisting it to *localStorage*.
		createOnEnter : function(e) {
			if (e.keyCode != 13)
				return;
			Surgeons.create(this.newAttributes());
			this.input.val('');
		},
		
		getTitle: function (val) {
			return val == "dr" ? "Dr." : "Prof.";
		},

		// Lazily show the tooltip that tells you to press `enter` to save
		// a new todo item, after one second.
		showTooltip : function(e) {
			var tooltip = this.$(".ui-tooltip-top");
			var val = this.input.val();
			tooltip.fadeOut();
			if (this.tooltipTimeout)
				clearTimeout(this.tooltipTimeout);
			if (val == '' || val == this.input.attr('placeholder'))
				return;
			var show = function() {
				tooltip.show().fadeIn();
			};
			this.tooltipTimeout = _.delay(show, 1000);
		},

	});
	return AppSurgeonsView;
});