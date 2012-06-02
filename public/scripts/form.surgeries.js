define([ 'jquery', 'underscore', 'backbone', 'surgeries/model',
		'surgeries/collection', 'moment' ], function($, _, Backbone, Surgery, Surgeries) {
	var SurgeryFormView = Backbone.View.extend({

		el : '#surgery-form',

		// Delegated events for creating new items, and clearing
		// completed ones.
		events : {
			'submit form' : 'createSurgery'
		},

		initialize : function() {
			this.form = this.$el.find('surgery-form');

			this.operationField = this.$el.find('#surgery-operation');
			this.dateField = this.$el.find('#surgery-date');
			this.surgeonAField = this.$el.find('#surgery-surgeon-a');
			this.surgeonBField = this.$el.find('#surgery-surgeon-b');
			this.patientIdField = this.$el.find('#surgery-patient-id');
			this.patientNameField = this.$el.find('#surgery-patient-name');
			this.pathologyField = this.$el.find('#surgery-pathology');
			this.uidField = this.$el.find('#surgery-uid');
			this.commentsField = this.$el.find('#surgery-comments');
			this.submitButton = this.$el.find('input[type=submit]');
			
			this.resetForm();
		},

		attributes : function() {
			var d = this.dateField.val();
			if (d === "") {
				d = moment().format("MMM DD, YYYY");
			}
			
			return {
				op_type : this.operationField.val(),
				date : moment(d).format("YYYY-MM-DD"),
				first : this.surgeonAField.val(),
				second : this.surgeonBField.val(),
				patient_id : this.patientIdField.val(),
				patient_name : this.patientNameField.val(),
				pathology : this.pathologyField.val(),
				uid : this.uidField.val(),
				comments : this.commentsField.val()
			};
		},

		resetForm : function () {
			this.patientIdField.val("");
			this.patientNameField.val("");
			this.pathologyField.val("");
			this.commentsField.val("");
			this.dateField.val(moment().format("MMM DD, YYYY"));
		},
		
		// If you hit `enter`, we're through editing the item.
		createSurgery : function(e) {
			if (this.submitButton.hasClass('disabled')
					&& this.form.data('user-created') !== true) {
				return false;
			} else {
				this.submitButton.addClass('disabled');
			}

			var self = this, surgery = new Surgery(this.attributes());
			surgery.save(surgery, {
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
					self.resetForm();

					Surgeries.add(surgery);
					self.form.data('user-created', true);
					self.submitButton.removeClass('disabled');
					$("#page9-back").trigger("click");
				}
			});

			return (this.form.data('user-created') === true);
		},

	});
	return SurgeryFormView;
});
