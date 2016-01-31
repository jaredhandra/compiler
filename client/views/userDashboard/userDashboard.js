Template.userDashboard.events({
   'click .logout': function(event){
       event.preventDefault();
       Meteor.logout();
   },

   //'click .reactive-table tbody tr td': function(event){
	//   event.preventDefault();
	//   window.location.href = '/question/' + this._id;
   //}
});
Template.userDashboard.helpers({
  	user: function() {
     return Meteor.user().username || Meteor.user().profile.login || Meteor.user().profile.name
  	},
	questions: function() {
			return Questions.find();
	},
	avatarURL: function(){
		if(Meteor.user().avatar != null){
			return Meteor.user().avatar;
		}
		if(Meteor.user().profile.avatar_url != null){
			return  Meteor.user().profile.avatar_url;
		}
		if(Meteor.user().services.google.picture !=null){
			return Meteor.user().services.google.picture;
		}
	},
	tags: function() {
		return Tags.find();
	},
	questionTitle: function(_id) {
		return Questions.findOne({'_id': _id}, {'title':1});
	},
	totalQuestions: function() {
		return Questions.find().count();
	},
	userQuestions: function() {
		return Questions.find({'username':Meteor.user().username}).count();
	}
});
Template.openQuestions.helpers({
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
				{key: 'tags', label: 'Tags', headerClass:'question-header', cellClass:'question-cell question-user'},
				{key: 'userId', label: 'User', headerClass:'question-header', cellClass:'question-cell question-user', tmpl: Template.questionUser},
				{key: 'comments', label: 'Replies', headerClass:'question-header', cellClass:'question-cell question-user', fn: function(value){return value.length;}},
				{key: 'createdAt', label: 'Date', headerClass:'question-header', cellClass:'question-cell question-date', fn: function(value){date = new moment(value); return date.fromNow();}}
			],
      filters: ['myFilter']
		}
	}
});
Template.openQuestions.events({
'click #newQuestionBtn': function(){
  	 Session.set("tempPickedTags", []);
  	}
});
Template.tagCard.helpers({
	tags: function() {
		return Tags.find();
	}
})
