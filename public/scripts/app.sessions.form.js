define([ 'jquery', 'underscore', 'backbone', 'sessions/model',
		'sessions/collection' ], function($, _, Backbone, Session, Sessions) {
	var SessionFormView = Backbone.View.extend({

		el : '#session-form',

		// Delegated events for creating new items, and clearing
		// completed ones.
		events : {
			'submit form' : 'createSession'
		},

		initialize : function() {
			this.form = this.$el.find('session-form');
			this.dateField = this.$el.find('#session-date');
			this.commentsField = this.$el.find('#session-comments');
			this.submitButton = this.$el.find('input[type=submit]');
		},

		attributes : function() {
			return {
				date : this.dateField.val(),
				comments : this.commentsField.val()
			};
		},

		// If you hit `enter`, we're through editing the item.
		createSession : function(e) {
			if (this.submitButton.hasClass('disabled')
					&& this.form.data('user-created') !== true) {
				return false;
			} else {
				this.submitButton.addClass('disabled');
			}

			var self = this, session = new Session(this.attributes());
			session.save(session, {
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

					Sessions.add(session);
					
					self.form.data('user-created', true);
					self.submitButton.removeClass('disabled');
					 $("#page7-back").trigger("click");
				}
			});

			return (this.form.data('user-created') === true);
		},

	});
	return SessionFormView;
});
