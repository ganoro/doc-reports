define([ 'jquery', 'underscore', 'backbone', 'text!surgeries/template.html',
		'order!swipeButton' ], function($, _, Backbone, surgeryTemplate) {
	var SurgeryView = Backbone.View.extend({

		// ... is a list tag.
		tagName : "li",

		attributes : {
			'data-theme' : 'c',
			'data-swipeurl' : ''
		},

		// Cache the template function for a single item.
		template : _.template(surgeryTemplate),

		// The TodoView listens for changes to its model, re-rendering.
		initialize : function() {
			_.bindAll(this, 'render', 'remove');
			this.model.bind('change', this.render);
			this.model.bind('destroy', this.remove);
		},

		// Re-render the contents of the todo item.
		render : function() {
			$(this.el).html(this.template(this.model.normalize()));
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
	return SurgeryView;
});