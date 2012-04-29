define([ 'jquery', 'underscore', 'backbone', 'text!surgeons/template.html',
		'order!swipeButton' ], function($, _, Backbone, surgeonTemplate) {
	var SurgeonView = Backbone.View.extend({

		// ... is a list tag.
		tagName : "li",

		attributes : {
			'data-theme' : 'c',
			'data-swipeurl' : ''
		},
		
		// Cache the template function for a single item.
		template : _.template(surgeonTemplate),

		// The TodoView listens for changes to its model, re-rendering.
		// Since
		// there's
		// a one-to-one correspondence between a **Todo** and a
		// **TodoView** in
		// this
		// app, we set a direct reference on the model for convenience.
		initialize : function() {
			_.bindAll(this, 'render', 'close', 'remove', 'updateBubble');
			this.model.bind('change:name', this.render);
			this.model.bind('change:counter', this.updateBubble);
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
			this.input = $('#surgeon-input');
			$('#surgery-surgeon-a').append(new Option(this.model.get('name'), this.model.get('id'), true, true));
			$('#surgery-surgeon-b').append(new Option(this.model.get('name'), this.model.get('id'), true, true));
			return this;
		},

		updateBubble : function() {
			var n = this.$('#surgeon-' + this.model.get('id'));
			if (n != undefined) {
				n.html(this.model.get("counter"));
			}
		},

		// Close the `"editing"` mode, saving changes to the todo.
		close : function() {
			this.model.save({
				content : this.input.val()
			});
			$(this.el).val("");
		},

		// If you hit `enter`, we're through editing the item.
		updateOnEnter : function(e) {
			if (e.keyCode == 13)
				this.close();
		},

		// Remove the item, destroy the model.
		clear : function() {
			this.model.clear();
		}

	});
	return SurgeonView;
});