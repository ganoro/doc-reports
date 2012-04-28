define([ 'jquery', 'underscore', 'backbone', 'operations/collection',
		'operations/view'], function($, _, Backbone,
		Operations, OperationsView) {
	var AppOperationView = Backbone.View.extend({

		// Instead of generating a new element, bind to the existing skeleton of
		// the App already present in the HTML.
		el : $("#page3"),

		lista : $("#operation-list"),

		// Delegated events for creating new items, and clearing completed ones.
		events : {
			"keypress #operation-input" : "createOnEnter",
			"keyup #operation-input" : "showTooltip"
		},

		// At initialization we bind to the relevant events on the `Operations`
		// collection, when items are added or changed. Kick things off by
		// loading any preexisting operations that might be saved in
		// *localStorage*.
		initialize : function() {
			_.bindAll(this, 'addOne', 'addAll', 'render', 'updateBubble');

			this.input = this.$("#operation-input");

			Operations.bind('add', this.addOne);
			Operations.bind('reset', this.addAll);
			Operations.bind('all', this.render);

			Operations.fetch();
		},

		// Re-rendering the App just means refreshing the statistics -- the rest
		// of the app doesn't change.
		render : function() {
		},

		// Add a single todo item to the list by creating a view for it, and
		// appending its element to the `<ul>`.
		addOne : function(operation) {
			var view = new OperationsView({
				model : operation
			});
			var el = view.render().el;
			this._internalAddOne(el);
		},

		updateBubble : function() {
			var start = new Date().getTime();
			if (window.startBubble == undefined || window.startBubble > start) {
				window.startBubble = start;
			}
			setTimeout(function() {
				if (window.startBubble == start) {
					alert (start);
				}
			}, 3000);

		},

		// Add all items in the **Operations** collection at once.
		addAll : function() {
			this.lista.empty();
			Operations.each(this.addOne);
		},

		_internalAddOne : function(el) {
			this.lista.append(el);
			if (this.lista.hasClass('ui-listview')) {
				this.lista.listview('refresh');
			} else {
				this.lista.trigger('create');
			}
		},

		// Generate the attributes for a new Todo item.
		newAttributes : function() {
			return {
				name : this.input.val(),
			};
		},

		// If you hit return in the main input field, create new **Todo** model,
		// persisting it to *localStorage*.
		createOnEnter : function(e) {
			if (e.keyCode != 13)
				return;
			Operations.create(this.newAttributes());
			this.input.val('');
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
	return AppOperationView;
});