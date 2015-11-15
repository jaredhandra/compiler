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
		if(Meteor.user().profile.avatar_url != null){
			return  Meteor.user().profile.avatar_url;
		}
		if(Meteor.user().services.google.picture !=null){
			return Meteor.user().services.google.picture;
		}
	},
	tags: function() {
		return Tags.find();
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
				{key: '_id', label: 'Question', headerClass:'question-header', cellClass:'question-cell question-title', fn: function(_id){ title = Questions.find({'_id': _id}, {fields: {'title':1}}); console.log(title.toString()); return new Spacebars.SafeString('<a name="' + _id +'"href="question/' + _id + '">' + title + '</a>'); }},
				{key: 'user.profile.name', label: 'User', headerClass:'question-header', cellClass:'question-cell question-user'},
				{key: 'createdAt', label: 'Date', headerClass:'question-header', cellClass:'question-cell question-date', fn: function(value){date = new Date(value); return date.toDateString();}}
			]
		}
	}
})