Template.splashScreen.helpers({
  questions: function() {
			return Questions.find();
	},
	settings: function() {
		return {
			rowsPerPage: 10,
			showNavigation: 'never',
			class: 'table table-hover question-table',
			fields: [
				{key: '_id', label: 'Question', headerClass:'question-header', cellClass:'question-cell question-title',tmpl: Template.questionTitle},
				{key: 'tags', label: 'Tag', headerClass:'question-header', cellClass:'question-cell question-user', tmpl: Template.questionTag},
				{key: 'userId', label: 'User', headerClass:'question-header', cellClass:'question-cell question-user', tmpl: Template.questionUser},
        {key: 'reputation', label: 'Reputation', headerClass:'question-header', cellClass:'question-cell question-user', sortDirection: 'descending', sortOrder: 1},
				// {key: 'comments', label: 'Replies', headerClass:'question-header', cellClass:'question-cell question-user', fn: function(value){return value.length;}},
				{key: 'createdAt', label: 'Date', headerClass:'question-header', cellClass:'question-cell question-date', fn: function(value){date = new moment(value); return date.fromNow();}}
			],
      filters: ['user-open-questions', 'new', 'top']
		}
	}
});
