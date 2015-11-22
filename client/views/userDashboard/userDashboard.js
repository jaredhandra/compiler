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
	}
});
Template.openQuestions.helpers({
	questions: function() {
		return Questions.find();
	},
	settings: function() {
		return {
			rowsPerPage: 10,
			showNavigation: 'auto',
			class: 'table table-hover',
			fields: [
				{key: '_id', label: 'Question', headerClass:'question-header', cellClass:'question-cell question-title',tmpl: Template.questionTitle},
				{key: 'username', label: 'User', headerClass:'question-header', cellClass:'question-cell question-user'},
				{key: 'createdAt', label: 'Date', headerClass:'question-header', cellClass:'question-cell question-date', fn: function(value){date = new Date(value); return date.toDateString();}}
			]
		}
	}
});
Template.openQuestions.events({
'click #newQuestionBtn': function(){
  	 Session.set("tempPickedTags", []);
  	}
});

