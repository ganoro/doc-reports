define([ 'jquery', 'underscore', 'backbone', 'shifts/model',
		'shifts/collection' ], function($, _, Backbone, Shift, Shifts) {
	var ShiftFormView = Backbone.View.extend({

		el : '#shift-form',

		// Delegated events for creating new items, and clearing
		// completed ones.
		events : {
			'submit form' : 'createShift'
		},

		initialize : function() {
			this.form = this.$el.find('shift-form');
			this.dateField = this.$el.find('#shift-date');
			this.commentsField = this.$el.find('#shift-comments');
			this.submitButton = this.$el.find('input[type=submit]');
		},

		attributes : function() {
			return {
				date : this.dateField.val(),
				comments : this.commentsField.val()
			};
		},

		// If you hit `enter`, we're through editing the item.
		createShift : function(e) {
			if (this.submitButton.hasClass('disabled')
					&& this.form.data('user-created') !== true) {
				return false;
			} else {
				this.submitButton.addClass('disabled');
			}

			var self = this, shift = new Shift(this.attributes());
			shift.save(shift, {
				error : function(originalModel, resp, options) {
					self.$el.find('input').removeClass('error');
					var errors = JSON.parse(resp.responseText).errors;
					_.each(errors, function(value, key) {
						self.$el.find('input[name=' + key + ']').addClass(
								'error');
					});
					self.submitButton.removeClass('disabled');
				},
				success : function() {
					// reset form  
					self.dateField.val("");
					self.commentsField.val("");

					Shifts.add(shift);
					self.form.data('user-created', true);
					self.submitButton.removeClass('disabled');
					 $("#page7-back").trigger("click");
				}
			});

			return (this.form.data('user-created') === true);
		},

	});
	return ShiftFormView;
});
