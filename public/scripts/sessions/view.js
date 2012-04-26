define([ 'jquery', 'underscore', 'backbone', 'text!sessions/template.html',
		'order!swipeButton' ], function($, _, Backbone,
		sessionTemplate) {
	var SessionView = Backbone.View.extend({

		// ... is a list tag.
		tagName : "li",

		// Cache the template function for a single item.
		template : _.template(sessionTemplate),

		// The TodoView listens for changes to its model, re-rendering.
		initialize : function() {
			_.bindAll(this, 'render', 'remove');
			this.model.bind('change', this.render);
			this.model.bind('destroy', this.remove);
		},

		// Re-render the contents of the todo item.
		render : function() {
			$(this.el).html(this.template(this.model.normalize()));
			$(this.el).attr("data-theme", "c");
			$(this.el).attr("data-swipeurl", "");
			var model = this.model;
			$(this.el).swipeDelete({
				btnTheme : 'e',
				btnLabel : 'Delete',
				btnClass : 'aSwipeButton',
				click : function(e) {
					e.preventDefault();
					model.clear();
					$(this).parents('li').slideUp();
				}
			});
			return this;
		},

		// Remove the item, destroy the model.
		clear : function() {
			this.model.clear();
		}

	});
	return SessionView;
});